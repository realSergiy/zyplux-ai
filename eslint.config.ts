import { totvibe } from '@totvibe/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  ...totvibe({
    ignores: ['**/.content-collections/**', '**/.tsbuild/**', '**/routeTree.gen.ts', 'reference_clones/**'],
    react: true,
    reactVersion: '19.0',
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    rules: {
      '@typescript-eslint/only-throw-error': [
        'error',
        { allow: [{ from: 'package', name: 'NotFoundError', package: '@tanstack/router-core' }] },
      ],
    },
  },
);
