import type { LucideIcon } from 'lucide-react';

import { useInView, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { useRef } from 'react';

export const Pictogram = ({ delay = 0, icon: Icon }: { delay?: number; icon: LucideIcon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px 0px', once: false });
  const prefersReducedMotion = useReducedMotion();

  const hidden = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -180, scale: 0 };
  const shown = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 };
  const hover = prefersReducedMotion ? { opacity: 1 } : { rotate: 360, scale: 1.1 };

  return (
    <m.div
      animate={isInView ? shown : hidden}
      className='mb-5 flex size-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent'
      initial={hidden}
      ref={ref}
      style={{ willChange: 'transform, opacity' }}
      transition={{ delay: delay + 0.1, stiffness: 200, type: 'spring' }}
      whileHover={hover}
    >
      <Icon aria-hidden className='size-6' />
    </m.div>
  );
};
