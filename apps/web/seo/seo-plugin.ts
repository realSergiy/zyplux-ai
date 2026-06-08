import type { HtmlTagDescriptor, Plugin } from 'vite';

import path from 'node:path';

import { PAGES } from '../src/content';
import { pageHead } from '../src/seo';

const injectTo: HtmlTagDescriptor['injectTo'] = 'head';

export const seoPlugin = () =>
  ({
    name: 'zyplux:seo',
    transformIndexHtml: (_html, ctx) => {
      const name = path.basename(ctx.filename, '.html');
      const entry = Object.entries(PAGES).find(([key]) => key === name);
      if (!entry) return [];
      const head = pageHead(entry[1]);
      const tags: HtmlTagDescriptor[] = [
        { children: head.title, injectTo, tag: 'title' },
        ...head.tags.map(meta => ({ attrs: { ...meta }, injectTo, tag: 'meta' })),
      ];
      return tags;
    },
  }) satisfies Plugin;
