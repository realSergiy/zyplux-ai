import { FloatingParticles } from '@zyplux/ui/components/floating-particles';
import { ScrollCue } from '@zyplux/ui/components/scroll-cue';
import { button, container, heading, pill } from '@zyplux/ui/recipes';
import { ArrowRight, Sparkles } from 'lucide-react';
import * as m from 'motion/react-m';

import { BRAND_NAME, HERO } from '@/content';

export const Hero = () => (
  <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
    <FloatingParticles />
    <div className={container({ class: 'py-32 relative z-10' })}>
      <m.div
        animate={{ opacity: 1, y: 0 }}
        className='text-center max-w-4xl mx-auto'
        initial={{ opacity: 0, y: 30 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <m.div
          animate={{ opacity: 1, scale: 1 }}
          className={pill({ class: 'px-4 py-2 mb-8', tone: 'accent' })}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className='h-4 w-4 text-accent' />
          <span className='text-sm font-medium text-accent'>{HERO.badge}</span>
        </m.div>

        <m.h1
          animate={{ opacity: 1, y: 0 }}
          className={heading({ class: 'mb-6', scale: 'hero' })}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className='text-gradient animate-shimmer bg-size-[200%_auto]'>{BRAND_NAME}</span>
        </m.h1>

        <m.p
          animate={{ opacity: 1, y: 0 }}
          className='text-lg md:text-xl text-muted mb-12 max-w-3xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {HERO.subhead}
        </m.p>

        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <m.a
              className={button({ class: 'flex items-center gap-2' })}
              href='#audit'
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {HERO.primaryCta}
              <ArrowRight className='h-5 w-5' />
            </m.a>

            <m.a
              className={button({ intent: 'secondary' })}
              href='#week'
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {HERO.secondaryCta}
            </m.a>
          </div>
          <p className='mt-4 text-sm italic text-muted'>{HERO.microcopy}</p>
        </m.div>
      </m.div>

      <ScrollCue />
    </div>
  </section>
);
