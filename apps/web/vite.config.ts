import { cloudflare } from '@cloudflare/vite-plugin';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { MDX_OPTIONS } from '@zyplux/mdx';
import { defineConfig } from 'vite';

import { ogImagePlugin } from './og/og-image-plugin';
import { SITE_URL } from './src/config';

// The cloudflare plugin's dev-mode worker proxy hangs under bun (its `ws` client
// relies on Node events bun does not implement), so it runs only at build time.
// tanstackStart detects the cloudflare plugin from the user config object, so the
// config must stay an object literal (the function form breaks that detection).
const isBuild = process.argv.includes('build');

export default defineConfig({
  build: {
    target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
  },
  plugins: [
    { enforce: 'pre', ...mdx(MDX_OPTIONS) },
    tailwindcss(),
    ...(isBuild ? [cloudflare({ viteEnvironment: { name: 'ssr' } })] : []),
    tanstackStart({
      prerender: { crawlLinks: true, enabled: true, failOnError: true },
      sitemap: { host: SITE_URL },
    }),
    react({ include: /\.(jsx?|tsx?|mdx)$/ }),
    ogImagePlugin(),
  ],
  resolve: { tsconfigPaths: true },
});
