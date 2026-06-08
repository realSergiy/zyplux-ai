import { PAGES } from '../fixtures/content';
import registerLandingScenarios from '../stories/landing';
import registerSeoScenarios from '../stories/seo';
import { webHarness } from './harness';
import { seoHarness } from './seo-harness';

registerLandingScenarios(webHarness);

registerSeoScenarios(seoHarness('index'), 'home', PAGES.index.title);
registerSeoScenarios(seoHarness('agent'), 'agent', PAGES.agent.title);
registerSeoScenarios(seoHarness('insights'), 'insights', PAGES.insights.title);
registerSeoScenarios(seoHarness('privacy'), 'privacy', PAGES.privacy.title);
