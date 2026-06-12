import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';

export const StepBadge = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span
    className={cx(
      'flex size-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-semibold text-accent',
      className,
    )}
  >
    {children}
  </span>
);
