import { PALETTE, TEXT_GRADIENT, toRgba } from '@zyplux/ui/tokens';
import { describe, expect, it } from 'bun:test';

describe('PALETTE', () => {
  it('stays in sync with the theme.css tokens', async () => {
    const themeCss = await Bun.file(new URL(import.meta.resolve('@zyplux/ui/theme.css'))).text();
    for (const tokenValue of Object.values(PALETTE)) {
      expect(themeCss).toContain(tokenValue);
    }
  });
});

describe('TEXT_GRADIENT', () => {
  it('stays in sync with the text-gradient utility in base.css', async () => {
    const baseCss = await Bun.file(new URL(import.meta.resolve('@zyplux/ui/base.css'))).text();
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
