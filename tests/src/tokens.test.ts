import { PALETTE, toRgba } from '@zyplux/ui/tokens';
import { describe, expect, it } from 'bun:test';

describe('PALETTE', () => {
  it('stays in sync with the theme.css tokens', async () => {
    const themeCss = await Bun.file(new URL(import.meta.resolve('@zyplux/ui/theme.css'))).text();
    for (const tokenValue of Object.values(PALETTE)) {
      expect(themeCss).toContain(tokenValue);
    }
  });
});

describe('toRgba', () => {
  it('converts a hex color and alpha to an rgba() string', () => {
    expect(toRgba('#58a6ff', 0.16)).toBe('rgba(88,166,255,0.16)');
  });
});
