import baseConfig from '@totvibe/eslint-config/eslint-base-config';
import reactConfig from '@totvibe/eslint-config/eslint-react-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...baseConfig.map(config => ({
    ...config,
    files: config.files ?? ['**/*.ts', '**/*.tsx'],
  })),

  ...reactConfig.map(config => ({
    ...config,
    files: config.files ?? ['apps/web/**/*.{ts,tsx}', 'packages/ui/**/*.{ts,tsx}'],
  })),

  {
    files: ['packages/typescript-config/**/*.ts'],
    rules: {
      'custom/no-comments-except-pattern': 'off',
    },
  },

  ...baseConfig.map(config => ({
    ...config,
    files: ['prettier.config.js', 'apps/web/postcss.config.js'],
  })),

  {
    ignores: ['**/node_modules/', '**/dist/', '**/.turbo/', '**/.wrangler/', '**/build/', '**/.next/', '**/*.js'],
  },
]);
