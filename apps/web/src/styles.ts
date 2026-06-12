import { cva } from '@zyplux/ui/lib/style';

export const container = cva({ base: 'container mx-auto px-4' });

export const heading = cva({
  base: 'font-bold tracking-tight',
  defaultVariants: { scale: 'title' },
  variants: {
    scale: {
      hero: 'text-6xl md:text-8xl leading-tight',
      title: 'text-4xl md:text-5xl',
    },
  },
});

export const button = cva({
  base: 'rounded-lg font-semibold',
  defaultVariants: { intent: 'primary', size: 'lg' },
  variants: {
    intent: {
      primary:
        'bg-accent text-background shadow-lg shadow-accent/30 transition-shadow hover:shadow-xl hover:shadow-accent/45 disabled:opacity-60',
      secondary:
        'border border-border bg-surface/60 text-heading transition-colors hover:border-accent/55 hover:bg-surface',
    },
    size: {
      lg: 'px-7 py-3.5',
      md: 'px-7 py-3',
      sm: 'px-4 py-2 text-sm',
    },
  },
});

export const pill = cva({
  base: 'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm',
  variants: {
    tone: {
      accent: 'border-accent/30 bg-accent/10 text-accent',
      success: 'border-success/30 bg-success/10 text-success',
      violet: 'border-violet/30 bg-violet/10 text-violet',
    },
  },
});

export const navLink = cva({ base: 'text-sm font-medium text-muted transition-colors hover:text-heading' });

export const fieldInput = cva({
  base: 'rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent',
});
