import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router';
import { act, cleanup, render } from '@testing-library/react';
import { routeTree } from '@zyplux/web/route-tree';

import type { Harness } from '@/stories/harness';

const visibleText = () => document.body.textContent;

export const routerHarness = (path: string): Harness => ({
  open: async () => {
    const router = createRouter({
      history: createMemoryHistory({ initialEntries: [path] }),
      routeTree,
    });
    await act(async () => {
      await router.load();
      render(<RouterProvider router={router} />);
    });
    return {
      assert: {
        shows: text => {
          if (!visibleText().includes(text)) {
            throw new Error(`expected the page at ${path} to show ${JSON.stringify(text)}`);
          }
        },
      },
      dispose: () => {
        cleanup();
      },
    };
  },
});
