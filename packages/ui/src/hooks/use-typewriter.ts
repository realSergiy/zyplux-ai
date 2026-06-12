import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const DEFAULT_TYPE_INTERVAL_MS = 38;

export const useTypewriter = (
  text: string,
  { intervalMs = DEFAULT_TYPE_INTERVAL_MS, play = true }: { intervalMs?: number; play?: boolean } = {},
) => {
  const prefersReducedMotion = useReducedMotion();
  const still = prefersReducedMotion === true;
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (still || !play) {
      return;
    }
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setTyped(count);
      if (count >= text.length) {
        clearInterval(id);
      }
    }, intervalMs);
    return () => {
      clearInterval(id);
    };
  }, [intervalMs, play, still, text.length]);

  const typedCount = still ? text.length : typed;
  return { revealed: typedCount >= text.length, typedText: text.slice(0, typedCount) };
};
