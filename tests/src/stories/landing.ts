import { test } from 'bun:test';

import type { Harness } from './harness';

import { BRAND_NAME, HERO_BADGE, SKIP_LINK_LABEL } from '../fixtures/content';

const registerLandingScenarios = (harness: Harness) => {
  test('shows the brand and hero copy', async () => {
    const scene = await harness.open();
    scene.assert.shows(BRAND_NAME);
    scene.assert.shows(HERO_BADGE);
    scene.dispose();
  });

  test('offers a skip link to main content', async () => {
    const scene = await harness.open();
    scene.assert.shows(SKIP_LINK_LABEL);
    scene.dispose();
  });
};

export default registerLandingScenarios;
