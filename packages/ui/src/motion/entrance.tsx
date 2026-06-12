import type { ReactNode } from 'react';

import * as m from 'motion/react-m';

export const Entrance = ({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) => (
  <m.div
    animate={{ opacity: 1, y: 0 }}
    className={className}
    initial={{ opacity: 0, y }}
    transition={{ delay, duration: 0.8 }}
  >
    {children}
  </m.div>
);
