import type { ReactNode } from 'react';

import { ChevronDown } from 'lucide-react';

export const Disclosure = ({ children, summary }: { children: ReactNode; summary: ReactNode }) => (
  <details className='group rounded-xl border border-border bg-surface transition-colors hover:border-accent/55'>
    <summary className='flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-heading'>
      {summary}
      <ChevronDown aria-hidden className='h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180' />
    </summary>
    <div className='px-5 pb-5 text-muted'>{children}</div>
  </details>
);
