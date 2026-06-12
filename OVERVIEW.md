# Overview

> This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Modern React frontpage with a dark GitHub-inspired aesthetic (parallax grid background, glow-on-hover, scroll reveals), built as a strict TypeScript monorepo using Bun workspaces. Local packages are scoped `@zyplux/*`; shared lint rules come from the published `@totvibe/eslint-config`.

**Stack:** React 19.2, Vite 8, TypeScript 6, Motion v12, Tailwind CSS 4

**Target:** Cloudflare deployment (wrangler, assets-only) with local dev via Vite

## Monorepo Architecture

### Workspace Structure

- `apps/web/` - Marketing site: one-pager (`/`) plus `/agent`, `/insights`, `/privacy` pages (TanStack Start file routes, prerendered)
- `packages/ui/` - Shared design system: design tokens (`theme.css`, `tokens`), global styles (`base.css`), class recipes, motion provider, and React components (raw TS source, no build step)
- `packages/mdx/` - MDX compile pipeline: `MDX_OPTIONS` and the `remarkSections` plugin (used by the web Vite build and the test mdx loader)
- `packages/og/` - Node-side social-card rendering kit: Inter fonts, satori/resvg helpers (`renderCardPng`, `pngDataUri`, `gridDataUri`)
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
- Motion v12 for animations via `m.*` from `motion/react-m` + `LazyMotion` (`MotionProvider` from `@zyplux/ui/motion/provider` wraps the root route; plain `motion.*` imports throw under `strict`)
- `useScroll`/`useTransform` parallax, `useInView` scroll reveals
- `prefers-reduced-motion` support (`MotionConfig reducedMotion='user'` baseline plus component-level `useReducedMotion` replacements)

### Styling

- Tailwind CSS 4 with `@tailwindcss/vite`
- Dark-only GitHub-dark palette as `@theme` tokens in `@zyplux/ui/theme.css` (`background #0d1117`, `surface`, `accent #58a6ff`, `violet #bc8cff`); the same palette is exported as `PALETTE` from `@zyplux/ui/tokens` for SVG/OG rendering (a test keeps the two in sync)
- `theme.css` carries a `@source` directive so the app's Tailwind build scans the package's classes; the app's `index.css` is just three `@import`s (`tailwindcss`, theme, base)
- `text-gradient` utility for headline gradients; `shadow-glow` for card hover (both in `@zyplux/ui/base.css`)
- `cva`/`cx` from `@zyplux/ui/lib/style` (cva + `tailwind-merge` taught the custom theme tokens) for variant class builders and className merging
- Shared class recipes in `@zyplux/ui/recipes` (`container`, `heading`, `button`, `pill`, `navLink`, `inlineLink`, `prose`, `avatar`, `fieldInput`, `fieldLabel`)

## File Structure

### Web App (`apps/web/src/`)

- `../content/` - All page copy as MDX (`pages/*.mdx` with typed frontmatter via sibling `.mdx.d.ts`, `insights/*.mdx` posts)
- `site.ts` - Brand strings and chrome copy (nav, footer, form messages); `config.ts` - site URL, theme color, OG image constants
- `page-meta.ts` - Frontmatter registry re-exported for tests (`@zyplux/web/page-meta`; bun tests can't reach routes that use `import.meta.glob`)
- `components/layout/` - Navigation (binds nav content into `NavBar`), Footer (binds into `SiteFooter`), SubpageLayout (binds into `SubpageShell`)
- `components/forms/` - AuditForm plus app bindings (`EmailCapture` wrapper, `FormErrorNote`) over `@zyplux/ui/forms/*`
- `components/mdx/` - The MDX component maps: `HOME_COMPONENTS` (landing blocks bound to brand copy/icons), `PROSE_COMPONENTS`
- `components/ui/` - BrandMark, MiniDashboard, SystemMap (brand/marketing-specific compositions over `@zyplux/ui` primitives and hooks)
- `routes/` + `router.tsx` - TanStack Router file routes (prerendered at build time); each route file owns its page component (`HomePage`, `AgentPage`, …) and builds its head from its MDX frontmatter

### Design System (`packages/ui/src/`)

Organized by abstraction level — tokens and recipes, then behavior, then atoms, then page-scale compositions:

- `styles/theme.css` - `@theme` tokens (palette, effect tints, `shadow-glow`, shimmer keyframes) + `@source`
- `styles/base.css` - `text-gradient` utility; base layer (default border color, focus ring, `.skip-link`, body aurora background)
- `tokens.ts` - `PALETTE` hex values, `TEXT_GRADIENT`, `toRgba` for SVG/satori consumers
- `recipes.ts` - cva class recipes; `lib/style.ts` - configured `cva`/`cx`
- `hooks/` - useScrolledPast, useTypewriter, useCountUp
- `motion/` - MotionProvider (`LazyMotion` `domAnimation` strict + `MotionConfig`), Reveal (in-view), Entrance (mount; rise via `y`, pop via `scale`), BlinkingCaret, FloatingParticles, ScrollCue, ScrollProgressBar
- `primitives/` - ButtonLink, BrandLockup, Paragraphs, StepBadge, Pictogram, SpotlightCard/CardTitle, FeatureCard (`eyebrow`/`footer` slots), StepCard, ShowcasePanel, Disclosure, AnimatedBars
- `layout/` - Section (`heading`/`intro` slots own the vertical rhythm)/SectionHeading/SectionIntro, CardGrid (stagger-reveals children), PageHeadline, GridBackground
- `blocks/` - NavBar, SiteFooter, SubpageShell/BackLink, HeroShell, Timeline/TimelineItem (slot-based; apps inject content; TimelineItem stagger-reveals via `index`)
- `forms/` - `useHostedForm` + honeypot + status notes, EmailCapture
- `diagram/` - animated SVG diagram kit (Diagram shell, phase hook, node/ring/badge primitives)

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
