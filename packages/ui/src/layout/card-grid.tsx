import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';
import { Reveal, REVEAL_STAGGER_S } from '@zyplux/ui/motion';
import { Children } from 'react';

export const CardGrid = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cx('grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl', className)}>
    {Children.map(children, (child, index) => (
      <Reveal delay={index * REVEAL_STAGGER_S}>{child}</Reveal>
    ))}
  </div>
);
