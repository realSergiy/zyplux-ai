import type { ReactNode } from 'react';

import { DiagramPhaseContext, useDiagramPhases } from './use-diagram-phases';

type DiagramProps = {
  caption: string;
  children: ReactNode;
  resolveDelayMs: number;
  viewBox: string;
};

export const Diagram = ({ caption, children, resolveDelayMs, viewBox }: DiagramProps) => {
  const { ref, ...phases } = useDiagramPhases({ resolveDelayMs });
  return (
    <figure className='mx-auto mt-16 mb-4 max-w-2xl' ref={ref}>
      <svg aria-hidden className='h-auto w-full' role='img' viewBox={viewBox} xmlns='http://www.w3.org/2000/svg'>
        <DiagramPhaseContext value={phases}>{children}</DiagramPhaseContext>
      </svg>
      <figcaption className='mt-2 text-center text-sm text-muted'>{caption}</figcaption>
    </figure>
  );
};
