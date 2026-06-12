import { useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

export const useScrolledPast = (thresholdPx: number) => {
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', latest => {
    setHasScrolledPast(latest > thresholdPx);
  });

  return hasScrolledPast;
};
