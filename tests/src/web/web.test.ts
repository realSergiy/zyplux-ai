import { AgentPage } from '@zyplux/web/routes/agent';
import { PrivacyPage } from '@zyplux/web/routes/privacy';
import { createElement } from 'react';

import { PAGE_META } from '@/fixtures/content';
import registerLandingScenarios from '@/stories/landing';
import registerSeoScenarios from '@/stories/seo';
import registerSubpageScenarios from '@/stories/subpages';

import { pageHarness, webHarness } from './harness';
import { seoHarness } from './seo-harness';

registerLandingScenarios(webHarness);

registerSubpageScenarios('privacy', pageHarness(createElement(PrivacyPage)), [
  'Privacy, plainly.',
  'What we collect.',
  'Zyplux is based in Sydney, Australia.',
]);

registerSubpageScenarios('agent', pageHarness(createElement(AgentPage)), [
  'The agent, live.',
  'We’re polishing the showcase.',
]);

registerSeoScenarios(seoHarness('home', PAGE_META.home, '/'), 'home', PAGE_META.home.title);
registerSeoScenarios(seoHarness('agent', PAGE_META.agent, '/agent'), 'agent', PAGE_META.agent.title);
registerSeoScenarios(seoHarness('insights', PAGE_META.insights, '/insights'), 'insights', PAGE_META.insights.title);
registerSeoScenarios(seoHarness('privacy', PAGE_META.privacy, '/privacy'), 'privacy', PAGE_META.privacy.title);
