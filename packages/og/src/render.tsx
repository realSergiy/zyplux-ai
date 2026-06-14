import type { ReactNode } from 'react';
import type { SatoriOptions } from 'satori';

import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

import { INTER_FONTS } from './fonts';

export const pngDataUri = (svg: string) =>
  `data:image/png;base64,${new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng().toString('base64')}`;

export const renderCardPng = async (
  node: ReactNode,
  { fonts = INTER_FONTS, height, width }: { fonts?: SatoriOptions['fonts']; height: number; width: number },
) => {
  const svg = await satori(node, { fonts, height, width });
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
};
