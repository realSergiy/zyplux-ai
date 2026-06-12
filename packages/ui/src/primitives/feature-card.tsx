import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';
import { REVEAL_STAGGER_S } from '@zyplux/ui/motion';

import { Pictogram } from './pictogram';
import { CardTitle, SpotlightCard } from './spotlight-card';

export const FeatureCard = ({
  children,
  eyebrow,
  footer,
  icon,
  index = 0,
  title,
}: {
  children?: ReactNode;
  eyebrow?: ReactNode;
  footer?: ReactNode;
  icon: LucideIcon | undefined;
  index?: number;
  title: ReactNode;
}) => (
  <SpotlightCard>
    <div className='flex h-full flex-col'>
      {eyebrow}
      {icon !== undefined && <Pictogram delay={index * REVEAL_STAGGER_S} icon={icon} />}
      <CardTitle>{title}</CardTitle>
      {children !== undefined && <div className={cx('text-muted', footer !== undefined && 'mb-6')}>{children}</div>}
      {footer}
    </div>
  </SpotlightCard>
);
