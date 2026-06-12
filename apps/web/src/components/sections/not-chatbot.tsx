import { Repeat, ShieldCheck, Workflow } from 'lucide-react';

import { Pictogram } from '@/components/ui/pictogram';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { CardTitle, SpotlightCard } from '@/components/ui/spotlight-card';
import { NOT_CHATBOT } from '@/content';

const POINT_ICONS = [Workflow, Repeat, ShieldCheck];

export const NotChatbot = () => (
  <Section>
    <SectionHeading className='mb-12'>{NOT_CHATBOT.heading}</SectionHeading>

    <Reveal className='mx-auto mb-16 max-w-2xl space-y-4 text-lg text-muted'>
      {NOT_CHATBOT.paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </Reveal>

    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-4xl'>
      {NOT_CHATBOT.points.map((point, index) => {
        const Icon = POINT_ICONS[index];
        return (
          <Reveal delay={index * 0.08} key={point.title}>
            <SpotlightCard>
              {Icon !== undefined && <Pictogram delay={index * 0.08} icon={Icon} />}
              <CardTitle>{point.title}</CardTitle>
              <p className='text-muted'>— {point.detail}</p>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </div>
  </Section>
);
