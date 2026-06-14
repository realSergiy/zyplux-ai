import { totvibe } from '@totvibe/eslint-config';
import * as mdx from 'eslint-plugin-mdx';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  ...totvibe({
    ignores: ['**/.content-collections/**', '**/.tsbuild/**', '**/routeTree.gen.ts', 'reference_clones/**'],
    react: true,
    reactVersion: '19.0',
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/only-throw-error': [
        'error',
        { allow: [{ from: 'package', name: 'NotFoundError', package: '@tanstack/router-core' }] },
      ],
    },
  },
  {
    ...mdx.flat,
    files: ['**/*.mdx'],
    processor: mdx.createRemarkProcessor({ lintCodeBlocks: false }),
    rules: {
      ...mdx.flat.rules,
      'no-undef': 'off',
    },
  },
);
