import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { isScrollingAtom } from '@/store/atoms';

export const useIsScrolling = () => {
  const [isScrolling, setIsScrolling] = useAtom(isScrollingAtom);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = globalThis.setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [setIsScrolling]);

  return isScrolling;
};
