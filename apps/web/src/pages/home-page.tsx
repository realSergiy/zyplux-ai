import { HeroShell } from '@zyplux/ui/blocks/hero-shell';
import { Timeline, TimelineItem } from '@zyplux/ui/blocks/timeline';
import { CardGrid } from '@zyplux/ui/layout/card-grid';
import { GridBackground } from '@zyplux/ui/layout/grid-background';
import { Section } from '@zyplux/ui/layout/section';
import { Entrance } from '@zyplux/ui/motion/entrance';
import { Reveal } from '@zyplux/ui/motion/reveal';
import { ButtonLink } from '@zyplux/ui/primitives/button-link';
import { Disclosure } from '@zyplux/ui/primitives/disclosure';
import { FeatureCard } from '@zyplux/ui/primitives/feature-card';
import { Paragraphs } from '@zyplux/ui/primitives/paragraphs';
import { ShowcasePanel } from '@zyplux/ui/primitives/showcase-panel';
import { StepCard } from '@zyplux/ui/primitives/step-card';
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
    <Entrance className={pill({ class: 'px-4 py-2 mb-8', tone: 'accent' })} scale={0.8} y={0}>
      <Sparkles className='h-4 w-4' />
      <span className='font-medium'>{HERO.badge}</span>
    </Entrance>

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
  <Section heading={METHOD.heading} id='approach' intro={METHOD.paragraphs}>
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
  <Section heading={TIMELINE.intro} id='week'>
    <Timeline className='mx-auto max-w-2xl'>
      {TIMELINE.scenes.map((scene, index) => (
        <TimelineItem index={index} key={scene.timestamp}>
          <h3 className='text-xl md:text-2xl font-semibold mb-3'>
            <span className='text-accent'>{scene.timestamp}</span>
            <span className='text-heading'> — {scene.title}</span>
          </h3>
          <p className='text-muted mb-4'>{scene.body}</p>
          <p className={pill({ tone: 'success' })}>
            <Check aria-hidden className='h-4 w-4' />
            {scene.status}
          </p>
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
  <Section heading={BUILD.heading} id='build' intro={BUILD.intro} introCentered>
    <CardGrid>
      {BUILD.buckets.map((bucket, index) => (
        <FeatureCard
          eyebrow={
            <span
              className={pill({
                class: 'mb-5 w-fit text-xs font-medium',
                tone: bucket.customerFacing === true ? 'violet' : 'accent',
              })}
            >
              {bucket.surface}
            </span>
          }
          footer={<p className={pill({ class: 'mt-auto rounded-lg py-2', tone: 'success' })}>{bucket.outcome}</p>}
          icon={BUILD_ICONS[index]}
          index={index}
          key={bucket.title}
          title={bucket.title}
        >
          {bucket.detail}
        </FeatureCard>
      ))}
    </CardGrid>

    <Reveal className='mx-auto mt-16 max-w-4xl'>
      <ShowcasePanel demo={<MiniDashboard {...MINI_DASHBOARD} />} title={BUILD.showcase.title}>
        {BUILD.showcase.body}
      </ShowcasePanel>
    </Reveal>
  </Section>
);

const NOT_CHATBOT_ICONS = [Workflow, Repeat, ShieldCheck];

const NotChatbot = () => (
  <Section heading={NOT_CHATBOT.heading} intro={NOT_CHATBOT.paragraphs}>
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
  <Section heading={PROCESS.heading} id='how-it-works'>
    <CardGrid>
      {PROCESS.steps.map((step, index) => (
        <StepCard key={step.title} step={index + 1} title={step.title}>
          {step.body}
        </StepCard>
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
  <Section className='max-w-3xl' heading={FOUNDER.heading}>
    <Reveal className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
      <img
        alt={FOUNDER.photoAlt}
        className={avatar({ class: 'size-40 shrink-0' })}
        height={400}
        src={founderPhoto}
        width={400}
      />
      <div className={prose({ size: 'base' })}>
        <Paragraphs>{FOUNDER.paragraphs}</Paragraphs>
      </div>
    </Reveal>
  </Section>
);

const SECURITY_ICONS = [Plug, MousePointerClick, ScrollText, Lock, Server, UserCheck];

const Security = () => (
  <Section heading={SECURITY.heading} id='security' intro={SECURITY.intro} introCentered>
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
  <Section className='max-w-3xl' heading={FAQ.heading} id='faq'>
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
  <Section className='max-w-xl text-center' heading={FINAL_CTA.heading} id='audit' intro={FINAL_CTA.sub}>
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
