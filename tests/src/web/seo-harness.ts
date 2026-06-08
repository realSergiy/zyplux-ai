import { PAGES } from '@zyplux/web/content';
import { pageHead, type PageHead, type PageKey } from '@zyplux/web/seo';

import type { Harness } from '../stories/harness';

const flatten = (head: PageHead) => [head.title, ...head.tags.map(tag => tag.content)].join('\n');

export const seoHarness = (key: PageKey) =>
  ({
    open: () => {
      const head = flatten(pageHead(PAGES[key]));
      let disposed = false;
      return Promise.resolve({
        assert: {
          shows: text => {
            if (disposed) {
              throw new Error('scene used after dispose');
            }
            if (!head.includes(text)) {
              throw new Error(`expected the ${key} page head to include ${JSON.stringify(text)}`);
            }
          },
        },
        dispose: () => {
          disposed = true;
        },
      });
    },
  }) satisfies Harness;
