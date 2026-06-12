import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const POSTS_DIR = fileURLToPath(new URL('../content/insights', import.meta.url));

const parseFrontmatter = (source: string) => {
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  if (!block?.[1]) {
    throw new Error('expected a frontmatter block');
  }
  const meta: unknown = parse(block[1]);
  if (
    typeof meta !== 'object' ||
    meta === null ||
    !('description' in meta) ||
    !('title' in meta) ||
    typeof meta.description !== 'string' ||
    typeof meta.title !== 'string'
  ) {
    throw new Error('expected post frontmatter with a title and a description');
  }
  return {
    description: meta.description,
    draft: 'draft' in meta && meta.draft === true,
    title: meta.title,
  };
};

export const readPostCards = async () => {
  const fileNames = await readdir(POSTS_DIR);
  const cards = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async fileName => ({
        ...parseFrontmatter(await readFile(path.join(POSTS_DIR, fileName), 'utf8')),
        slug: fileName.replace(/\.mdx$/, ''),
      })),
  );
  return cards.filter(card => !card.draft);
};
