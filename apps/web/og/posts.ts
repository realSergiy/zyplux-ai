import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

export const POSTS_DIR = fileURLToPath(new URL('../content/insights', import.meta.url));

export const parseFrontmatter = (source: string) => {
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  if (!block?.[1]) {
    throw new Error('expected a frontmatter block');
  }
  const meta: unknown = parse(block[1]);
  if (
    typeof meta !== 'object' ||
    meta === null ||
    !('date' in meta) ||
    !('description' in meta) ||
    !('title' in meta) ||
    typeof meta.date !== 'string' ||
    typeof meta.description !== 'string' ||
    typeof meta.title !== 'string'
  ) {
    throw new Error('expected post frontmatter with a date, title, and description');
  }
  return {
    date: meta.date,
    description: meta.description,
    draft: 'draft' in meta && meta.draft === true,
    title: meta.title,
  };
};

export const readInsightsFrontmatter = async () => {
  const fileNames = await readdir(POSTS_DIR);
  const entries = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async fileName => {
        const meta = parseFrontmatter(await readFile(path.join(POSTS_DIR, fileName), 'utf8'));
        return [fileName.replace(/\.mdx$/, ''), meta] as const;
      }),
  );
  return Object.fromEntries(entries);
};

export const readPostCards = async () => {
  const frontmatter = await readInsightsFrontmatter();
  return Object.entries(frontmatter)
    .filter(([, meta]) => !meta.draft)
    .map(([slug, meta]) => ({ ...meta, slug }));
};
