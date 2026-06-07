# @totvibe/eslint-config

Shared ESLint configurations for the TotVibe monorepo using ESLint 9 Flat Config.

## Configs

- `eslint.base.config.ts` - TypeScript ESLint + Unicorn + Custom rules (strict, type-checked)
- `eslint.react.config.ts` - Extends base, adds React + React Hooks rules

## Usage

```typescript
import baseConfig from '@totvibe/eslint-config/eslint-base-config';
import reactConfig from '@totvibe/eslint-config/eslint-react-config';
```

Configs are applied automatically via root `eslint.config.ts`. This package exports reusable configurations that are composed at the root level with file pattern filtering.

**DO NOT** create package-level `eslint.config.ts` files. All orchestration happens at the root.

## Custom Rules

- `custom/no-comments-except-pattern` - Only allows `// ToDo:`, `// WHY:`, etc.
- `custom/no-inferrable-return-type` - Prevents redundant return type annotations

## Included Plugins

- `@eslint/js` - Core ESLint rules
- `typescript-eslint` - Strict + stylistic type checking
- `eslint-plugin-unicorn` - Modern best practices
- `eslint-plugin-react` - React rules (flat config)
- `eslint-plugin-react-hooks` - Hooks rules
- `eslint-config-prettier` - Prettier integration

## Architecture

Root `eslint.config.ts` orchestrates which config applies where using file patterns. See [MONOREPO.md](../../MONOREPO.md) for details.
