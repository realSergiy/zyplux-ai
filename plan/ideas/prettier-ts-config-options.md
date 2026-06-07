# Prettier TypeScript Config Support Investigation

**Issue**: [prettier/prettier-vscode#3623](https://github.com/prettier/prettier-vscode/issues/3623)
**Date**: 2025-10-06
**Status**: VS Code extension does not support `prettier.config.ts` despite CLI support in Prettier v3.5.0+

## Current State

### Prettier CLI Support

- **Added**: Prettier v3.5.0 (February 2025)
- **Supported files**: `.prettierrc.ts`, `prettier.config.ts`, `.prettierrc.mts`, `prettier.config.mts`, `.prettierrc.cts`, `prettier.config.cts`
- **Requirements**: Node.js >= 22.6.0 with `--experimental-strip-types` flag
- **Implementation**: Uses Node.js native TypeScript stripping (no transpiler dependencies)

### prettier-vscode Extension

- **Status**: Does NOT support TypeScript configs
- **Blocker**: VS Code extension host runs Node.js 20 (no native TS support)
- **ETA**: VS Code upgrade to Node 22+ estimated "a few months at the very least" (as of Feb 2025)

## How ESLint Solved This Problem

ESLint added `eslint.config.ts` support through **jiti** as an optional peer dependency:

### Implementation Timeline

1. **ESLint v9.9.0** (August 2024): Experimental support with jiti
2. **ESLint v9.18.0** (January 2025): Stable support
3. **ESLint v9.24.0** (April 2025): Native Node.js 22.10+ support as alternative

### Technical Approach

```typescript
// ESLint's config loader (simplified)
import { createJiti } from 'jiti';

async function loadConfig(configPath: string) {
  if (configPath.endsWith('.ts') || configPath.endsWith('.mts') || configPath.endsWith('.cts')) {
    try {
      // Optional peer dependency - graceful degradation
      const jiti = createJiti(__filename, { interopDefault: true });
      return await jiti.import(configPath);
    } catch (err) {
      // Fall back to Node.js native loader or error
      if (supportsNativeTS()) {
        return await import(configPath);
      }
      throw new Error('Install jiti@^2.0.0 for TypeScript config support');
    }
  }
  // Regular JS loading
  return await import(configPath);
}
```

### Key Design Decisions

- **Optional dependency**: jiti listed as `optionalDependencies` (not installed by default)
- **Graceful degradation**: Falls back if jiti unavailable
- **No breaking changes**: Existing JS configs continue working
- **Performance**: jiti caches transpiled output (~16x faster on subsequent loads)

## What is jiti?

**jiti** (Just-In-Time Import) is a runtime TypeScript/ESM loader for Node.js.

### How It Works

1. **JIT Transpilation**: Transpiles TypeScript → JavaScript on-the-fly using Babel
2. **Smart Caching**: Hashes file content; recompiles only when source changes
3. **Zero Config**: No tsconfig.json required for basic usage
4. **Module Interop**: Handles ESM/CommonJS mixing via internal Proxy

### Performance

- First load: ~3ms (compile + cache write)
- Cached load: ~0.2ms (16x faster)

### Adoption

- 60M+ npm downloads/month
- Used by: ESLint, Nuxt, Docusaurus, Vitest, many others

### Comparison: jiti vs tsx

| Feature        | jiti                   | tsx                      |
| -------------- | ---------------------- | ------------------------ |
| Engine         | Babel                  | esbuild                  |
| Speed          | Fast (smart caching)   | Faster (esbuild-powered) |
| Philosophy     | Zero-config automation | Pure execution speed     |
| Module Support | Universal ESM/CJS      | Universal ESM/CJS        |
| Adoption       | 60M+/month             | Growing                  |

## Prettier's Current Implementation

Prettier v3.5.0+ relies **exclusively** on Node.js experimental features:

- No transpiler dependency (no jiti/tsx)
- Requires `NODE_OPTIONS="--experimental-strip-types"`
- Works in CLI but not in VS Code extension

### Why Different from ESLint?

ESLint chose jiti for **backwards compatibility** - works on Node 18/20 where most users are.
Prettier chose **native-only** approach - requires Node 22+, simpler implementation.

## Solutions for This Project

### Option 1: Use .ts Config for CLI/CI Only

**Availability**: Now
**Limitation**: VS Code extension won't recognize it

Create `prettier.config.ts`:

```typescript
import { type Config } from 'prettier';

const config: Config = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  printWidth: 120,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: Infinity,
        proseWrap: 'preserve',
      },
    },
  ],
} as const;

export default config;
```

Run in terminal:

```bash
NODE_OPTIONS="--experimental-strip-types" pnpm prettier --write .
```

Or add script:

```json
{
  "scripts": {
    "format": "NODE_OPTIONS='--experimental-strip-types' prettier --write ."
  }
}
```

### Option 2: Contribute jiti Support to prettier-vscode

**Availability**: Requires PR + maintainer approval
**Effort**: ~100-200 lines + tests
**Precedent**: ESLint's successful implementation

#### Proposed Changes

**1. Add jiti as optional peer dependency** (`package.json`):

```json
{
  "optionalDependencies": {
    "jiti": "^2.0.0"
  }
}
```

**2. Modify config loader** (pseudo-code for prettier-vscode):

```typescript
async function loadPrettierConfig(configPath: string) {
  const ext = path.extname(configPath);

  if (['.ts', '.mts', '.cts'].includes(ext)) {
    try {
      // Try jiti first
      const { createJiti } = await import('jiti');
      const jiti = createJiti(__filename, {
        interopDefault: true,
        requireCache: false, // VS Code may need fresh imports
      });
      return await jiti.import(configPath);
    } catch (jitiError) {
      // Try Node.js native (if Node 22.10+)
      if (process.versions.node >= '22.10.0') {
        try {
          return await import(configPath);
        } catch (nativeError) {
          throw new Error(`Failed to load TypeScript config. Install jiti@^2.0.0 or upgrade to Node.js 22.10+`);
        }
      }
      throw new Error(`TypeScript configs require jiti. Install with: pnpm add -D jiti@^2.0.0`);
    }
  }

  // Existing JS/JSON loader
  return await import(configPath);
}
```

**3. Update documentation**:

- Document jiti as optional dependency for `.ts` configs
- Provide migration guide from `.js` to `.ts`
- Add troubleshooting section

#### PR Talking Points

1. **Proven approach**: ESLint successfully uses this pattern
2. **No breaking changes**: Graceful degradation if jiti unavailable
3. **User demand**: Issue #3623 has significant engagement
4. **Low risk**: Optional dependency, explicit error messages
5. **Reference implementation**: [ESLint v9.9.0 PR](https://github.com/eslint/eslint/pull/18134)

### Option 3: Wait for VS Code Node Upgrade

**Availability**: "A few months at the very least" (Feb 2025)
**Risk**: May be delayed further

Once VS Code ships with Node 22+:

1. prettier-vscode updates Node requirement
2. Native `--experimental-strip-types` works
3. No jiti needed

### Option 4: Current Workaround (Keep .js with Types)

**Availability**: Now
**Type Safety**: Full IntelliSense via JSDoc

Current `prettier.config.js`:

```javascript
/** @type {import('prettier').Config} */
export default {
  arrowParens: 'avoid',
  // ... full type checking in IDE
};
```

**Pros**:

- Works everywhere (CLI, VS Code, all editors)
- Full type safety via JSDoc
- No experimental flags needed

**Cons**:

- Less elegant than native TypeScript
- JSDoc syntax verbose for complex types

## Recommendation

### Short-term (today)

**Keep `prettier.config.js` with JSDoc types** - works universally, full type safety.

### Medium-term (1-2 months)

**Submit PR to prettier-vscode** adding jiti support:

1. Fork `prettier/prettier-vscode`
2. Implement loader changes (200 lines)
3. Add tests for `.ts`/`.mts`/`.cts` loading
4. Document jiti requirement
5. Reference ESLint's implementation in PR description

### Long-term (6+ months)

**Migrate to `prettier.config.ts`** once:

- prettier-vscode merges jiti support, OR
- VS Code upgrades to Node 22+

## Project Status

**Current project state**:

- Node.js: 24.6.2+ (supports native TS stripping)
- jiti: v2.6.1 (already in catalog for ESLint)
- Prettier: v3.6.2 (supports `.ts` configs)
- Config: `prettier.config.js` with JSDoc types

**Blockers**:

- VS Code extension only blocker for `.ts` adoption
- CLI/CI ready to use `.ts` today

## References

### GitHub Issues/PRs

- [prettier-vscode#3623](https://github.com/prettier/prettier-vscode/issues/3623) - VS Code extension support request
- [prettier/prettier#16119](https://github.com/prettier/prettier/issues/16119) - Original feature request
- [prettier/prettier#16828](https://github.com/prettier/prettier/pull/16828) - Implementation PR (merged Dec 2024)
- [eslint/eslint#18134](https://github.com/eslint/eslint/pull/18134) - ESLint jiti implementation

### Documentation

- [Prettier 3.5.0 Release Notes](https://prettier.io/blog/2025/02/09/3.5.0.html)
- [ESLint TypeScript Config Docs](https://eslint.org/docs/latest/use/configure/configuration-files)
- [jiti GitHub](https://github.com/unjs/jiti)

### Related Tools

- **cosmiconfig-typescript-loader**: Uses jiti internally, shows common pattern
- **tsx**: Alternative to jiti (esbuild-based, faster but less adoption)
- Node.js `--experimental-strip-types`: Native approach (Node 22.6+)
