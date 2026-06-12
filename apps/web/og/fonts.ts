import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { type SatoriOptions } from 'satori';

const require = createRequire(import.meta.url);
const interFilesDir = path.join(path.dirname(require.resolve('@fontsource/inter/package.json')), 'files');
const readInterWeight = (weight: number) => readFileSync(path.join(interFilesDir, `inter-latin-${weight}-normal.woff`));

export const fonts: SatoriOptions['fonts'] = [
  { data: readInterWeight(500), name: 'Inter', style: 'normal', weight: 500 },
  { data: readInterWeight(600), name: 'Inter', style: 'normal', weight: 600 },
  { data: readInterWeight(800), name: 'Inter', style: 'normal', weight: 800 },
];
