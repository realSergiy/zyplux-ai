import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import { BRAND_NAME, HERO } from '@/content';
import { button, container, heading, pill } from '@/styles';

const PARTICLES = [
  { delay: 0, duration: 7, left: '12%', size: 6, top: '28%' },
  { delay: 0.8, duration: 8, left: '70%', size: 5, top: '20%' },
  { delay: 1.5, duration: 9, left: '82%', size: 4, top: '34%' },
  { delay: 2.2, duration: 10, left: '24%', size: 4, top: '64%' },
  { delay: 1.1, duration: 8.5, left: '90%', size: 5, top: '70%' },
];

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {prefersReducedMotion !== true && (
        <div aria-hidden className='pointer-events-none absolute inset-0 z-0'>
          {PARTICLES.map(particle => (
            <motion.span
              animate={{ opacity: [0.15, 0.5, 0.15], y: [0, -18, 0] }}
              className='absolute rounded-full bg-accent/40'
              initial={{ opacity: 0.15, y: 0 }}
              key={`${particle.left}-${particle.top}`}
              style={{ height: particle.size, left: particle.left, top: particle.top, width: particle.size }}
              transition={{ delay: particle.delay, duration: particle.duration, ease: 'easeInOut', repeat: Infinity }}
            />
          ))}
        </div>
      )}
      <div className={container({ class: 'py-32 relative z-10' })}>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className='text-center max-w-4xl mx-auto'
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className={pill({ class: 'px-4 py-2 mb-8', tone: 'accent' })}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className='h-4 w-4 text-accent' />
            <span className='text-sm font-medium text-accent'>{HERO.badge}</span>
          </motion.div>

          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className={heading({ class: 'mb-6', scale: 'hero' })}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className='text-gradient animate-shimmer bg-size-[200%_auto]'>{BRAND_NAME}</span>
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className='text-lg md:text-xl text-muted mb-12 max-w-3xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {HERO.subhead}
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <motion.a
                className={button({ class: 'flex items-center gap-2' })}
                href='#audit'
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {HERO.primaryCta}
                <ArrowRight className='h-5 w-5' />
              </motion.a>

              <motion.a
                className={button({ intent: 'secondary' })}
                href='#week'
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {HERO.secondaryCta}
              </motion.a>
            </div>
            <p className='mt-4 text-sm italic text-muted'>{HERO.microcopy}</p>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1 }}
          className='absolute bottom-8 left-1/2 -translate-x-1/2'
          initial={{ opacity: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            className='text-muted'
            initial={{ y: 0 }}
            transition={{ delay: 1.1, duration: 2, repeat: Infinity }}
          >
            <div className='w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-2'>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                className='w-1.5 h-1.5 bg-accent rounded-full'
                initial={{ y: 0 }}
                transition={{ delay: 1.1, duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
