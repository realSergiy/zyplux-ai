import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';

import { heading } from '@/styles';

export const PageHeadline = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h1 className={heading({ class: cx('mb-8', className) })}>
    <span className='text-gradient'>{children}</span>
  </h1>
);
