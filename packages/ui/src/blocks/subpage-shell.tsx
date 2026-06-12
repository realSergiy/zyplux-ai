import type { ReactNode } from 'react';

import { GridBackground } from '@zyplux/ui/layout/grid-background';
import { cx } from '@zyplux/ui/lib/style';
import { container, navLink } from '@zyplux/ui/recipes';
import { ArrowLeft } from 'lucide-react';

export const BackLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <a className={cx(navLink(), 'flex items-center gap-2')} href={href}>
    <ArrowLeft aria-hidden className='h-4 w-4' />
    {children}
  </a>
);

export const SubpageShell = ({
  backLink,
  brand,
  children,
  footer,
  skipLinkLabel,
}: {
  backLink: ReactNode;
  brand: ReactNode;
  children: ReactNode;
  footer: ReactNode;
  skipLinkLabel: string;
}) => (
  <div className='min-h-screen overflow-x-hidden'>
    <a className='skip-link' href='#main-content'>
      {skipLinkLabel}
    </a>
    <GridBackground />
    <header className='border-b border-border'>
      <div className={container({ class: 'py-4 flex items-center justify-between' })}>
        {brand}
        {backLink}
      </div>
    </header>
    <main className={container({ class: 'py-24 max-w-2xl' })} id='main-content'>
      {children}
    </main>
    {footer}
  </div>
);
