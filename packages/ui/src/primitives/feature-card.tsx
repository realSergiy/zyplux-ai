import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { REVEAL_STAGGER_S } from '@zyplux/ui/motion/reveal';

import { Pictogram } from './pictogram';
import { CardTitle, SpotlightCard } from './spotlight-card';

export const FeatureCard = ({
  children,
  icon,
  index = 0,
  title,
}: {
  children?: ReactNode;
  icon: LucideIcon | undefined;
  index?: number;
  title: ReactNode;
}) => (
  <SpotlightCard>
    {icon !== undefined && <Pictogram delay={index * REVEAL_STAGGER_S} icon={icon} />}
    <CardTitle>{title}</CardTitle>
    {children !== undefined && <p className='text-muted'>{children}</p>}
  </SpotlightCard>
);
