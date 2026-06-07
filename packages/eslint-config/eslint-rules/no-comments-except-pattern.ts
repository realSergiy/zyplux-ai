import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

type RuleCreator = ReturnType<typeof ESLintUtils.RuleCreator>;

const createRule: RuleCreator = ESLintUtils.RuleCreator(
  name => `https://github.com/your-org/eslint-rules/blob/main/docs/${name}.md`,
);

type Options = [
  {
    allowedPatterns?: string[];
  },
];

type MessageIds = 'disallowedComment';
export type NoCommentsExceptPatternRule = ReturnType<typeof createRule>;

export const noCommentsExceptPattern: NoCommentsExceptPatternRule = createRule<Options, MessageIds>({
  name: 'no-comments-except-pattern',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow comments except those matching specified patterns',
    },
    messages: {
      disallowedComment: 'Comment does not match any allowed pattern.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedPatterns: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'Array of regex patterns for allowed comments',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ allowedPatterns: [] }],

  create(context, [options]) {
    const allowedPatterns = options.allowedPatterns ?? [];
    const compiledPatterns = allowedPatterns.map(pattern => new RegExp(pattern));
    const sourceCode = context.sourceCode;
    const filename = context.filename;

    if (filename.endsWith('vite-env.d.ts')) {
      return {};
    }

    const builtInPatterns = new Map<string, RegExp>([
      ['JSDoc tags', /^\s*\*\s*@/],
      ['Noop placeholder', /^\s*noop\s*$/],
    ]);

    const checkComment = (comment: TSESTree.Comment) => {
      const commentText = comment.value.trim();

      if ('type' in comment && comment.type === ('Shebang' as TSESTree.Comment['type'])) {
        return;
      }

      const isBuiltInAllowed = [...builtInPatterns.values()].some(pattern => pattern.test(commentText));
      if (isBuiltInAllowed) {
        return;
      }

      const isAllowed = compiledPatterns.some(pattern => pattern.test(commentText));

      if (!isAllowed) {
        context.report({
          loc: comment.loc,
          messageId: 'disallowedComment',
          data: {
            commentValue: commentText,
          },
        });
      }
    };

    return {
      Program() {
        const comments = sourceCode.getAllComments();
        for (const comment of comments) {
          checkComment(comment);
        }
      },
    };
  },
});
