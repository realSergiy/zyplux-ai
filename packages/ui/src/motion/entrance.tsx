import type { ReactNode } from 'react';

import * as m from 'motion/react-m';

export const Entrance = ({
  children,
  className,
  delay = 0,
  scale = 1,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: number;
  y?: number;
}) => (
  <m.div
    animate={{ opacity: 1, scale: 1, y: 0 }}
    className={className}
    initial={{ opacity: 0, scale, y }}
    transition={{ delay, duration: 0.8 }}
  >
    {children}
  </m.div>
);
