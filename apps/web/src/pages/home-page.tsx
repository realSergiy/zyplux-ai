import { HeroShell } from '@zyplux/ui/blocks/hero-shell';
import { Timeline, TimelineItem } from '@zyplux/ui/blocks/timeline';
import { CardGrid } from '@zyplux/ui/layout/card-grid';
import { GridBackground } from '@zyplux/ui/layout/grid-background';
import { Section, SectionHeading, SectionIntro } from '@zyplux/ui/layout/section';
import { Entrance } from '@zyplux/ui/motion/entrance';
import { Reveal, REVEAL_STAGGER_S } from '@zyplux/ui/motion/reveal';
import { ButtonLink } from '@zyplux/ui/primitives/button-link';
import { Disclosure } from '@zyplux/ui/primitives/disclosure';
import { FeatureCard } from '@zyplux/ui/primitives/feature-card';
import { Pictogram } from '@zyplux/ui/primitives/pictogram';
import { CardTitle, SpotlightCard } from '@zyplux/ui/primitives/spotlight-card';
import { StepBadge } from '@zyplux/ui/primitives/step-badge';
import { avatar, heading, inlineLink, pill, prose } from '@zyplux/ui/recipes';
import {
  ArrowRight,
  Check,
  Cpu,
  Crosshair,
  LayoutDashboard,
  Lock,
  Map,
  MousePointerClick,
  Plug,
  RefreshCw,
  Repeat,
  ScrollText,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  Workflow,
} from 'lucide-react';
import * as m from 'motion/react-m';

import founderPhoto from '@/assets/founder.jpg';
import { AuditForm } from '@/components/forms/audit-form';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { MiniDashboard } from '@/components/ui/mini-dashboard';
import { SystemMap } from '@/components/ui/system-map';
import {
  BRAND_NAME,
  BUILD,
  FAQ,
  FINAL_CTA,
  FOUNDER,
  HERO,
  METHOD,
  MINI_DASHBOARD,
  NOT_CHATBOT,
  PROCESS,
  SECURITY,
  SKIP_LINK_LABEL,
  TIMELINE,
} from '@/content';

const Hero = () => (
  <HeroShell>
    <m.div
      animate={{ opacity: 1, scale: 1 }}
      className={pill({ class: 'px-4 py-2 mb-8', tone: 'accent' })}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <Sparkles className='h-4 w-4 text-accent' />
      <span className='text-sm font-medium text-accent'>{HERO.badge}</span>
    </m.div>

    <Entrance delay={0.3}>
      <h1 className={heading({ class: 'mb-6', scale: 'hero' })}>
        <span className='text-gradient animate-shimmer bg-size-[200%_auto]'>{BRAND_NAME}</span>
      </h1>
    </Entrance>

    <Entrance delay={0.4}>
      <p className='text-lg md:text-xl text-muted mb-12 max-w-3xl mx-auto'>{HERO.subhead}</p>
    </Entrance>

    <Entrance delay={0.5}>
      <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
        <ButtonLink className='flex items-center gap-2' href='#audit'>
          {HERO.primaryCta}
          <ArrowRight className='h-5 w-5' />
        </ButtonLink>

        <ButtonLink href='#week' intent='secondary'>
          {HERO.secondaryCta}
        </ButtonLink>
      </div>
      <p className='mt-4 text-sm italic text-muted'>{HERO.microcopy}</p>
    </Entrance>
  </HeroShell>
);

const METHOD_ICONS = [Map, Crosshair, Cpu];

const Method = () => (
  <Section id='approach'>
    <SectionHeading className='mb-10'>{METHOD.heading}</SectionHeading>

    <SectionIntro>
      {METHOD.paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </SectionIntro>

    <Reveal>
      <SystemMap content={METHOD.diagram} />
    </Reveal>

    <CardGrid className='mt-16'>
      {METHOD.beats.map((beat, index) => (
        <FeatureCard icon={METHOD_ICONS[index]} index={index} key={beat.title} title={beat.title}>
          {beat.detail}
        </FeatureCard>
      ))}
    </CardGrid>
  </Section>
);

const VignetteTimeline = () => (
  <Section id='week'>
    <SectionHeading className='mb-20'>{TIMELINE.intro}</SectionHeading>

    <Timeline className='mx-auto max-w-2xl'>
      {TIMELINE.scenes.map((scene, index) => (
        <TimelineItem key={scene.timestamp}>
          <Reveal delay={index * REVEAL_STAGGER_S}>
            <h3 className='text-xl md:text-2xl font-semibold mb-3'>
              <span className='text-accent'>{scene.timestamp}</span>
              <span className='text-heading'> — {scene.title}</span>
            </h3>
            <p className='text-muted mb-4'>{scene.body}</p>
            <p className={pill({ tone: 'success' })}>
              <Check aria-hidden className='h-4 w-4' />
              {scene.status}
            </p>
          </Reveal>
        </TimelineItem>
      ))}
    </Timeline>

    <Reveal className='mx-auto mt-20 max-w-2xl text-center'>
      <p className='text-muted'>
        {TIMELINE.bridgeStart}{' '}
        <a className={inlineLink()} href='#audit'>
          {TIMELINE.bridgeLink}
        </a>
        {TIMELINE.bridgeEnd}
      </p>
    </Reveal>
  </Section>
);

const BUILD_ICONS = [RefreshCw, LayoutDashboard, Smartphone];

const WhatWeBuild = () => (
  <Section id='build'>
    <SectionHeading className='mb-6'>{BUILD.heading}</SectionHeading>

    <SectionIntro centered className='mb-16'>
      <p>{BUILD.intro}</p>
    </SectionIntro>

    <CardGrid>
      {BUILD.buckets.map((bucket, index) => {
        const Icon = BUILD_ICONS[index];
        const isEdge = bucket.surface.startsWith('At the edge');
        return (
          <SpotlightCard key={bucket.title}>
            <div className='flex h-full flex-col'>
              <span className={pill({ class: 'mb-5 w-fit text-xs font-medium', tone: isEdge ? 'violet' : 'accent' })}>
                {bucket.surface}
              </span>
              {Icon !== undefined && <Pictogram delay={index * REVEAL_STAGGER_S} icon={Icon} />}
              <CardTitle>{bucket.title}</CardTitle>
              <p className='text-muted mb-6'>{bucket.detail}</p>
              <p className={pill({ class: 'mt-auto rounded-lg py-2', tone: 'success' })}>{bucket.outcome}</p>
            </div>
          </SpotlightCard>
        );
      })}
    </CardGrid>

    <Reveal className='mx-auto mt-16 max-w-4xl'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-2xl border border-border bg-surface/40 p-8'>
        <div>
          <CardTitle className='text-2xl mb-3'>{BUILD.showcase.title}</CardTitle>
          <p className='text-muted'>{BUILD.showcase.body}</p>
        </div>
        <MiniDashboard {...MINI_DASHBOARD} />
      </div>
    </Reveal>
  </Section>
);

const NOT_CHATBOT_ICONS = [Workflow, Repeat, ShieldCheck];

const NotChatbot = () => (
  <Section>
    <SectionHeading className='mb-12'>{NOT_CHATBOT.heading}</SectionHeading>

    <SectionIntro className='mb-16'>
      {NOT_CHATBOT.paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </SectionIntro>

    <CardGrid className='max-w-4xl'>
      {NOT_CHATBOT.points.map((point, index) => (
        <FeatureCard icon={NOT_CHATBOT_ICONS[index]} index={index} key={point.title} title={point.title}>
          — {point.detail}
        </FeatureCard>
      ))}
    </CardGrid>
  </Section>
);

const ProcessLadder = () => (
  <Section id='how-it-works'>
    <SectionHeading className='mb-16'>{PROCESS.heading}</SectionHeading>

    <CardGrid>
      {PROCESS.steps.map((step, index) => (
        <SpotlightCard key={step.title}>
          <StepBadge className='mb-6'>{index + 1}</StepBadge>
          <CardTitle className='mb-3'>{step.title}</CardTitle>
          <p className='text-muted'>{step.body}</p>
        </SpotlightCard>
      ))}
    </CardGrid>

    <Reveal className='mt-16 text-center'>
      <ButtonLink className='inline-block' href='#audit'>
        {PROCESS.cta}
      </ButtonLink>
    </Reveal>
  </Section>
);

const FounderNote = () => (
  <Section className='max-w-3xl'>
    <SectionHeading className='mb-16'>{FOUNDER.heading}</SectionHeading>

    <Reveal className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
      <img
        alt={FOUNDER.photoAlt}
        className={avatar({ class: 'size-40 shrink-0' })}
        height={400}
        src={founderPhoto}
        width={400}
      />
      <div className={prose({ size: 'base' })}>
        {FOUNDER.paragraphs.map(paragraph => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Reveal>
  </Section>
);

const SECURITY_ICONS = [Plug, MousePointerClick, ScrollText, Lock, Server, UserCheck];

const Security = () => (
  <Section id='security'>
    <SectionHeading className='mb-6'>{SECURITY.heading}</SectionHeading>

    <SectionIntro centered className='mb-16'>
      <p>{SECURITY.intro}</p>
    </SectionIntro>

    <CardGrid className='md:grid-cols-2 lg:grid-cols-3'>
      {SECURITY.points.map((point, index) => (
        <FeatureCard icon={SECURITY_ICONS[index]} index={index} key={point.title} title={point.title}>
          {point.detail}
        </FeatureCard>
      ))}
    </CardGrid>
  </Section>
);

const Faq = () => (
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

const FinalCta = () => (
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

export const HomePage = () => (
  <div className='min-h-screen overflow-x-hidden'>
    <a className='skip-link' href='#main-content'>
      {SKIP_LINK_LABEL}
    </a>
    <GridBackground />
    <Navigation />
    <main id='main-content'>
      <Hero />
      <Method />
      <VignetteTimeline />
      <WhatWeBuild />
      <NotChatbot />
      <ProcessLadder />
      <FounderNote />
      <Security />
      <Faq />
      <FinalCta />
    </main>
    <Footer />
  </div>
);
