import HomeBody from '@content/home.mdx';
import { GridBackground } from '@zyplux/ui/layout';

import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { HOME_COMPONENTS } from '@/components/mdx/home-components';
import { SKIP_LINK_LABEL } from '@/site';

export const HomePage = () => (
  <div className='min-h-screen overflow-x-hidden'>
    <a className='skip-link' href='#main-content'>
      {SKIP_LINK_LABEL}
    </a>
    <GridBackground />
    <Navigation />
    <main id='main-content'>
      <HomeBody components={HOME_COMPONENTS} />
    </main>
    <Footer />
  </div>
);
