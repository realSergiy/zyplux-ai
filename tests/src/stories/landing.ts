import { test } from 'vitest';

import {
  BRAND_NAME,
  BRAND_POSITIONING,
  BUILD_BUCKET_TITLES,
  BUILD_HEADING,
  METHOD_HEADING,
  SKIP_LINK_LABEL,
} from '@/fixtures/content';

import type { Harness } from './harness';

const registerLandingScenarios = (harness: Harness) => {
  test('shows the brand and hero copy', async () => {
    const scene = await harness.open();
    scene.assert.shows(BRAND_NAME);
    scene.assert.shows(BRAND_POSITIONING);
    scene.dispose();
  });

  test('offers a skip link to main content', async () => {
    const scene = await harness.open();
    scene.assert.shows(SKIP_LINK_LABEL);
    scene.dispose();
  });

  test('opens with the systems-thinking method', async () => {
    const scene = await harness.open();
    scene.assert.shows(METHOD_HEADING);
    scene.dispose();
  });

  test('shows the three places intelligence pays back', async () => {
    const scene = await harness.open();
    scene.assert.shows(BUILD_HEADING);
    for (const title of BUILD_BUCKET_TITLES) {
      scene.assert.shows(title);
    }
    scene.dispose();
  });
};

export default registerLandingScenarios;
