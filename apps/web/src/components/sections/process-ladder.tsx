import { motion } from 'motion/react';

import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { CardTitle, SpotlightCard } from '@/components/ui/spotlight-card';
import { PROCESS } from '@/content';
import { button } from '@/styles';

export const ProcessLadder = () => (
  <Section id='how-it-works'>
    <SectionHeading className='mb-16'>{PROCESS.heading}</SectionHeading>

    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl'>
      {PROCESS.steps.map((step, index) => (
        <Reveal delay={index * 0.08} key={step.title}>
          <SpotlightCard>
            <span className='mb-6 flex size-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-semibold text-accent'>
              {index + 1}
            </span>
            <CardTitle className='mb-3'>{step.title}</CardTitle>
            <p className='text-muted'>{step.body}</p>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>

    <Reveal className='mt-16 text-center'>
      <motion.a
        className={button({ class: 'inline-block' })}
        href='#audit'
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {PROCESS.cta}
      </motion.a>
    </Reveal>
  </Section>
);
