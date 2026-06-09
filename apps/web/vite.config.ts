import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

import { ogImagePlugin } from './og/og-image-plugin';
import { seoPlugin } from './seo/seo-plugin';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        agent: path.resolve(__dirname, 'agent.html'),
        index: path.resolve(__dirname, 'index.html'),
        insights: path.resolve(__dirname, 'insights.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
      },
    },
    target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
  },
  plugins: [react(), cloudflare(), ogImagePlugin(), seoPlugin()],
  resolve: { tsconfigPaths: true },
});
