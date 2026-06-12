import type { ReactNode } from 'react';

import { BackLink, SubpageShell } from '@zyplux/ui/blocks/subpage-shell';

import { Footer } from '@/components/layout/footer';
import { BrandMark } from '@/components/ui/brand-mark';
import { NAV, SKIP_LINK_LABEL } from '@/content';

export const SubpageLayout = ({ children }: { children: ReactNode }) => (
  <SubpageShell
    backLink={<BackLink href='/'>{NAV.backHome}</BackLink>}
    brand={
      <a className='flex items-center gap-2' href='/'>
        <BrandMark />
      </a>
    }
    footer={<Footer />}
    skipLinkLabel={SKIP_LINK_LABEL}
  >
    {children}
  </SubpageShell>
);
