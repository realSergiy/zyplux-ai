import { cva, cx } from '@zyplux/ui/lib/style';
import { describe, expect, it } from 'bun:test';

describe('cx', () => {
  it('joins class names', () => {
    expect(cx('p-2', 'text-sm')).toBe('p-2 text-sm');
  });

  it('keeps the last conflicting tailwind class', () => {
    expect(cx('p-2', 'p-4')).toBe('p-4');
  });

  it('drops falsy values', () => {
    expect(cx('block', undefined, false)).toBe('block');
  });
});

describe('cva', () => {
  const button = cva({
    base: 'rounded font-semibold',
    defaultVariants: { intent: 'primary' },
    variants: { intent: { primary: 'bg-accent', secondary: 'border' } },
  });

  it('applies the default variant', () => {
    expect(button()).toBe('rounded font-semibold bg-accent');
  });

  it('applies the requested variant', () => {
    expect(button({ intent: 'secondary' })).toBe('rounded font-semibold border');
  });

  it('resolves caller class conflicts through tailwind-merge', () => {
    expect(button({ class: 'rounded-xl' })).toBe('font-semibold bg-accent rounded-xl');
  });
});
