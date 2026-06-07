import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintConfigPrettier from 'eslint-config-prettier';
import { customRules } from './eslint-rules/index.ts';
import { defineConfig } from 'eslint/config';

const settingsConfig = defineConfig({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.config.{js,ts,mjs}', '*.d.ts'],
      },
    },
  },
});

const tsConfig = defineConfig(
  eslint.configs.recommended,
  {
    rules: {
      'no-empty-pattern': [
        'error',
        {
          allowObjectPatternsAsParameters: true,
        },
      ],
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    },
  },
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-misused-spread': [
        'error',
        {
          allow: ['string'],
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': ['error', { allowConstantLoopConditions: 'always' }],
    },
  },
);

const unicornConfig = defineConfig(eslintPluginUnicorn.configs.recommended, {
  rules: {
    'unicorn/import-style': [
      'error',
      {
        styles: {
          'node:path': {
            named: true,
          },
        },
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          e2e: true,
          e: true,
        },
        replacements: Object.fromEntries(
          // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/rules/shared/abbreviations.js
          [
            'arg',
            'args',
            'arr',
            'attr',
            'btn',
            'conf',
            'ctx',
            'curr',
            'db',
            'dev',
            'dir',
            'dist',
            'doc',
            'docs',
            'env',
            'err',
            'ext',
            'fn',
            'i',
            'idx',
            'j',
            'len',
            'lib',
            'msg',
            'num',
            'obj',
            'opts',
            'param',
            'params',
            'pkg',
            'prev',
            'prod',
            'prop',
            'props',
            'ref',
            'refs',
            'req',
            'res',
            'src',
            'stdDev',
            'str',
            'tbl',
            'tmp',
            'util',
            'utils',
            'val',
            'var',
            'vars',
            'ver',
          ].map(key => [key, false]),
        ),
      },
    ],
    'unicorn/catch-error-name': [
      'error',
      {
        name: 'e',
      },
    ],
    'unicorn/switch-case-braces': ['error', 'avoid'],
    'unicorn/filename-case': 'off',
    'unicorn/no-new-array': 'off', // WHY: Array.from has poor performance vs new Array()
  },
});

const customConfig = defineConfig({
  plugins: {
    custom: {
      rules: customRules as never,
    },
  },
  rules: {
    'custom/no-inferrable-return-type': 'error',
    'custom/no-comments-except-pattern': [
      'error',
      {
        allowedPatterns: [
          String.raw`^\s*eslint-disable-line @typescript-eslint/no-deprecated`,
          String.raw`^\s*ToDo:`,
          String.raw`^\s*WHY:`,
          String.raw`^\s*COLOR:`,
          String.raw`^\s*https://github\.com/`,
        ],
      },
    ],
  },
});

type EslintConfigObject = ReturnType<typeof defineConfig>;

const config: EslintConfigObject = defineConfig(
  settingsConfig,
  tsConfig,
  unicornConfig,
  customConfig,
  eslintConfigPrettier,
);

export default config;
