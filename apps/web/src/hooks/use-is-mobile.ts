import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { isMobileAtom } from '@/store/atoms';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in globalThis);
    };

    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [setIsMobile]);

  return isMobile;
};
