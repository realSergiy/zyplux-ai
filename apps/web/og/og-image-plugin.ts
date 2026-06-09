import type { Plugin } from 'vite';

import { Resvg } from '@resvg/resvg-js';
import { BRAND_NAME, HERO, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_DOMAIN, TAGLINE } from '@zyplux/web/content';
import { readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { createElement, type ReactNode } from 'react';
import satori, { type SatoriOptions } from 'satori';

const OG_WIDTH = OG_IMAGE_WIDTH;
const OG_HEIGHT = OG_IMAGE_HEIGHT;
const OG_FILE_NAME = 'og.png';

const require = createRequire(import.meta.url);
const interFilesDir = path.join(path.dirname(require.resolve('@fontsource/inter/package.json')), 'files');
const readInterWeight = (weight: number) => readFileSync(path.join(interFilesDir, `inter-latin-${weight}-normal.woff`));

const fonts: SatoriOptions['fonts'] = [
  { data: readInterWeight(500), name: 'Inter', style: 'normal', weight: 500 },
  { data: readInterWeight(600), name: 'Inter', style: 'normal', weight: 600 },
  { data: readInterWeight(800), name: 'Inter', style: 'normal', weight: 800 },
];

const pngDataUri = (svg: string) =>
  `data:image/png;base64,${new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng().toString('base64')}`;

const BOLT_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="#58a6ff">' +
  '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
const boltDataUri = pngDataUri(BOLT_SVG);

const gridLine = (cellPx: number, opacity: number) =>
  `<pattern id="cell${cellPx}" width="${cellPx}" height="${cellPx}" patternUnits="userSpaceOnUse">` +
  `<path d="M${cellPx} 0H0V${cellPx}" fill="none" stroke="#6e7681" stroke-opacity="${opacity}" stroke-width="1"/></pattern>`;
const GRID_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}"><defs>` +
  gridLine(36, 0.14) +
  gridLine(180, 0.2) +
  `<radialGradient id="fade" cx="50%" cy="0%" fx="50%" fy="0%" r="95%">` +
  `<stop offset="25%" stop-color="#fff"/><stop offset="78%" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
  `<mask id="fadeMask"><rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#fade)"/></mask></defs>` +
  `<g mask="url(#fadeMask)"><rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#cell36)"/>` +
  `<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#cell180)"/></g></svg>`;
const gridDataUri = pngDataUri(GRID_SVG);

type ElementProps = Record<string, unknown> & { children?: ReactNode; style?: Style };
type Style = Record<string, number | string>;
const el = (type: string, props: ElementProps) => createElement(type, props);

const card = el('div', {
  children: [
    el('img', { height: OG_HEIGHT, src: gridDataUri, style: { inset: 0, position: 'absolute' }, width: OG_WIDTH }),
    el('div', {
      children: [
        el('div', {
          children: HERO.badge,
          style: {
            alignItems: 'center',
            backgroundColor: 'rgba(88,166,255,0.1)',
            border: '1px solid rgba(88,166,255,0.3)',
            borderRadius: 999,
            color: '#58a6ff',
            display: 'flex',
            fontSize: 23,
            fontWeight: 500,
            marginBottom: 44,
            padding: '12px 26px',
          },
        }),
        el('div', {
          children: [
            el('img', { height: 96, src: boltDataUri, style: { marginTop: 10 }, width: 96 }),
            el('div', {
              children: BRAND_NAME,
              style: {
                backgroundClip: 'text',
                backgroundImage: 'linear-gradient(120deg, #f0f6fc 25%, #58a6ff 65%, #bc8cff 95%)',
                color: 'transparent',
                fontSize: 148,
                fontWeight: 800,
                letterSpacing: '-0.04em',
                paddingRight: 8,
              },
            }),
          ],
          style: { alignItems: 'center', display: 'flex', gap: 24, marginBottom: 32 },
        }),
        el('div', {
          children: TAGLINE,
          style: { color: '#f0f6fc', fontSize: 46, fontWeight: 600, letterSpacing: '-0.01em' },
        }),
      ],
      style: { alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' },
    }),
    el('div', {
      children: SITE_DOMAIN,
      style: {
        bottom: 38,
        color: '#8b949e',
        display: 'flex',
        fontSize: 25,
        fontWeight: 500,
        justifyContent: 'center',
        position: 'absolute',
        width: OG_WIDTH,
      },
    }),
  ],
  style: {
    alignItems: 'center',
    backgroundColor: '#0d1117',
    backgroundImage:
      'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(88,166,255,0.16), transparent 70%),' +
      'radial-gradient(ellipse 60% 40% at 85% 0%, rgba(188,140,255,0.12), transparent 70%)',
    display: 'flex',
    fontFamily: 'Inter',
    height: OG_HEIGHT,
    justifyContent: 'center',
    position: 'relative',
    width: OG_WIDTH,
  },
});

export const ogImagePlugin = () => {
  let cached: Buffer | undefined;
  const render = async () => (cached ??= await renderOgPng());

  return {
    configureServer: server => {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== `/${OG_FILE_NAME}`) {
          next();
          return;
        }
        render()
          .then(png => {
            res.setHeader('Content-Type', 'image/png');
            res.end(png);
          })
          .catch(next);
      });
    },
    name: 'zyplux:og-image',
    writeBundle: async (options, bundle) => {
      if (!options.dir || !('index.html' in bundle)) return;
      await writeFile(path.join(options.dir, OG_FILE_NAME), await render());
    },
  } satisfies Plugin;
};

export const renderOgPng = async () => {
  const svg = await satori(card, {
    fonts,
    height: OG_HEIGHT,
    width: OG_WIDTH,
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
};
