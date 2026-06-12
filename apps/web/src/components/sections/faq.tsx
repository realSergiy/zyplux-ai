import { ChevronDown } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { FAQ } from '@/content';

export const Faq = () => (
  <Section className='max-w-3xl' id='faq'>
    <SectionHeading className='mb-16'>{FAQ.heading}</SectionHeading>

    <div className='space-y-4'>
      {FAQ.items.map(item => (
        <Reveal key={item.question}>
          <details className='group rounded-xl border border-border bg-surface transition-colors hover:border-accent/55'>
            <summary className='flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-heading'>
              {item.question}
              <ChevronDown
                aria-hidden
                className='h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180'
              />
            </summary>
            <p className='px-5 pb-5 text-muted'>{item.answer}</p>
          </details>
        </Reveal>
      ))}
    </div>
  </Section>
);
