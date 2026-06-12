import { useInView, useReducedMotion } from 'motion/react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

export type DiagramPhases = { drawn: boolean; resolved: boolean; still: boolean };

export const DiagramPhaseContext = createContext<DiagramPhases | undefined>(undefined);

export const useDiagramPhase = () => {
  const phases = useContext(DiagramPhaseContext);
  if (!phases) {
    throw new Error('useDiagramPhase must be used inside a <Diagram>');
  }
  return phases;
};

export const useDiagramPhases = ({ resolveDelayMs }: { resolveDelayMs: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-80px', once: true });
  const prefersReducedMotion = useReducedMotion();
  const still = prefersReducedMotion === true;
  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    if (still || !isInView) {
      return;
    }
    const timer = setTimeout(() => {
      setDelayDone(true);
    }, resolveDelayMs);
    return () => {
      clearTimeout(timer);
    };
  }, [isInView, resolveDelayMs, still]);

  return {
    drawn: still || isInView,
    ref,
    resolved: still || delayDone,
    still,
  };
};
