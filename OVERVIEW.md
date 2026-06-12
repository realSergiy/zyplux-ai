# Overview

> This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Modern React frontpage with a dark GitHub-inspired aesthetic (parallax grid background, glow-on-hover, scroll reveals), built as a strict TypeScript monorepo using Bun workspaces. Local packages are scoped `@zyplux/*`; shared lint rules come from the published `@totvibe/eslint-config`.

**Stack:** React 19.2, Vite 8, TypeScript 6, Motion v12, Tailwind CSS 4

**Target:** Cloudflare deployment (wrangler, assets-only) with local dev via Vite

## Monorepo Architecture

### Workspace Structure

- `apps/web/` - Marketing site: one-pager (`/`) plus `/agent`, `/insights`, `/privacy` pages (TanStack Start file routes, prerendered)
- `packages/ui/` - Shared styling utilities (`cva`, `cx`)
- `packages/tsconfig/` - Shared TypeScript presets (`base.json`, `bun.json`, `web.json`)
- `tests/` - Smoke tests hitting public package interfaces only: `fixtures/` (expected copy), `stories/` (scenario registrars), `web/` (happy-dom preload + harness)

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
- Motion v12 for animations (`useScroll`/`useTransform` parallax, `useInView` scroll reveals)
- `prefers-reduced-motion` support (motion's `useReducedMotion`)

### Styling

- Tailwind CSS 4 with `@tailwindcss/postcss`
- Dark-only GitHub-dark palette as `@theme` tokens in `index.css` (`background #0d1117`, `surface`, `accent #58a6ff`, `violet #bc8cff`)
- `text-gradient` utility for headline gradients; `shadow-glow` for card hover
- `cva`/`cx` from `@zyplux/ui/lib/style` (cva + `tailwind-merge`) for variant class builders and className merging
- App-wide class builders in `src/styles.ts` (`container`, `heading`, `button`, `pill`, `navLink`, `fieldInput`)

## File Structure

### Web App (`apps/web/src/`)

- `content.ts` - Every user-visible string (single source of truth, also imported by tests via `@zyplux/web/content`) plus the `FORM_ENDPOINT` placeholder for the hosted form service
- `components/layout/` - GridBackground (parallax grid), Navigation (scroll progress bar), SubpageLayout
- `components/sections/` - Hero, VignetteTimeline, NotChatbot, ProcessLadder, FounderNote, Security, Faq, FinalCta, Footer
- `components/forms/` - hosted-form hook + honeypot, AuditForm, EmailCapture
- `components/ui/` - Reveal (scroll reveal, reduced-motion aware), Section/SectionHeading, SpotlightCard/CardTitle, PageHeadline, BrandMark
- `pages/` - AgentPage, InsightsPage, InsightsPostPage, PrivacyPage
- `app.tsx` - One-pager composition
- `routes/` + `router.tsx` - TanStack Router file routes (prerendered at build time)

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
