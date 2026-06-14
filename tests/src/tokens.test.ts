import { PALETTE, TEXT_GRADIENT, toRgba } from '@zyplux/ui/tokens';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const STYLES_DIR = new URL('../../packages/ui/src/styles/', import.meta.url);

const readCss = (file: string) => readFile(fileURLToPath(new URL(file, STYLES_DIR)), 'utf8');

describe('PALETTE', () => {
  it('stays in sync with the theme.css tokens', async () => {
    const themeCss = await readCss('theme.css');
    for (const tokenValue of Object.values(PALETTE)) {
      expect(themeCss).toContain(tokenValue);
    }
  });
});

describe('TEXT_GRADIENT', () => {
  it('stays in sync with the text-gradient utility in base.css', async () => {
    const baseCss = await readCss('base.css');
    let cssVarGradient = TEXT_GRADIENT;
    for (const [tokenName, hex] of Object.entries(PALETTE)) {
      cssVarGradient = cssVarGradient.replaceAll(hex, `var(--color-${tokenName})`);
    }
    expect(baseCss).toContain(cssVarGradient);
  });
});

describe('toRgba', () => {
  it('converts a hex color and alpha to an rgba() string', () => {
    expect(toRgba('#58a6ff', 0.16)).toBe('rgba(88,166,255,0.16)');
  });
});
