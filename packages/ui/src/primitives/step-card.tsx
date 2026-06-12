import type { ReactNode } from 'react';

import { CardTitle, SpotlightCard } from './spotlight-card';
import { StepBadge } from './step-badge';

export const StepCard = ({ children, step, title }: { children: ReactNode; step: ReactNode; title: ReactNode }) => (
  <SpotlightCard>
    <StepBadge className='mb-6'>{step}</StepBadge>
    <CardTitle className='mb-3'>{title}</CardTitle>
    <div className='text-muted'>{children}</div>
  </SpotlightCard>
);
