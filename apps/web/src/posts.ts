import type { MDXProps } from 'mdx/types';
import type { ComponentType } from 'react';

import { lazy } from 'react';
import insightsFrontmatter from 'virtual:insights-frontmatter';

type PostBody = ComponentType<MDXProps>;

const BODIES = import.meta.glob<{ default: PostBody }>('../content/insights/*.mdx');

const slugFromPath = (path: string) => (path.split('/').at(-1) ?? path).replace(/\.mdx$/, '');

export const INSIGHTS_POSTS = Object.entries(BODIES)
  .map(([path, loadBody]) => {
    const slug = slugFromPath(path);
    const meta = insightsFrontmatter[slug];
    if (!meta) {
      throw new Error(`no insights frontmatter for ${slug}`);
    }
    return { ...meta, body: lazy(loadBody), slug };
  })
  .filter(post => post.draft !== true)
  .toSorted((a, b) => b.date.localeCompare(a.date));

export type InsightsPost = (typeof INSIGHTS_POSTS)[number];
