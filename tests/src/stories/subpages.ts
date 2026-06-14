import { test } from 'vitest';

import type { Harness } from './harness';

const registerSubpageScenarios = (name: string, harness: Harness, copies: string[]) => {
  test(`the ${name} page shows its body copy from the content pipeline`, async () => {
    const scene = await harness.open();
    for (const copy of copies) {
      scene.assert.shows(copy);
    }
    scene.dispose();
  });
};

export default registerSubpageScenarios;
