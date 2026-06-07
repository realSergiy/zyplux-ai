import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { prefersReducedMotionAtom } from '@/store/atoms';

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useAtom(prefersReducedMotionAtom);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setPrefersReducedMotion]);

  return prefersReducedMotion;
};
