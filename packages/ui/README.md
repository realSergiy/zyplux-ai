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

- `@zyplux/ui/tokens` — `PALETTE` (hex values for SVG/canvas/OG rendering), `toRgba`
- `@zyplux/ui/recipes` — `container`, `heading`, `button`, `pill`, `navLink`, `fieldInput`
- `@zyplux/ui/lib/style` — `cva`, `cx` (cva + `tailwind-merge` taught the custom theme tokens)
- `@zyplux/ui/hooks/use-scrolled-past`
- `@zyplux/ui/components/*` — `reveal`, `section`, `spotlight-card`, `pictogram`, `page-headline`, `grid-background`, `disclosure`, `floating-particles`, `scroll-cue`, `scroll-progress-bar`
- `@zyplux/ui/forms/*` — `hosted-form` (hook + honeypot + status notes), `email-capture`
- `@zyplux/ui/diagram/*` — `diagram`, `primitives` (animated SVG diagram kit)

## Development

Exports raw TypeScript source (no build step); consuming applications transpile via Vite.
