import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';

import { container, heading } from '@/styles';

import { Reveal } from './reveal';

export const Section = ({ children, className, id }: { children: ReactNode; className?: string; id?: string }) => (
  <section className='relative py-32' id={id}>
    <div className={container({ className })}>{children}</div>
  </section>
);

export const SectionHeading = ({ children, className }: { children: ReactNode; className?: string }) => (
  <Reveal className={cx('text-center', className)}>
    <h2 className={heading()}>
      <span className='text-gradient'>{children}</span>
    </h2>
  </Reveal>
);
