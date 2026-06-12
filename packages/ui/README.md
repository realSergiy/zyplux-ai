# @zyplux/ui

Shared design system: tokens, global styles, class recipes, and React components.

## Install

Peers expected in the consuming app: `react`, `react-dom`, `motion`, `lucide-react`, `tailwindcss` (v4).

## Styles

In the app's Tailwind entry CSS:

```css
@import 'tailwindcss';
@import '@zyplux/ui/theme.css';
@import '@zyplux/ui/base.css';
```

`theme.css` carries the design tokens (`@theme`) and a `@source` directive so the app's Tailwind build scans this package's classes. `base.css` adds the `text-gradient` utility and base layer (focus ring, `.skip-link`, body background).

## Motion

Wrap the app once; components animate via `m.*` + `LazyMotion`:

```tsx
import { MotionProvider } from '@zyplux/ui/motion/provider';
```

## Exports

Ordered from most abstract to most composed:

- `@zyplux/ui/tokens` — `PALETTE` (hex values for SVG/canvas/OG rendering), `TEXT_GRADIENT`, `toRgba`
- `@zyplux/ui/lib/style` — `cva`, `cx` (cva + `tailwind-merge` taught the custom theme tokens)
- `@zyplux/ui/recipes` — class-only recipes: `container`, `heading`, `button`, `pill`, `navLink`, `inlineLink`, `prose`, `avatar`, `fieldInput`, `fieldLabel`
- `@zyplux/ui/hooks/*` — `use-scrolled-past`, `use-typewriter`, `use-count-up`
- `@zyplux/ui/motion/*` — motion system: `provider`, `reveal` (in-view, exports `REVEAL_STAGGER_S`), `entrance` (mount; rise via `y`, pop via `scale`), `blinking-caret`, `floating-particles`, `scroll-cue`, `scroll-progress-bar`
- `@zyplux/ui/primitives/*` — context-free atoms: `button-link`, `brand-lockup`, `paragraphs`, `step-badge`, `pictogram`, `spotlight-card`, `feature-card` (icon + title + body in a spotlight card, plus `eyebrow`/`footer` slots), `step-card` (numbered step in a spotlight card), `showcase-panel` (title + body beside a live `demo` slot), `disclosure`, `animated-bars`
- `@zyplux/ui/layout/*` — page structure: `section` (Section with `heading`/`intro` slots that own the vertical rhythm: heading sits `mb-6` above an intro, `mb-16` above content; SectionHeading and SectionIntro stay exported for bespoke layouts), `card-grid` (responsive grid that stagger-reveals its children), `page-headline`, `grid-background`
- `@zyplux/ui/blocks/*` — slot-based page-scale compositions: `nav-bar`, `site-footer`, `subpage-shell`, `hero-shell`, `timeline` (TimelineItem stagger-reveals its content via `index`)
- `@zyplux/ui/forms/*` — `hosted-form` (hook + honeypot + status notes), `email-capture`
- `@zyplux/ui/diagram/*` — `diagram`, `primitives` (animated SVG diagram kit)

## Development

Exports raw TypeScript source (no build step); consuming applications transpile via Vite.
