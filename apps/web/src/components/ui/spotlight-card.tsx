import type { MouseEvent, ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';

const trackSpotlight = (event: MouseEvent<HTMLDivElement>) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--spot-x', `${String(event.clientX - bounds.left)}px`);
  event.currentTarget.style.setProperty('--spot-y', `${String(event.clientY - bounds.top)}px`);
};

export const SpotlightCard = ({ children }: { children: ReactNode }) => (
  <div
    className='group relative h-full overflow-hidden rounded-xl border border-border bg-surface p-8 transition-[border-color,box-shadow] duration-300 hover:border-accent/55 hover:shadow-glow'
    onMouseMove={trackSpotlight}
    style={{ backgroundImage: 'linear-gradient(180deg, rgb(110 118 129 / 0.07), transparent 40%)' }}
  >
    <div
      className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
      style={{
        background:
          'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgb(88 166 255 / 0.08), transparent 65%)',
      }}
    />
    <div className='relative z-10'>{children}</div>
  </div>
);

export const CardTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h3 className={cx('text-xl font-semibold text-heading mb-2', className)}>{children}</h3>
);
