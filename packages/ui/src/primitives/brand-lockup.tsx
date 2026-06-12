import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export const BrandLockup = ({ children, icon: Icon }: { children: ReactNode; icon: LucideIcon }) => (
  <>
    <Icon aria-hidden className='h-6 w-6 text-accent' />
    <span className='text-xl font-bold tracking-tight text-heading'>{children}</span>
  </>
);
