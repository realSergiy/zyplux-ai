import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';

const GRID_FADE_MASK = 'radial-gradient(ellipse 75% 90% at 50% 0%, black 25%, transparent 78%)';
const FINE_CELL_PX = 36;
const COARSE_CELL_PX = 180;
const FINE_PARALLAX_RATE = 0.12;
const COARSE_PARALLAX_RATE = 0.28;

const buildGridLines = (cellPx: number, lineColor: string) => ({
  backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
  backgroundSize: `${String(cellPx)}px ${String(cellPx)}px`,
});

export const GridBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const fineDrift = useTransform(scrollY, latest =>
    prefersReducedMotion ? 0 : -((latest * FINE_PARALLAX_RATE) % FINE_CELL_PX),
  );
  const coarseDrift = useTransform(scrollY, latest =>
    prefersReducedMotion ? 0 : -((latest * COARSE_PARALLAX_RATE) % COARSE_CELL_PX),
  );

  return (
    <div
      aria-hidden
      className='fixed inset-0 -z-10 overflow-hidden'
      style={{ maskImage: GRID_FADE_MASK, WebkitMaskImage: GRID_FADE_MASK }}
    >
      <m.div
        className='absolute inset-x-0 -inset-y-45'
        style={{ ...buildGridLines(FINE_CELL_PX, 'var(--color-grid-line)'), y: fineDrift }}
      />
      <m.div
        className='absolute inset-x-0 -inset-y-45'
        style={{ ...buildGridLines(COARSE_CELL_PX, 'var(--color-grid-line-coarse)'), y: coarseDrift }}
      />
    </div>
  );
};
