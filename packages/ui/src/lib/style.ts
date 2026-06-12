import { type CVA, type CX, defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';

const styleConfig = defineConfig({ hooks: { onComplete: twMerge } });

export const cva: CVA = styleConfig.cva;
export const cx: CX = styleConfig.cx;
