# Session summary — 2026-06-07: zyplux.ai content swap

## Goal

Apply the content kit `docs/zyplux-new-content/` (since deleted) to the site: replace all
jargon-era copy ("Neural Intelligence Systems") with the services-first "Show, Then Sell"
narrative. Design system stayed; **no old copy survived**.

## What was built

### One-pager `/` (apps/web/src/App.tsx)

Section order per the locked structure:

1. **Navigation** — How it works / Security / FAQ anchors, "See the agent" → `/agent`,
   CTA button "Get your free audit" → `#audit`
2. **Hero** — badge "Private AI agents for mid-sized businesses"; h1 = **Zyplux**
   (shimmer gradient — founder reverted the planned "Work that finishes itself." h1);
   subhead "We connect a private AI agent…"; CTAs → `#audit` / `#week`
3. **Vignette timeline** (`#week`) — 4 scenes (invoice, weekly report, customer email,
   decision brief), timestamps + green ✓ status chips (new token `--color-success: #3fb950`)
4. **This is not a chatbot** — prose + 3-point card strip (replaced `features.tsx`)
5. **Process ladder** (`#how-it-works`) — audit → pilot → run/tune/expand
6. **Founder note** — photo `apps/web/src/assets/founder.jpg` (interim 400×400)
7. **Security** (`#security`) — 5 cards
8. **FAQ** (`#faq`) — 8 native `<details>/<summary>` items
9. **Final CTA** (`#audit`) — audit form
10. **Footer** — blurb, Navigate/Pages/Contact columns, email + LinkedIn, `© {year} Zyplux.`

### Subpages (static Vite inputs, no router)

`agent.html`, `insights.html`, `privacy.html` → entries `src/{agent,insights,privacy}.tsx`
→ `src/pages/*-page.tsx`, shared `SubpageLayout` (logo + Back home + Footer).
Served extensionless by Cloudflare assets (verified via `vite preview`: all four routes 200
with correct titles). Email capture on `/agent` and `/insights` only.

### Architecture decisions

- **`apps/web/src/content.ts`** — single typed module holding every user-visible string,
  exported as `@zyplux/web/content`; test fixtures re-export from it
- **Forms** — custom-markup `fetch` POST to one `FORM_ENDPOINT` constant (placeholder!),
  hidden `form` field discriminates `audit` / `agent-updates` / `insights-updates`;
  honeypot field `website`; inline thank-you / error states
  (`components/forms/hosted-form.tsx`, `audit-form.tsx`, `email-capture.tsx`)
- **UI extraction** — `components/ui/spotlight-card.tsx` (hover spotlight from old
  FeatureCard) and `components/ui/reveal.tsx` (useInView + reduced-motion)
- Shared `src/mount.tsx` bootstraps all four entries; `vite.config.ts` got
  `build.rollupOptions.input` with the four HTML files
- React 19 deprecates `FormEvent` → used `SubmitEvent`
- `knip.json`: declared the three new entries (`src/agent.tsx` etc.)

### Supporting changes

- `index.html` — title/meta/OG rewritten; OG image wired (see below)
- `OVERVIEW.md` — stale "3D scenes" sections updated to current structure
- Tests — `HERO_BADGE` updated; headline fixture added then removed with the hero revert
- Founder photo copied to `apps/web/src/assets/` (hashed import)

## Founder inputs during session

- LinkedIn (in footer): <https://www.linkedin.com/in/sergiy-yeskov-4a8534152/>
- <hello@zyplux.ai> mailbox: being set up by Sergiy (launch blocker until live)
- Hero: keep **Zyplux** as h1; keep subhead; drop "Work that finishes itself." from hero
  (it remains `<title>` and `og:title`)
- Privacy: full page at `/privacy` (footer-linked) per pages/privacy.md from the kit

## og:image

- `apps/web/public/og.png` (1200×630) generated from versioned source
  `apps/web/og-image.html` via **`just og-image`** (headless Chromium; Inter from Google
  Fonts at generation time; design mirrors site tokens: grid, glows, badge, bolt +
  gradient wordmark, tagline, domain)
- `index.html`: `og:image` absolute URL + width/height/alt; `twitter:card` →
  `summary_large_image`
- After deploy, validate cards at opengraph.xyz / LinkedIn Post Inspector (caches!)

## Outstanding (see docs/post-new-content.md for full detail)

## Launch blockers

1. `FORM_ENDPOINT` in `apps/web/src/content.ts` is a placeholder — create a plain-POST
   form service account (Formspree/Web3Forms class, not iframe-embed), paste URL, and
   name the provider in `PRIVACY_PAGE` "Where it goes."
2. <hello@zyplux.ai> must receive mail before launch (never publish the personal address)

**Verify before launch** — privacy "no analytics" claim (true today; update if Cloudflare
Web Analytics enabled); read the invented `FORM_MESSAGES` microcopy; founder photo is
interim.

**Later** — `/agent` showcase embed (sandboxed demo from totvibe-agent repo; approval
moments + audit log are the money shots); 5 insights article seeds; booking-link
secondary CTA; light theme + headline A/B.

**Copy rules (ongoing)** — brand "Zyplux" never "Zyplux.ai"; banned words: agentic, LLM,
orchestration, RAG, model, prompt, leverage, transformative (sole exception: the
canonical "never trains public AI models" line); claims must be true of the product;
vignettes labeled scenarios; no invented numbers; no public pricing.

## Git state caveat

The content kit was **staged but never committed**, then deleted from the worktree.
Staged copies survive in the index until commit/re-add: `git restore
docs/zyplux-new-content` recovers it (e.g. to commit the kit + research into history);
`git add -A` makes the deletion final. Everything operationally needed was carried into
`docs/post-new-content.md`.

## Verification

- `just check` passes (knip, typecheck, lint, 5/5 tests); `just build` emits all four
  pages + og.png
- Banned-words sweep clean (only the canonical "models" lines)
- All anchors resolve; all CTAs reach `#audit`; forms render (submission blocked on the
  real endpoint)
- Working tree left **unstaged** for review; nothing committed or deployed
