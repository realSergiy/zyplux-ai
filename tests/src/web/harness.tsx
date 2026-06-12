import type { ReactNode } from 'react';

import { cleanup, render } from '@testing-library/react';
import { HomePage } from '@zyplux/web/routes/index';
import { act } from 'react';

import type { Harness } from '@/stories/harness';

const visibleText = () => document.body.textContent;

export const pageHarness = (page: ReactNode): Harness => ({
  open: async () => {
    await act(async () => {
      render(page);
      await Promise.resolve();
    });
    return {
      assert: {
        shows: text => {
          if (!visibleText().includes(text)) {
            throw new Error(`expected the page to show ${JSON.stringify(text)}`);
          }
        },
      },
      dispose: () => {
        cleanup();
      },
    };
  },
});

export const webHarness = pageHarness(<HomePage />);
