import { Reveal } from '@zyplux/ui/components/reveal';
import { Section, SectionHeading } from '@zyplux/ui/components/section';
import { pill } from '@zyplux/ui/recipes';
import { Check } from 'lucide-react';
import { useInView, useReducedMotion, useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import { useRef } from 'react';

import { TIMELINE } from '@/content';

const TimelineScene = ({ index, scene }: { index: number; scene: (typeof TIMELINE.scenes)[0] }) => {
  const ref = useRef(null);
  const lit = useInView(ref, { margin: '-45% 0px -45% 0px' });
  return (
    <li className='relative' ref={ref}>
      <span
        aria-hidden
        className={`absolute -left-[38px] top-1.5 size-3 rounded-full border-2 border-accent transition-colors duration-300 ${
          lit ? 'bg-accent' : 'bg-background'
        }`}
      />
      <Reveal delay={index * 0.08}>
        <h3 className='text-xl md:text-2xl font-semibold mb-3'>
          <span className='text-accent'>{scene.timestamp}</span>
          <span className='text-heading'> — {scene.title}</span>
        </h3>
        <p className='text-muted mb-4'>{scene.body}</p>
        <p className={pill({ tone: 'success' })}>
          <Check aria-hidden className='h-4 w-4' />
          {scene.status}
        </p>
      </Reveal>
    </li>
  );
};

export const VignetteTimeline = () => {
  const listRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ offset: ['start 80%', 'end 60%'], target: listRef });
  const progress = useSpring(scrollYProgress, { damping: 40, stiffness: 200 });

  return (
    <Section id='week'>
      <SectionHeading className='mb-20'>{TIMELINE.intro}</SectionHeading>

      <div className='relative mx-auto max-w-2xl'>
        <span aria-hidden className='absolute left-0 top-0 h-full w-px bg-border' />
        <m.span
          aria-hidden
          className='absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-accent to-violet'
          style={{ scaleY: prefersReducedMotion === true ? 1 : progress }}
        />
        <ol className='space-y-16 pl-8' ref={listRef}>
          {TIMELINE.scenes.map((scene, index) => (
            <TimelineScene index={index} key={scene.timestamp} scene={scene} />
          ))}
        </ol>
      </div>

      <Reveal className='mx-auto mt-20 max-w-2xl text-center'>
        <p className='text-muted'>
          {TIMELINE.bridgeStart}{' '}
          <a className='text-accent hover:underline' href='#audit'>
            {TIMELINE.bridgeLink}
          </a>
          {TIMELINE.bridgeEnd}
        </p>
      </Reveal>
    </Section>
  );
};
