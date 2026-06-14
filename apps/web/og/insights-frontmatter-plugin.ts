import type { Plugin } from 'vite';

import path from 'node:path';

import { parseFrontmatter, POSTS_DIR, readInsightsFrontmatter } from './posts';

const VIRTUAL_ID = 'virtual:insights-frontmatter';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

const isInsightsPost = (file: string) => file.startsWith(`${POSTS_DIR}/`) && file.endsWith('.mdx');

export const insightsFrontmatterPlugin = (): Plugin => {
  const frontmatterByPost = new Map<string, string>();

  return {
    handleHotUpdate: async ({ file, read, server }) => {
      if (!isInsightsPost(file)) {
        return;
      }
      const previous = frontmatterByPost.get(file);
      let next: string | undefined;
      try {
        next = JSON.stringify(parseFrontmatter(await read()));
      } catch {
        next = undefined;
      }
      if (next === previous) {
        return;
      }
      if (next === undefined) {
        frontmatterByPost.delete(file);
      } else {
        frontmatterByPost.set(file, next);
      }
      for (const environment of Object.values(server.environments)) {
        const virtualModule = environment.moduleGraph.getModuleById(RESOLVED_ID);
        if (virtualModule) {
          environment.moduleGraph.invalidateModule(virtualModule);
        }
      }
      server.ws.send({ type: 'full-reload' });
      return [];
    },
    load: async id => {
      if (id !== RESOLVED_ID) {
        return;
      }
      const frontmatter = await readInsightsFrontmatter();
      for (const [slug, meta] of Object.entries(frontmatter)) {
        frontmatterByPost.set(path.join(POSTS_DIR, `${slug}.mdx`), JSON.stringify(meta));
      }
      return `export default ${JSON.stringify(frontmatter)};`;
    },
    name: 'insights-frontmatter',
    resolveId: id => (id === VIRTUAL_ID ? RESOLVED_ID : undefined),
  };
};
