import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';
import { Reveal } from '@zyplux/ui/motion';
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
}: {
  children: ReactNode;
  className?: string | undefined;
  heading?: ReactNode;
  id?: string | undefined;
}) => (
  <section className='relative py-32' id={id}>
    <div className={container({ className })}>
      {headingContent !== undefined && <SectionHeading className='mb-16'>{headingContent}</SectionHeading>}
      {children}
    </div>
  </section>
);
