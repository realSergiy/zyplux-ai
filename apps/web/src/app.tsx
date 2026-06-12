import { GridBackground } from '@zyplux/ui/components/grid-background';

import { SKIP_LINK_LABEL } from '@/content';

import { Navigation } from './components/layout/navigation';
import { Faq } from './components/sections/faq';
import { FinalCta } from './components/sections/final-cta';
import { Footer } from './components/sections/footer';
import { FounderNote } from './components/sections/founder-note';
import { Hero } from './components/sections/hero';
import { Method } from './components/sections/method';
import { NotChatbot } from './components/sections/not-chatbot';
import { ProcessLadder } from './components/sections/process-ladder';
import { Security } from './components/sections/security';
import { VignetteTimeline } from './components/sections/vignette-timeline';
import { WhatWeBuild } from './components/sections/what-we-build';

const App = () => (
  <div className='min-h-screen overflow-x-hidden'>
    <a className='skip-link' href='#main-content'>
      {SKIP_LINK_LABEL}
    </a>
    <GridBackground />
    <Navigation />
    <main id='main-content'>
      <Hero />
      <Method />
      <VignetteTimeline />
      <WhatWeBuild />
      <NotChatbot />
      <ProcessLadder />
      <FounderNote />
      <Security />
      <Faq />
      <FinalCta />
    </main>
    <Footer />
  </div>
);

export default App;
