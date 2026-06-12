import { type CVA, type CX, defineConfig } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';

const mergeThemeClasses = extendTailwindMerge<'text-gradient'>({
  extend: {
    classGroups: {
      animate: [{ animate: ['shimmer'] }],
      shadow: [{ shadow: ['glow'] }],
      'text-gradient': ['text-gradient'],
    },
  },
});

const styleConfig = defineConfig({ hooks: { onComplete: mergeThemeClasses } });

export const cva: CVA = styleConfig.cva;
export const cx: CX = styleConfig.cx;
