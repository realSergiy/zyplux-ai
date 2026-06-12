import { Reveal } from '@zyplux/ui/components/reveal';
import { Section, SectionHeading } from '@zyplux/ui/components/section';

import founderPhoto from '@/assets/founder.jpg';
import { FOUNDER } from '@/content';

export const FounderNote = () => (
  <Section className='max-w-3xl'>
    <SectionHeading className='mb-16'>{FOUNDER.heading}</SectionHeading>

    <Reveal className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
      <img
        alt={FOUNDER.photoAlt}
        className='size-40 shrink-0 rounded-full border border-border object-cover'
        height={400}
        src={founderPhoto}
        width={400}
      />
      <div className='space-y-4'>
        {FOUNDER.paragraphs.map(paragraph => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Reveal>
  </Section>
);
