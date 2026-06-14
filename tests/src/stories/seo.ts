import { test } from 'vitest';

import { BRAND_NAME } from '@/fixtures/content';

import type { Harness } from './harness';

const registerSeoScenarios = (harness: Harness, pageName: string, title: string) => {
  test(`the ${pageName} page head carries the brand and its title`, async () => {
    const scene = await harness.open();
    scene.assert.shows(BRAND_NAME);
    scene.assert.shows(title);
    scene.dispose();
  });

  test(`the ${pageName} page declares the share-card image and dimensions`, async () => {
    const scene = await harness.open();
    scene.assert.shows('/og.png');
    scene.assert.shows('1200');
    scene.assert.shows('630');
    scene.dispose();
  });
};

export default registerSeoScenarios;
