import { cleanup, render } from '@testing-library/react';
import App from '@zyplux/web';
import { act } from 'react';

import type { Harness } from '../stories/harness';

const visibleText = () => document.body.textContent;

export const webHarness: Harness = {
  open: async () => {
    await act(async () => {
      render(<App />);
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
};
