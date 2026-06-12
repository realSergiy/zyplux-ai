import { Disclosure } from '@zyplux/ui/components/disclosure';
import { Reveal } from '@zyplux/ui/components/reveal';
import { Section, SectionHeading } from '@zyplux/ui/components/section';

import { FAQ } from '@/content';

export const Faq = () => (
  <Section className='max-w-3xl' id='faq'>
    <SectionHeading className='mb-16'>{FAQ.heading}</SectionHeading>

    <div className='space-y-4'>
      {FAQ.items.map(item => (
        <Reveal key={item.question}>
          <Disclosure summary={item.question}>{item.answer}</Disclosure>
        </Reveal>
      ))}
    </div>
  </Section>
);
