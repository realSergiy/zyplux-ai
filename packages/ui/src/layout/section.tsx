import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';
import { Reveal } from '@zyplux/ui/motion/reveal';
import { Paragraphs } from '@zyplux/ui/primitives/paragraphs';
import { container, heading, prose } from '@zyplux/ui/recipes';

export const SectionHeading = ({ children, className }: { children: ReactNode; className?: string }) => (
  <Reveal className={cx('text-center', className)}>
    <h2 className={heading()}>
      <span className='text-gradient'>{children}</span>
    </h2>
  </Reveal>
);

export const SectionIntro = ({
  centered = false,
  children,
  className,
}: {
  centered?: boolean;
  children: ReactNode;
  className?: string;
}) => (
  <Reveal className={cx(prose({ tone: 'muted' }), 'mx-auto max-w-2xl', centered && 'text-center', className)}>
    {children}
  </Reveal>
);

export const Section = ({
  children,
  className,
  heading: headingContent,
  id,
  intro,
  introCentered = false,
}: {
  children: ReactNode;
  className?: string;
  heading?: ReactNode;
  id?: string;
  intro?: string | string[];
  introCentered?: boolean;
}) => (
  <section className='relative py-32' id={id}>
    <div className={container({ className })}>
      {headingContent !== undefined && (
        <SectionHeading className={intro === undefined ? 'mb-16' : 'mb-6'}>{headingContent}</SectionHeading>
      )}
      {intro !== undefined && (
        <SectionIntro centered={introCentered} className='mb-16'>
          <Paragraphs>{typeof intro === 'string' ? [intro] : intro}</Paragraphs>
        </SectionIntro>
      )}
      {children}
    </div>
  </section>
);
