import type { MDXProps } from 'mdx/types';
import type { ComponentType } from 'react';

import { lazy } from 'react';

type PostBody = ComponentType<MDXProps>;

type PostFrontmatter = {
  date: string;
  description: string;
  draft?: boolean;
  title: string;
};

const FRONTMATTER = import.meta.glob<PostFrontmatter>('../content/insights/*.mdx', {
  eager: true,
  import: 'frontmatter',
});

const BODIES = import.meta.glob<{ default: PostBody }>('../content/insights/*.mdx');

const slugFromPath = (path: string) => (path.split('/').at(-1) ?? path).replace(/\.mdx$/, '');

const lazyBodyAt = (path: string) => {
  const loadBody = BODIES[path];
  if (!loadBody) {
    throw new Error(`no insights module at ${path}`);
  }
  return lazy(loadBody);
};

export const INSIGHTS_POSTS = Object.entries(FRONTMATTER)
  .filter(([, meta]) => meta.draft !== true)
  .map(([path, meta]) => ({ ...meta, body: lazyBodyAt(path), slug: slugFromPath(path) }))
  .toSorted((a, b) => b.date.localeCompare(a.date));

export type InsightsPost = (typeof INSIGHTS_POSTS)[number];
