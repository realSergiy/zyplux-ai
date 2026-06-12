import type { CompileOptions } from '@mdx-js/mdx';

import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

import { remarkSections } from './remark-sections';

export const MDX_OPTIONS: CompileOptions = {
  remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter, remarkSections],
};
