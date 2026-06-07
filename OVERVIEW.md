# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern React frontpage with 3D graphics, built as a strict TypeScript monorepo using pnpm workspaces + Turborepo. All packages scoped as `@totvibe/*`.

**Stack:** React 19.2, Vite 7.1, TypeScript 5.9, Three.js/R3F, Motion v12, Tailwind CSS 4, shadcn/ui

**Target:** Cloudflare Pages deployment with optional local dev

## Monorepo Architecture

### Package Dependencies

```
@totvibe/typescript-config → @totvibe/eslint-config → @totvibe/ui → @totvibe/web
```

### Workspace Structure

- `apps/web/` - Main Vite app with 3D scenes, components, sections
- `packages/ui/` - Shared UI components (shadcn/ui patterns)
- `packages/typescript-config/` - Shared TypeScript configs (base/react/node)
- `packages/eslint-config/` - Shared ESLint configs with custom rules

## Commands

### Development

```bash
pnpm dev                         # Start dev server (port 5173)
pnpm build                       # Build all packages (Turbo)
pnpm typecheck                   # Type check all packages (shows all errors with --continue)
pnpm lint                        # Lint all packages (shows all errors with --continue)
```

### Quality Checks

```bash
pnpm typecheck --force           # Bypass Turbo cache
pnpm --filter @totvibe/web lint  # Lint single package
pnpm --filter @totvibe/web exec tsc --noEmit  # Type check single package
```

### Deployment

```bash
cd apps/web
pnpm deploy                      # Build + deploy to Cloudflare Pages
pnpm cf:dev                      # Local Cloudflare Pages dev server
pnpm preview                     # Preview production build
```

### Maintenance

```bash
pnpm clean                       # Clean Turbo cache + node_modules
pnpm bump                        # Interactive dependency updates
turbo daemon clean               # Clear Turbo daemon cache
```

## TypeScript Configuration

### Strictness (All Packages)

- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `noImplicitReturns: true`
- `noUnusedLocals: true`
- `erasableSyntaxOnly: true`

### Module Resolution

- **React packages** (`apps/web`, `packages/ui`): `module: ESNext`, `moduleResolution: Bundler`
- **Base config**: `module: NodeNext`, `moduleResolution: NodeNext`
- **Config packages**: Disable `composite` for flexibility with type assertions

### Project References

All packages use TypeScript project references for incremental builds. Web app references `packages/ui`.

## ESLint Configuration (Flat Config)

### Architecture

Single root `eslint.config.ts` orchestrates all rules via file pattern filtering. No package-level configs.

### Rule Sets

1. **Base** (`@totvibe/eslint-config/eslint-base-config`) - Applied to `**/*.ts`, `**/*.tsx`
   - ESLint recommended
   - TypeScript strict + stylistic
   - Unicorn recommended (with allowed abbreviations)
   - Custom rules: `no-comments-except-pattern`, `no-inferrable-return-type`
   - Prettier integration

2. **React** (`@totvibe/eslint-config/eslint-react-config`) - Applied to `apps/web/**`, `packages/ui/**`
   - Extends base
   - React recommended + hooks
   - React Refresh

### Custom Rules

- **`no-comments-except-pattern`** - Only allow comments matching:
  - `ToDo:` prefix
  - `WHY:` prefix
  - `COLOR:` prefix
  - GitHub issue links
  - JSDoc tags (`@param`, etc.)
  - Special case: `noop`

- **`no-inferrable-return-type`** - Disallow explicit return types on arrow functions when TypeScript can infer them

### Exceptions

Config packages (`packages/eslint-config`, `packages/typescript-config`) disable `no-comments-except-pattern` to allow explanatory comments.

## Turbo Pipeline

### Task Dependencies

```
typecheck → lint
^build → build
```

### Cache Strategy

- `typecheck` & `lint`: No `inputs` config = hash all files (safest)
- `build`: Explicit inputs (`src/**`, `package.json`, `tsconfig*.json`, `vite.config.ts`, etc.)
- `dev`: `cache: false` (persistent task)

### Important Flags

Always use `--continue` for quality checks to see all errors across packages:

```bash
pnpm typecheck  # Actually runs: turbo typecheck --continue
pnpm lint       # Actually runs: turbo lint --continue
```

## Dependency Management (pnpm Catalogs)

All version ranges centralized in `pnpm-workspace.yaml` under `catalog:`. Reference as:

```json
{
  "dependencies": {
    "react": "catalog:",
    "three": "catalog:"
  }
}
```

Workspace packages use `workspace:*` protocol.

## Code Patterns

### TypeScript

- Use `type` for all type definitions (no `interface`)
- No `any` (use `unknown`)
- No `@ts-ignore`, `@ts-nocheck`, `@ts-expect-error`
- No non-null assertion (`!`)
- Handle all `undefined`/`null` explicitly
- Prefer type inference over annotations
- Arrow functions only (no `function` declarations)
- Top-level `await` (no `.then()/.catch()`)

### React

- Functional components with arrow functions
- Custom hooks for reusable logic
- Jotai for global state (`shouldLoadSceneAtom`, `themeAtom`)
- Lazy load 3D scene for performance
- Motion v11 for animations
- `prefers-reduced-motion` support

### 3D Graphics

- React Three Fiber for Three.js integration
- `@react-three/drei` for helpers (OrbitControls, Float, etc.)
- `@react-three/postprocessing` for effects (Bloom, Vignette)
- Particle systems use Float32Array for performance
- `willChange: 'transform'` on animated elements

### Styling

- Tailwind CSS 4 with `@tailwindcss/postcss`
- CSS variables for theming
- Dark/light/system modes with `next-themes`
- shadcn/ui component patterns
- `cn()` utility for className merging (`clsx` + `tailwind-merge`)

## File Structure

### Web App (`apps/web/src/`)

- `components/three/` - 3D scenes (Scene, ParticleField, FloatingShapes)
- `components/theme/` - ThemeToggle
- `components/layout/` - Navigation
- `components/sections/` - Hero, Features, Footer
- `store/atoms.ts` - Jotai atoms for global state
- `App.tsx` - Main app with lazy-loaded Scene
- `main.tsx` - Entry point

### Shared UI (`packages/ui/`)

Exports utilities and components via:

```json
{
  "exports": {
    "./lib/utils": "./src/lib/utils.ts",
    "./components/*": "./src/components/*.tsx"
  }
}
```

## Build Targets

Vite builds for baseline-widely-available browsers (2025-05-01):

- Chrome 107+
- Edge 107+
- Firefox 104+
- Safari 16+

## Environment

- Node.js 24.6.2+
- pnpm 10.18.0+

## Package Manager

MUST use `pnpm` and `pnpm exec` commands. Never use `npm` or `npx`.

## Troubleshooting

### Stale cache

```bash
pnpm typecheck --force
turbo daemon clean
```

### Missing Turbo errors

Ensure root `package.json` scripts use `--continue`:

```json
{
  "typecheck": "turbo typecheck --continue",
  "lint": "turbo lint --continue"
}
```

### TypeScript resolution

- Check `@totvibe/typescript-config` exports in `package.json`
- Verify `allowImportingTsExtensions` for `.ts` imports in config files
- Ensure `composite: true` on base config, `false` on config packages

### ESLint not finding config

Root `eslint.config.ts` must be at monorepo root with file pattern filtering for each package.
