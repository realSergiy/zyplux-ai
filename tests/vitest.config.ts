import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { MDX_OPTIONS } from '@zyplux/mdx';
import { insightsFrontmatterPlugin } from '@zyplux/web/insights-frontmatter-plugin';
import { defineConfig } from 'vitest/config';

// Tests import web-app modules that compile `.mdx` and read the
// `virtual:insights-frontmatter` module, so mirror those two plugins from
// apps/web/vite.config.ts — without them those imports fail to resolve.
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx(MDX_OPTIONS) },
    insightsFrontmatterPlugin(),
    react({ include: /\.(jsx?|tsx?|mdx)$/ }),
  ],
  resolve: { tsconfigPaths: true },
  test: {
    setupFiles: ['./src/web/happydom.ts'],
  },
});
