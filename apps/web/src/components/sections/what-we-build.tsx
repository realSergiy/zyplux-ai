import { LayoutDashboard, RefreshCw, Smartphone } from 'lucide-react';

import { MiniDashboard } from '@/components/ui/mini-dashboard';
import { Pictogram } from '@/components/ui/pictogram';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { CardTitle, SpotlightCard } from '@/components/ui/spotlight-card';
import { BUILD, MINI_DASHBOARD } from '@/content';
import { pill } from '@/styles';

const BUCKET_ICONS = [RefreshCw, LayoutDashboard, Smartphone];

export const WhatWeBuild = () => (
  <Section id='build'>
    <SectionHeading className='mb-6'>{BUILD.heading}</SectionHeading>

    <Reveal className='mx-auto mb-16 max-w-2xl text-center'>
      <p className='text-lg text-muted'>{BUILD.intro}</p>
    </Reveal>

    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl items-stretch'>
      {BUILD.buckets.map((bucket, index) => {
        const Icon = BUCKET_ICONS[index];
        const isEdge = bucket.surface.startsWith('At the edge');
        return (
          <Reveal delay={index * 0.08} key={bucket.title}>
            <SpotlightCard>
              <div className='flex h-full flex-col'>
                <span className={pill({ class: 'mb-5 w-fit text-xs font-medium', tone: isEdge ? 'violet' : 'accent' })}>
                  {bucket.surface}
                </span>
                {Icon !== undefined && <Pictogram delay={index * 0.08} icon={Icon} />}
                <CardTitle>{bucket.title}</CardTitle>
                <p className='text-muted mb-6'>{bucket.detail}</p>
                <p className={pill({ class: 'mt-auto rounded-lg py-2', tone: 'success' })}>{bucket.outcome}</p>
              </div>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </div>

    <Reveal className='mx-auto mt-16 max-w-4xl'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-2xl border border-border bg-surface/40 p-8'>
        <div>
          <CardTitle className='text-2xl mb-3'>Ask a question, get a view.</CardTitle>
          <p className='text-muted'>
            No ticket, no waiting on the data team. Type what you want to know in plain language and a dashboard is
            assembled from your own data while you watch — a scenario of what &ldquo;light up the system&rdquo; looks
            like.
          </p>
        </div>
        <MiniDashboard question={MINI_DASHBOARD.question} />
      </div>
    </Reveal>
  </Section>
);
