import { totvibe } from '@totvibe/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  ...totvibe({
    ignores: ['**/.tsbuild/**'],
    react: true,
    tsconfigRootDir: import.meta.dirname,
  }),
  { settings: { react: { version: '19.0' } } },
  {
    files: ['**/*.{ts,tsx,js,mjs,cjs}'],
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true, kebabCase: true, pascalCase: true } }],
    },
  },
);
