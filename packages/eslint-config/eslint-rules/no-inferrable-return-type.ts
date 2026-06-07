import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { dirname, join, relative } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';

type RuleCreator = ReturnType<typeof ESLintUtils.RuleCreator>;

const createRule: RuleCreator = ESLintUtils.RuleCreator(
  name => `https://github.com/your-org/eslint-rules/blob/main/docs/${name}.md`,
);

type FunctionNode =
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.ArrowFunctionExpression
  | TSESTree.MethodDefinition;

const isExported = (node: FunctionNode) => {
  const parent = node.parent;

  return (
    parent.type === AST_NODE_TYPES.ExportNamedDeclaration ||
    parent.type === AST_NODE_TYPES.ExportDefaultDeclaration ||
    (parent.type === AST_NODE_TYPES.VariableDeclarator &&
      parent.parent.parent.type === AST_NODE_TYPES.ExportNamedDeclaration) ||
    (node.type === AST_NODE_TYPES.ArrowFunctionExpression &&
      parent.type === AST_NODE_TYPES.VariableDeclarator &&
      parent.parent.parent.type === AST_NODE_TYPES.ExportNamedDeclaration)
  );
};

export type NoInferrableReturnTypeRule = ReturnType<typeof createRule>;

export const noInferrableReturnType: NoInferrableReturnTypeRule = createRule({
  name: 'no-inferrable-return-type',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow explicit return type annotations when TypeScript can infer them',
    },
    messages: {
      removeInferrableReturnType: 'Return type annotation is unnecessary and can be inferred by TypeScript.',
    },
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    const services = ESLintUtils.getParserServices(context);
    const checker = services.program.getTypeChecker();
    const sourceCode = context.sourceCode;
    const filename = context.filename;

    let isPackageExport: boolean | undefined;

    const isFilePackageExport = () => {
      if (isPackageExport !== undefined) {
        return isPackageExport;
      }

      let currentDir = dirname(filename);
      let packageJsonPath: string | undefined;

      while (currentDir !== dirname(currentDir)) {
        const possiblePackageJson = join(currentDir, 'package.json');
        if (existsSync(possiblePackageJson)) {
          packageJsonPath = possiblePackageJson;
          break;
        }
        currentDir = dirname(currentDir);
      }

      if (!packageJsonPath) {
        isPackageExport = false;
        return false;
      }

      try {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as Record<string, unknown>;

        if (!packageJson['exports']) {
          isPackageExport = false;
          return false;
        }

        const packageRoot = dirname(packageJsonPath);

        const relativeFilePath = relative(packageRoot, filename);

        const normalizedFilePath = relativeFilePath.replace(/\.(ts|tsx)$/, '');

        const checkExports = (exports: unknown) => {
          if (typeof exports === 'string') {
            const normalizedExport = exports.replace(/\.(ts|tsx|js|jsx)$/, '');
            return normalizedExport === `./${normalizedFilePath}` || normalizedExport === normalizedFilePath;
          }

          if (typeof exports === 'object' && exports !== null) {
            for (const key of Object.keys(exports)) {
              const value = (exports as Record<string, unknown>)[key];

              if (typeof value === 'string') {
                const normalizedExport = value.replace(/\.(ts|tsx|js|jsx)$/, '');
                if (normalizedExport === `./${normalizedFilePath}` || normalizedExport === normalizedFilePath) {
                  return true;
                }

                if (value.includes('*')) {
                  const pattern = value.replaceAll('*', '.*').replace(/\.(ts|tsx|js|jsx)$/, '');
                  const regex = new RegExp(`^${pattern}$`);
                  if (regex.test(`./${normalizedFilePath}`)) {
                    return true;
                  }
                }
              } else if (typeof value === 'object') {
                return checkExports(value);
              }
            }
          }

          return false;
        };

        isPackageExport = checkExports(packageJson['exports']);
        return isPackageExport;
      } catch {
        isPackageExport = false;
        return false;
      }
    };

    const hasIsolatedDeclarations = () => {
      const compilerOptions = services.program.getCompilerOptions();
      return compilerOptions.isolatedDeclarations === true;
    };

    const checkFunction = (node: FunctionNode) => {
      const functionNode = node.type === AST_NODE_TYPES.MethodDefinition ? node.value : node;
      const returnType = functionNode.returnType;

      if (!returnType) {
        return;
      }

      if (returnType.typeAnnotation.type === AST_NODE_TYPES.TSTypePredicate) {
        return;
      }

      if (hasIsolatedDeclarations() && isExported(node) && isFilePackageExport()) {
        return;
      }

      const tsNode = services.esTreeNodeToTSNodeMap.get(functionNode);
      const signature = checker.getSignatureFromDeclaration(tsNode);

      if (!signature) {
        return;
      }

      const inferredReturnType = checker.getReturnTypeOfSignature(signature);
      const annotatedTypeNode = returnType.typeAnnotation;
      const annotatedTsNode = services.esTreeNodeToTSNodeMap.get(annotatedTypeNode);
      const annotatedType = checker.getTypeAtLocation(annotatedTsNode);

      const tokenBefore = sourceCode.getTokenBefore(returnType);

      if (inferredReturnType === annotatedType) {
        context.report({
          node: returnType,
          messageId: 'removeInferrableReturnType',
          ...(tokenBefore && {
            fix: fixer => fixer.removeRange([tokenBefore.range[1], returnType.range[1]]),
          }),
        });
      }
    };

    return {
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      ArrowFunctionExpression: checkFunction,
      MethodDefinition: checkFunction,
    };
  },
});
