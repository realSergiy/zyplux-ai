import type { ReactNode } from 'react';

import { useInView, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { useRef } from 'react';

export const REVEAL_STAGGER_S = 0.2;

export const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px', once: false });
  const prefersReducedMotion = useReducedMotion();
  const hidden = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 };
  const shown = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <m.div
      animate={isInView ? shown : hidden}
      className={className}
      initial={hidden}
      ref={ref}
      style={{ willChange: 'transform, opacity' }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </m.div>
  );
};
