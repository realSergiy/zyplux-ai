# TanStack Start + MDX migration

Decisions (research review, 2026-06-11):

- **Framework:** TanStack Start (RC, ≥ 1.168) on Cloudflare Workers via `@cloudflare/vite-plugin` — file routes, static prerender of all marketing pages, per-route `head()`.
- **Content:** content-collections (`@content-collections/core` + `/vite` + `/cli`, zod v4) — structured copy in frontmatter/YAML, prose in MDX bodies.
- **Diagrams:** bespoke Motion SVG primitives extracted from `system-map.tsx` — no diagram library.
- **Components:** neither shadcn/ui nor daisyUI; cherry-pick `@base-ui/react` primitives when a concrete need lands.

Ground rules for every phase:

- Pin `@tanstack/*` packages to exact versions in the root catalog (no `^`); upgrade deliberately via `just upgrade`.
- Presentation parity is a hard requirement: pages look and animate exactly as today. The only intended change is that prerendered HTML now contains the copy.
- Page components stay plain React (no router hooks or `<Link>` in shared components); routes are thin wrappers. Bun tests keep rendering components directly, without a router context.
- A phase is done only when `just check` is green and the listed verifications pass.

## Phase 1 — TanStack Start skeleton (routing, prerender, head)

1. Add `reference_clones/` to `.gitignore`.
   Verify: `git status` no longer lists it.
2. Add catalog entries pinned exact: `@tanstack/react-start`, `@tanstack/react-router` (Cloudflare prerender requires react-start ≥ 1.138.0). Add `@tailwindcss/vite`; remove `@tailwindcss/postcss` and `autoprefixer` (Tailwind 4 owns prefixing); delete `apps/web/postcss.config.js`.
   Verify: `bun install` clean; `just dev` renders with identical styling.
3. Rework `apps/web/vite.config.ts`: plugin order `tailwindcss(), cloudflare({ viteEnvironment: { name: 'ssr' } }), tanstackStart(), react()`, keep `ogImagePlugin`, drop `seoPlugin` and the `build.rollupOptions.input` block (Start owns entries), keep `build.target`.
   Verify: `just dev` starts; `/` renders.
4. Create `src/router.tsx` and `src/routes/__root.tsx` (document shell: html/head/body with `<HeadContent />` and `<Scripts />`, imports `index.css`); add thin routes `index`, `agent`, `insights`, `privacy` that render the existing `App` and `pages/*` components unchanged.
   Verify: all four paths render in `just dev` visually identical to today.
5. Rework `src/seo.ts` so `pageHead` emits the TanStack `head()` shape (title + `meta` array, same tag set as today, 1:1); each route's `head()` calls it with its `PAGES` entry; root route carries charset, viewport, favicon. Delete `apps/web/seo/`; update `tests/src/web/seo-harness.ts` to the new shape.
   Verify: `bun test tests` green; view-source on each route shows title, description, and og: tags.
6. Delete `index.html`, `agent.html`, `insights.html`, `privacy.html`, `src/main.tsx`, `src/agent.tsx`, `src/insights.tsx`, `src/privacy.tsx`, `src/mount.tsx`.
   Verify: `just dev` still serves all four routes.
7. Exclude generated artifacts from tooling surfaces: `src/routeTree.gen.ts` in `.prettierignore` and the ESLint ignores; update `knip.json` apps/web entries to `src/routes/**` and `src/router.tsx`.
   Verify: `just knip` and `just lint` clean with no rule suppressions.
8. Enable prerendering: `tanstackStart({ prerender: { enabled: true, crawlLinks: true, failOnError: true }, sitemap: { host: 'https://zyplux.ai' } })`.
   Verify: `just build` emits HTML for all four routes; `grep` finds the hero badge copy in the built index HTML and "Privacy, plainly." in the privacy HTML; sitemap lists four URLs.
9. Adapt `og/og-image-plugin.ts` to the Start build (the `'index.html' in bundle` guard no longer matches — emit once from the client build output); keep the dev middleware.
   Verify: built output contains `og.png`; `/og.png` serves in `just dev`; `just og` still renders the preview.
10. Align `apps/web/wrangler.jsonc` with the official Start example: `"main": "@tanstack/react-start/server-entry"`, `"compatibility_flags": ["nodejs_compat"]`, keep the custom-domain routes, drop `assets.not_found_handling` (Start serves prerendered pages and handles fallbacks).
    Verify: `bunx wrangler dev` (after `just build`) serves all routes and `og.png`.
11. Full gate.
    Verify: `just check` green; CI workflows need no command changes (`bun run build`, `wrangler deploy`). Note for the first deploy: the site switches from assets-only to a Worker with static assets; custom domains are unchanged.

## Phase 2 — content-collections (structured copy out of TypeScript)

1. Add catalog entries: `@content-collections/core`, `@content-collections/vite`, `@content-collections/cli`, `zod` (v4).
   Verify: `bun install` clean.
2. Create `apps/web/content-collections.ts` defining collections whose zod schemas mirror today's `content.ts` types exactly: one collection per page (`landing`, `agent`, `insights`, `privacy` — MDX, frontmatter-only for now, including each page's `title`/`description`/`path`) plus `site` (YAML: brand, nav, footer, form copy, skip link, contact). Add the `content-collections` tsconfig path alias and gitignore `.content-collections/`.
   Verify: `bunx content-collections build` succeeds inside `apps/web`.
3. Author `content/site.yaml` and `content/pages/{index,agent,insights,privacy}.mdx` with frontmatter values copied 1:1 from `content.ts`. Technical constants that are not editorial copy (`FORM_ENDPOINT`, OG dimensions, `THEME_COLOR`, `SITE_URL`) move to a small `src/config.ts` instead.
   Verify: schema validation passes on `content-collections build`; an intentionally broken field fails the build with a precise error (then revert).
4. Turn `src/content.ts` into a typed facade: same exported names and shapes, values read from the generated collections. No changes to components, tests, fixtures, or the OG plugin.
   Verify: `just typecheck` and `bun test tests` green without touching any consumer.
5. Wire the build order: add `contentCollections()` to the Vite plugins and chain `content-collections build` ahead of every consumer in `package.json` scripts (`dev`, `build`, `og`, and the root `test`) — bun does not run pre/post scripts.
   Verify: from a clean checkout, `just install && just check && just build` passes with no manual steps.
6. Content parity: compare prerendered output from before and after the swap.
   Verify: built HTML identical modulo hashed asset filenames; `og.png` byte-identical.
7. Move the remaining hardcoded copy in `mini-dashboard.tsx` (the question string) into the landing frontmatter and pass it as a prop.
   Verify: rendered page text unchanged; `grep` finds no user-visible literals left in `mini-dashboard.tsx`.
8. Full gate.
   Verify: `just check` green.

## Phase 3 — diagram primitives (abstract system-map)

1. Create `components/diagram/` with `useDiagramPhases({ resolveDelayMs })` extracted from `system-map.tsx` — owns `useInView`, the resolve timer, and `useReducedMotion`; returns `{ ref, drawn, resolved, still }` and provides them via a `DiagramPhaseContext`.
   Verify: hook unit-testable; no behavior change yet.
2. Add the `<Diagram viewBox caption>` shell: `figure` + `svg` (aria attributes as today) + `figcaption`, calls the hook and provides the context.
3. Add leaf primitives reading phase from context: `<DiagramNode x y label snag>`, `<LoopRing cx cy r>`, `<SpokeLine x1 y1 x2 y2>`, `<ResolveBadge x y label>`, `<PhaseCaption x y pending resolved>`. Centralize the diagram colors in one tokens module mirroring the `@theme` palette (replaces per-file hex constants).
   Verify: each primitive renders standalone in isolation.
4. Recompose `system-map.tsx` as pure composition of the primitives; node labels, badge text, captions, and the figcaption move into the landing frontmatter (diagram schema) and flow in via the `Method` section.
   Verify: `grep` finds no copy literals or `motion.` elements left in `system-map.tsx`.
5. Visual parity checklist in `just dev`, normal and `prefers-reduced-motion`: ring draws on scroll-into-view; Invoice node pulses amber; after 1.8 s the loop resolves (green ring, flowing dashes, spoke line, badge springs in, caption swaps to "runs itself"); reduced motion shows the final state immediately with no animation.
   Verify: side-by-side against the pre-phase build, frame behavior identical.
6. Full gate.
   Verify: `just check` green (keep primitives consumed internally so knip stays clean until MDX usage lands).

## Phase 4 — MDX bodies and the insights collection

1. Add catalog entries: `@content-collections/markdown` and `@content-collections/mdx`. Record the platform constraint where the collections are defined: compiled MDX evaluates via `new Function`, so MDX-bodied routes must stay prerendered or client-rendered — never request-time SSR on Workers.
   Verify: `bun install` clean.
2. Privacy: move the section prose from frontmatter into the MDX body (markdown-compiled — no eval); `PrivacyPage` renders the compiled body inside `SubpageLayout` within a prose wrapper that reproduces today's typography (lead emphasis, spacing, `text-lg`).
   Verify: rendered text and styling unchanged; privacy story still passes.
3. Agent and insights pages: move their paragraphs into MDX bodies (mdx-compiled, components mapping available for future embeds); the email-capture forms stay in the TSX page layouts.
   Verify: rendered pages unchanged; `bun test tests` green.
4. Add a landing-page story asserting copy that now flows from MDX (for example the privacy lead "What we collect.") so the MDX pipeline is covered by tests.
   Verify: new story passes; breaking the MDX body breaks the test.
5. Insights collection: `content/insights/*.mdx` with schema `{ title, description, date, draft }`; insights index lists published posts (keeps the email capture as empty state); new `insights/$slug` route renders a post with `head()` from frontmatter. Seed one `draft: true` sample post.
   Verify: draft is excluded from the list and the build; flipping it to `draft: false` locally prerenders `insights/<slug>` HTML containing the article (then revert).
6. Per-post OG images: parameterize the satori card (title/description) and emit one image per published post during build; the post `head()` points `og:image` at it.
   Verify: with the sample post published locally, the build emits its image and the post HTML references it.
7. Full gate.
   Verify: `just check` green.

## Phase 5 — Base UI, on demand (deferred)

1. Add nothing now: no component-library dependency; `cn()` and the `@theme` tokens stay as-is.
   Verify: this phase changes no `package.json` until a trigger fires.
2. Trigger: the first widget needing focus or keyboard management beyond native elements (dialog, tabs, combobox, keyboard-navigable accordion). Action: add `@base-ui/react` (catalog, pinned) and import only the needed part (`@base-ui/react/<component>`).
3. Wrap each adopted primitive in a house-style component in `packages/ui` (extend its `exports` map), styled with the existing tokens. Use `reference_clones/ui/apps/v4/registry/bases/base/ui/<component>.tsx` as the reference implementation; adapt with `eslint --fix` (arrow functions, `type`-only) — no lint suppressions.
   Verify: `just check` green with the new component.
4. The FAQ stays native `<details>`/`<summary>` until a requirement demands arrow-key navigation or animated collapse.
5. Escalation: if an app surface emerges (agent console, dashboards), evaluate full shadcn on the Base UI base via its bun-monorepo flow into `packages/ui`, accepting the one-time token rename (`accent` → `primary`, `muted` → `muted-foreground`). Record that decision in a new roadmap document first.
