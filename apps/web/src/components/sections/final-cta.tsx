import { Reveal } from '@zyplux/ui/components/reveal';
import { Section } from '@zyplux/ui/components/section';
import { heading } from '@zyplux/ui/recipes';

import { AuditForm } from '@/components/forms/audit-form';
import { FINAL_CTA } from '@/content';

export const FinalCta = () => (
  <Section className='max-w-xl text-center' id='audit'>
    <Reveal>
      <h2 className={heading({ class: 'mb-6' })}>
        <span className='text-gradient'>{FINAL_CTA.heading}</span>
      </h2>
      <p className='text-lg text-muted mb-12'>{FINAL_CTA.sub}</p>
    </Reveal>
    <Reveal>
      <AuditForm />
    </Reveal>
  </Section>
);
