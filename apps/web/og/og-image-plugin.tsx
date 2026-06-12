import type { CSSProperties, ReactNode } from 'react';
import type { Plugin } from 'vite';

import { Resvg } from '@resvg/resvg-js';
import { PALETTE, TEXT_GRADIENT, toRgba } from '@zyplux/ui/tokens';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, postOgImagePath, SITE_URL } from '@zyplux/web/config';
import { BRAND_NAME, BRAND_POSITIONING, TAGLINE } from '@zyplux/web/site';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';

import { fonts } from './fonts';
import { readPostCards } from './posts';

const OG_FILE_NAME = 'og.png';
const SITE_DOMAIN = new URL(SITE_URL).hostname;

const pngDataUri = (svg: string) =>
  `data:image/png;base64,${new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng().toString('base64')}`;

const BOLT_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="${PALETTE.accent}">` +
  '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
const boltDataUri = pngDataUri(BOLT_SVG);

const gridLine = (cellPx: number, opacity: number) =>
  `<pattern id="cell${cellPx}" width="${cellPx}" height="${cellPx}" patternUnits="userSpaceOnUse">` +
  `<path d="M${cellPx} 0H0V${cellPx}" fill="none" stroke="${PALETTE.grid}" stroke-opacity="${opacity}" stroke-width="1"/></pattern>`;
const GRID_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}"><defs>` +
  gridLine(36, 0.14) +
  gridLine(180, 0.2) +
  `<radialGradient id="fade" cx="50%" cy="0%" fx="50%" fy="0%" r="95%">` +
  `<stop offset="25%" stop-color="#fff"/><stop offset="78%" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
  `<mask id="fadeMask"><rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="url(#fade)"/></mask></defs>` +
  `<g mask="url(#fadeMask)"><rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="url(#cell36)"/>` +
  `<rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="url(#cell180)"/></g></svg>`;
const gridDataUri = pngDataUri(GRID_SVG);

const GRADIENT_TEXT = {
  backgroundClip: 'text',
  backgroundImage: TEXT_GRADIENT,
  color: 'transparent',
} satisfies CSSProperties;

const CardShell = ({ children, style }: { children: ReactNode; style: CSSProperties }) => (
  <div
    style={{
      backgroundColor: PALETTE.background,
      backgroundImage:
        `radial-gradient(ellipse 90% 60% at 50% -10%, ${toRgba(PALETTE.accent, 0.16)}, transparent 70%),` +
        `radial-gradient(ellipse 60% 40% at 85% 0%, ${toRgba(PALETTE.violet, 0.12)}, transparent 70%)`,
      display: 'flex',
      fontFamily: 'Inter',
      height: OG_IMAGE_HEIGHT,
      justifyContent: 'center',
      position: 'relative',
      width: OG_IMAGE_WIDTH,
      ...style,
    }}
  >
    <img
      alt=''
      height={OG_IMAGE_HEIGHT}
      src={gridDataUri}
      style={{ inset: 0, position: 'absolute' }}
      width={OG_IMAGE_WIDTH}
    />
    {children}
    <div
      style={{
        bottom: 38,
        color: PALETTE.muted,
        display: 'flex',
        fontSize: 25,
        fontWeight: 500,
        justifyContent: 'center',
        position: 'absolute',
        width: OG_IMAGE_WIDTH,
      }}
    >
      {SITE_DOMAIN}
    </div>
  </div>
);

const brandCard = (
  <CardShell style={{ alignItems: 'center' }}>
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div
        style={{
          alignItems: 'center',
          backgroundColor: toRgba(PALETTE.accent, 0.1),
          border: `1px solid ${toRgba(PALETTE.accent, 0.3)}`,
          borderRadius: 999,
          color: PALETTE.accent,
          display: 'flex',
          fontSize: 23,
          fontWeight: 500,
          marginBottom: 44,
          padding: '12px 26px',
        }}
      >
        {BRAND_POSITIONING}
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: 24, marginBottom: 32 }}>
        <img alt='' height={96} src={boltDataUri} style={{ marginTop: 10 }} width={96} />
        <div style={{ ...GRADIENT_TEXT, fontSize: 148, fontWeight: 800, letterSpacing: '-0.04em', paddingRight: 8 }}>
          {BRAND_NAME}
        </div>
      </div>
      <div style={{ color: PALETTE.heading, fontSize: 46, fontWeight: 600, letterSpacing: '-0.01em' }}>{TAGLINE}</div>
    </div>
  </CardShell>
);

const postCard = (title: string, description: string) => (
  <CardShell style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 80px', position: 'relative' }}>
      <div style={{ alignItems: 'center', display: 'flex', gap: 14, marginBottom: 48 }}>
        <img alt='' height={44} src={boltDataUri} width={44} />
        <div style={{ color: PALETTE.heading, fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em' }}>
          {BRAND_NAME}
        </div>
      </div>
      <div
        style={{
          ...GRADIENT_TEXT,
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: 28,
        }}
      >
        {title}
      </div>
      <div style={{ color: PALETTE.muted, fontSize: 30, fontWeight: 500, lineHeight: 1.4 }}>{description}</div>
    </div>
  </CardShell>
);

const renderCardPng = async (node: ReactNode) => {
  const svg = await satori(node, { fonts, height: OG_IMAGE_HEIGHT, width: OG_IMAGE_WIDTH });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_IMAGE_WIDTH } }).render().asPng();
};

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
    async writeBundle(options) {
      if (!options.dir || this.environment.name !== 'client') return;
      await writeFile(path.join(options.dir, OG_FILE_NAME), await render());
      for (const post of await readPostCards()) {
        const imagePath = path.join(options.dir, postOgImagePath(post.slug));
        await mkdir(path.dirname(imagePath), { recursive: true });
        await writeFile(imagePath, await renderCardPng(postCard(post.title, post.description)));
      }
    },
  } satisfies Plugin;
};

export const renderOgPng = () => renderCardPng(brandCard);
