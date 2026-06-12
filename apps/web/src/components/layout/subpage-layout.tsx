import type { ReactNode } from 'react';

import { GridBackground } from '@zyplux/ui/components/grid-background';
import { cx } from '@zyplux/ui/lib/style';
import { container, navLink } from '@zyplux/ui/recipes';
import { ArrowLeft } from 'lucide-react';

import { Footer } from '@/components/sections/footer';
import { BrandMark } from '@/components/ui/brand-mark';
import { NAV, SKIP_LINK_LABEL } from '@/content';

export const SubpageLayout = ({ children }: { children: ReactNode }) => (
  <div className='min-h-screen overflow-x-hidden'>
    <a className='skip-link' href='#main-content'>
      {SKIP_LINK_LABEL}
    </a>
    <GridBackground />
    <header className='border-b border-border'>
      <div className={container({ class: 'py-4 flex items-center justify-between' })}>
        <a className='flex items-center gap-2' href='/'>
          <BrandMark />
        </a>
        <a className={cx(navLink(), 'flex items-center gap-2')} href='/'>
          <ArrowLeft aria-hidden className='h-4 w-4' />
          {NAV.backHome}
        </a>
      </div>
    </header>
    <main className={container({ class: 'py-24 max-w-2xl' })} id='main-content'>
      {children}
    </main>
    <Footer />
  </div>
);
