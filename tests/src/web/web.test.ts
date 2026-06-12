import { AgentPage } from '@zyplux/web/pages/agent-page';
import { PrivacyPage } from '@zyplux/web/pages/privacy-page';
import { createElement } from 'react';

import { PAGES } from '@/fixtures/content';
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

registerSeoScenarios(seoHarness('index', '/'), 'home', PAGES.index.title);
registerSeoScenarios(seoHarness('agent', '/agent'), 'agent', PAGES.agent.title);
registerSeoScenarios(seoHarness('insights', '/insights'), 'insights', PAGES.insights.title);
registerSeoScenarios(seoHarness('privacy', '/privacy'), 'privacy', PAGES.privacy.title);
