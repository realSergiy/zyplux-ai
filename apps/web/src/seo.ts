import { BRAND_NAME, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, PAGES, SITE_URL, TAGLINE, THEME_COLOR } from './content';

export type MetaTag = { content: string; name?: string; property?: string };
export type Page = (typeof PAGES)[PageKey];
export type PageHead = { tags: MetaTag[]; title: string };
export type PageKey = keyof typeof PAGES;

const ogImageAlt = `${BRAND_NAME} — ${TAGLINE}`;
const ogImageUrl = `${SITE_URL}/og.png`;

export const pageHead = (page: Page) =>
  ({
    tags: [
      { content: page.description, name: 'description' },
      { content: THEME_COLOR, name: 'theme-color' },
      { content: page.title, property: 'og:title' },
      { content: page.description, property: 'og:description' },
      { content: 'website', property: 'og:type' },
      { content: `${SITE_URL}${page.path}`, property: 'og:url' },
      { content: ogImageUrl, property: 'og:image' },
      { content: String(OG_IMAGE_WIDTH), property: 'og:image:width' },
      { content: String(OG_IMAGE_HEIGHT), property: 'og:image:height' },
      { content: ogImageAlt, property: 'og:image:alt' },
      { content: 'summary_large_image', name: 'twitter:card' },
    ],
    title: page.title,
  }) satisfies PageHead;
