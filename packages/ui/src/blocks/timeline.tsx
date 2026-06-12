import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';
import { Reveal, REVEAL_STAGGER_S } from '@zyplux/ui/motion/reveal';
import { useInView, useReducedMotion, useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import { useRef } from 'react';

export const Timeline = ({ children, className }: { children: ReactNode; className?: string }) => {
  const listRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ offset: ['start 80%', 'end 60%'], target: listRef });
  const progress = useSpring(scrollYProgress, { damping: 40, stiffness: 200 });

  return (
    <div className={cx('relative', className)}>
      <span aria-hidden className='absolute left-0 top-0 h-full w-px bg-border' />
      <m.span
        aria-hidden
        className='absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-accent to-violet'
        style={{ scaleY: prefersReducedMotion === true ? 1 : progress }}
      />
      <ol className='space-y-16 pl-8' ref={listRef}>
        {children}
      </ol>
    </div>
  );
};

export const TimelineItem = ({ children, index = 0 }: { children: ReactNode; index?: number }) => {
  const ref = useRef(null);
  const lit = useInView(ref, { margin: '-45% 0px -45% 0px' });

  return (
    <li className='relative' ref={ref}>
      <span
        aria-hidden
        className={cx(
          'absolute -left-[38px] top-1.5 size-3 rounded-full border-2 border-accent transition-colors duration-300',
          lit ? 'bg-accent' : 'bg-background',
        )}
      />
      <Reveal delay={index * REVEAL_STAGGER_S}>{children}</Reveal>
    </li>
  );
};
