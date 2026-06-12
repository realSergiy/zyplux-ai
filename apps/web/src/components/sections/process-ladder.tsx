import { Reveal } from '@zyplux/ui/components/reveal';
import { Section, SectionHeading } from '@zyplux/ui/components/section';
import { CardTitle, SpotlightCard } from '@zyplux/ui/components/spotlight-card';
import { button } from '@zyplux/ui/recipes';
import * as m from 'motion/react-m';

import { PROCESS } from '@/content';

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
      <m.a
        className={button({ class: 'inline-block' })}
        href='#audit'
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {PROCESS.cta}
      </m.a>
    </Reveal>
  </Section>
);
