# @totvibe/typescript-config

Shared TypeScript configurations for the TotVibe monorepo.

## Configurations

- `tsconfig.base.json` - Base with strict settings, `module: NodeNext`, `composite: true`
- `tsconfig.react.json` - Extends base, adds `module: ESNext`, `moduleResolution: Bundler`, JSX
- `tsconfig.node.json` - Extends base, adds `allowImportingTsExtensions`, `noEmit`

## Usage

**React packages:**

```json
{
  "extends": "@totvibe/typescript-config/tsconfig.react.json"
}
```

**Node.js config files:**

```json
{
  "extends": "@totvibe/typescript-config/tsconfig.node.json"
}
```

## Features

- Full strict mode with `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- `erasableSyntaxOnly` for modern TypeScript
- `verbatimModuleSyntax` for explicit imports
- Composite project references for incremental builds
- Target `ESNext` with modern lib support

See [MONOREPO.md](../../MONOREPO.md) for architecture details.
