# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern React frontpage with 3D graphics, built as a strict TypeScript monorepo using Bun workspaces. Local packages are scoped `@zyplux/*`; shared lint rules come from the published `@totvibe/eslint-config`.

**Stack:** React 19.2, Vite 7, TypeScript 6, Three.js/R3F, Motion v12, Tailwind CSS 4

**Target:** Cloudflare deployment (wrangler, assets-only) with local dev via Vite

## Monorepo Architecture

### Workspace Structure

- `apps/web/` - Main Vite app with 3D scenes, components, sections
- `packages/ui/` - Shared utilities (`cn`)
- `packages/tsconfig/` - Shared TypeScript presets (`base.json`, `bun.json`, `web.json`)
- `packages/tests/` - Smoke tests hitting public package interfaces only: `fixtures/` (expected copy), `stories/` (scenario registrars), `web/` (happy-dom preload + harness)

## Commands

All workflows run through `just` (see `justfile`; `just` lists all recipes):

```bash
just install             # bun install
just dev                 # Vite dev server (port 5173)
just build               # vite build → apps/web/dist
just check               # full gate: install, knip, typecheck, lint, test
just knip                # unused files/deps/exports
just typecheck           # tsc -b (all project references)
just lint                # eslint --fix + prettier --write
just test                # bun test
just deploy              # vite build + wrangler deploy
just upgrade             # ncu across root + workspaces (catalog-aware)
just upgrade-interactive # pick upgrades, then reinstall
```

## TypeScript Configuration

### Strictness (All Packages)

- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `noImplicitReturns: true`
- `noUnusedLocals: true`
- `erasableSyntaxOnly: true`

### Setup

- Root `tsconfig.json` is a solution file; `tsc -b` builds all project references.
- Every project extends a `@zyplux/tsconfig` preset: composite, `module: Preserve`, `moduleResolution: bundler`, `emitDeclarationOnly` into `.tsbuild/`.
- `tsconfig.tooling.json` covers root config files; `apps/web/tsconfig.node.json` covers `vite.config.ts`.

## ESLint Configuration (Flat Config)

Single root `eslint.config.ts` consumes the published `@totvibe/eslint-config` via `totvibe({ react: true, ... })`. It bundles ESLint recommended, typescript-eslint strict + stylistic (type-aware), React + hooks, perfectionist, unicorn, prettier compatibility, and custom rules (`no-inferrable-return-type`, `no-type-predicate`, `no-zod-custom`, arrow-functions-only).

## Dependency Management (Bun Catalog)

All version ranges centralized in root `package.json` under `workspaces.catalog`. Reference as:

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
- Motion v12 for animations
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
- Dark/light/system modes via `use-theme.ts` + `themeAtom`
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

## Build Targets

Vite builds for baseline-widely-available browsers (2025-05-01):

- Chrome 107+
- Edge 107+
- Firefox 104+
- Safari 16+

## Environment

- bun 1.3+
- just

## Package Manager

MUST use `bun` and `bunx`. Never use `npm`, `npx`, or `pnpm`.
