import { cn } from '@zyplux/ui/lib/utils';
import { describe, expect, it } from 'bun:test';

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('p-2', 'text-sm')).toBe('p-2 text-sm');
  });

  it('keeps the last conflicting tailwind class', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('drops falsy values', () => {
    expect(cn('block', undefined, false)).toBe('block');
  });
});
