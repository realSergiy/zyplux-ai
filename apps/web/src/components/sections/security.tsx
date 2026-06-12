import { Lock, MousePointerClick, Plug, ScrollText, Server, UserCheck } from 'lucide-react';

import { Pictogram } from '@/components/ui/pictogram';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { CardTitle, SpotlightCard } from '@/components/ui/spotlight-card';
import { SECURITY } from '@/content';

const POINT_ICONS = [Plug, MousePointerClick, ScrollText, Lock, Server, UserCheck];

export const Security = () => (
  <Section id='security'>
    <SectionHeading className='mb-6'>{SECURITY.heading}</SectionHeading>

    <Reveal className='mx-auto mb-16 max-w-2xl text-center'>
      <p className='text-lg text-muted'>{SECURITY.intro}</p>
    </Reveal>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-5xl'>
      {SECURITY.points.map((point, index) => {
        const Icon = POINT_ICONS[index];
        return (
          <Reveal delay={index * 0.08} key={point.title}>
            <SpotlightCard>
              {Icon !== undefined && <Pictogram delay={index * 0.08} icon={Icon} />}
              <CardTitle>{point.title}</CardTitle>
              {point.detail !== undefined && <p className='text-muted'>{point.detail}</p>}
            </SpotlightCard>
          </Reveal>
        );
      })}
    </div>
  </Section>
);
