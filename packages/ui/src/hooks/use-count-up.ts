import { animate, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

export const useCountUp = (
  target: number,
  { duration = 0.9, play = true }: { duration?: number; play?: boolean } = {},
) => {
  const prefersReducedMotion = useReducedMotion();
  const still = prefersReducedMotion === true;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (still || !play) {
      return;
    }
    const controls = animate(0, target, {
      duration,
      onUpdate: value => {
        setCount(Math.round(value));
      },
    });
    return () => {
      controls.stop();
    };
  }, [duration, play, still, target]);

  return still ? target : count;
};
