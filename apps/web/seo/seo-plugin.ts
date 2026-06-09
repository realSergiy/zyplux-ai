import type { HtmlTagDescriptor, Plugin } from 'vite';

import { PAGES } from '@zyplux/web/content';
import { pageHead } from '@zyplux/web/seo';
import path from 'node:path';

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
