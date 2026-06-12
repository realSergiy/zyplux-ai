import type { ReactNode } from 'react';

import { CardTitle } from './spotlight-card';

export const ShowcasePanel = ({
  children,
  demo,
  title,
}: {
  children: ReactNode;
  demo: ReactNode;
  title: ReactNode;
}) => (
  <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-2xl border border-border bg-surface/40 p-8'>
    <div>
      <CardTitle className='text-2xl mb-3'>{title}</CardTitle>
      <p className='text-muted'>{children}</p>
    </div>
    {demo}
  </div>
);
