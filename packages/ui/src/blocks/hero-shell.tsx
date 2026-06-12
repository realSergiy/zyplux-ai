import type { ReactNode } from 'react';

import { FloatingParticles } from '@zyplux/ui/motion';
import { ScrollCue } from '@zyplux/ui/motion';
import { container } from '@zyplux/ui/recipes';
import * as m from 'motion/react-m';

export const HeroShell = ({ children }: { children: ReactNode }) => (
  <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
    <FloatingParticles />
    <div className={container({ class: 'py-32 relative z-10' })}>
      <m.div
        animate={{ opacity: 1, y: 0 }}
        className='text-center max-w-4xl mx-auto'
        initial={{ opacity: 0, y: 30 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {children}
      </m.div>
      <ScrollCue />
    </div>
  </section>
);
