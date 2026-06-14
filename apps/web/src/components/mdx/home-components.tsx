import type { LucideIcon } from 'lucide-react';
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

import { HeroShell, Timeline, TimelineItem } from '@zyplux/ui/blocks';
import { CardGrid, Section, SectionIntro } from '@zyplux/ui/layout';
import { cx } from '@zyplux/ui/lib/style';
import { Entrance, Reveal } from '@zyplux/ui/motion';
import { ButtonLink, Disclosure, FeatureCard, ShowcasePanel, StepCard } from '@zyplux/ui/primitives';
import { avatar, heading, pill, prose } from '@zyplux/ui/recipes';
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
import { Children, cloneElement, isValidElement } from 'react';

import type { AuditFormCopy } from '@/components/forms/audit-form';

import founderPhoto from '@/assets/founder.jpg';
import { AuditForm } from '@/components/forms/audit-form';
import { MiniDashboard } from '@/components/ui/mini-dashboard';
import { SystemMap as SystemMapDiagram } from '@/components/ui/system-map';
import { BRAND_NAME, BRAND_POSITIONING } from '@/site';

import { PROSE_COMPONENTS } from './prose-components';

const ICONS = {
  click: MousePointerClick,
  cpu: Cpu,
  crosshair: Crosshair,
  dashboard: LayoutDashboard,
  lock: Lock,
  log: ScrollText,
  loop: RefreshCw,
  map: Map,
  plug: Plug,
  repeat: Repeat,
  server: Server,
  shield: ShieldCheck,
  smartphone: Smartphone,
  user: UserCheck,
  workflow: Workflow,
} satisfies Record<string, LucideIcon>;

type IconName = keyof typeof ICONS;

const injectChildIndexes = (children: ReactNode, propsAt: (index: number) => object) =>
  Children.map(children, (child, index) =>
    isValidElement<object>(child) ? cloneElement(child, propsAt(index)) : child,
  );

const Hero = ({
  children,
  microcopy,
  primaryCta,
  secondaryCta,
}: {
  children: ReactNode;
  microcopy: string;
  primaryCta: string;
  secondaryCta: string;
}) => (
  <HeroShell>
    <Entrance className={pill({ class: 'px-4 py-2 mb-8', tone: 'accent' })} scale={0.8} y={0}>
      <Sparkles className='h-4 w-4' />
      <span className='font-medium'>{BRAND_POSITIONING}</span>
    </Entrance>

    <Entrance delay={0.3}>
      <h1 className={heading({ class: 'mb-6', scale: 'hero' })}>
        <span className='text-gradient animate-shimmer bg-size-[200%_auto]'>{BRAND_NAME}</span>
      </h1>
    </Entrance>

    <Entrance delay={0.6}>
      <div className='text-lg md:text-xl text-muted mb-12 max-w-3xl mx-auto'>{children}</div>
    </Entrance>

    <Entrance delay={0.9}>
      <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
        <ButtonLink className='flex items-center gap-2' href='#audit'>
          {primaryCta}
          <ArrowRight className='h-5 w-5' />
        </ButtonLink>

        <ButtonLink href='#week' intent='secondary'>
          {secondaryCta}
        </ButtonLink>
      </div>
      <p className='mt-4 text-sm italic text-muted'>{microcopy}</p>
    </Entrance>
  </HeroShell>
);

const Cards = ({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) => (
  <CardGrid className={cx(narrow && 'max-w-4xl', Children.count(children) > 3 && 'md:grid-cols-2 lg:grid-cols-3')}>
    {injectChildIndexes(children, index => ({ index }))}
  </CardGrid>
);

const Card = ({
  children,
  icon,
  index = 0,
  title,
}: {
  children?: ReactNode;
  icon: IconName;
  index?: number;
  title: string;
}) => (
  <FeatureCard icon={ICONS[icon]} index={index} title={title}>
    {children}
  </FeatureCard>
);

const BuildCard = ({
  children,
  customerFacing = false,
  icon,
  index = 0,
  outcome,
  surface,
  title,
}: {
  children: ReactNode;
  customerFacing?: boolean;
  icon: IconName;
  index?: number;
  outcome: string;
  surface: string;
  title: string;
}) => (
  <FeatureCard
    eyebrow={
      <span className={pill({ class: 'mb-5 w-fit text-xs font-medium', tone: customerFacing ? 'violet' : 'accent' })}>
        {surface}
      </span>
    }
    footer={<p className={pill({ class: 'mt-auto rounded-lg py-2', tone: 'success' })}>{outcome}</p>}
    icon={ICONS[icon]}
    index={index}
    title={title}
  >
    {children}
  </FeatureCard>
);

const Steps = ({ children }: { children: ReactNode }) => (
  <CardGrid>{injectChildIndexes(children, index => ({ step: index + 1 }))}</CardGrid>
);

const Step = ({ children, step = 0, title }: { children: ReactNode; step?: number; title: string }) => (
  <StepCard step={step} title={title}>
    {children}
  </StepCard>
);

const Week = ({ children }: { children: ReactNode }) => (
  <Timeline className='mx-auto max-w-2xl'>
    {Children.map(children, (child, index) => (
      <TimelineItem index={index}>{child}</TimelineItem>
    ))}
  </Timeline>
);

const Scene = ({
  children,
  status,
  timestamp,
  title,
}: {
  children: ReactNode;
  status: string;
  timestamp: string;
  title: string;
}) => (
  <>
    <h3 className='text-xl md:text-2xl font-semibold mb-3'>
      <span className='text-accent'>{timestamp}</span>
      <span className='text-heading'> — {title}</span>
    </h3>
    <div className='text-muted mb-4'>{children}</div>
    <p className={pill({ tone: 'success' })}>
      <Check aria-hidden className='h-4 w-4' />
      {status}
    </p>
  </>
);

const Bridge = ({ children }: { children: ReactNode }) => (
  <Reveal className='mx-auto mt-20 max-w-2xl text-center'>
    <div className='text-muted'>{children}</div>
  </Reveal>
);

const Showcase = ({
  caption,
  children,
  growthNote,
  question,
  title,
}: {
  caption: string;
  children: ReactNode;
  growthNote: string;
  question: string;
  title: string;
}) => (
  <Reveal className='mx-auto mt-16 max-w-4xl'>
    <ShowcasePanel demo={<MiniDashboard caption={caption} growthNote={growthNote} question={question} />} title={title}>
      {children}
    </ShowcasePanel>
  </Reveal>
);

const SystemMap = ({ caption }: { caption: string }) => (
  <Reveal className='mb-16'>
    <SystemMapDiagram
      content={{
        badge: BRAND_NAME,
        captionPending: 'by hand',
        captionResolved: 'runs itself',
        figcaption: caption,
        nodes: [{ label: 'Order' }, { label: 'Fulfil' }, { label: 'Invoice', snag: true }, { label: 'Cash' }],
      }}
    />
  </Reveal>
);

const Founder = ({ children, photoAlt }: { children: ReactNode; photoAlt: string }) => (
  <Reveal className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
    <img alt={photoAlt} className={avatar({ class: 'size-40 shrink-0' })} height={400} src={founderPhoto} width={400} />
    <div className={prose({ size: 'base' })}>{children}</div>
  </Reveal>
);

const Faq = ({ children }: { children: ReactNode }) => <div className='space-y-4'>{children}</div>;

const FaqItem = ({ children, question }: { children: ReactNode; question: string }) => (
  <Reveal>
    <Disclosure summary={question}>{children}</Disclosure>
  </Reveal>
);

const Cta = ({ children, href }: { children: ReactNode; href: string }) => (
  <Reveal className='mt-16 text-center'>
    <ButtonLink className='inline-block' href={href}>
      {children}
    </ButtonLink>
  </Reveal>
);

const AuditFormBlock = (copy: AuditFormCopy) => (
  <Reveal>
    <AuditForm {...copy} />
  </Reveal>
);

export const HOME_COMPONENTS = {
  ...PROSE_COMPONENTS,
  AuditForm: AuditFormBlock,
  Bridge,
  BuildCard,
  Card,
  Cards,
  Cta,
  Faq,
  FaqItem,
  Founder,
  Hero,
  Intro: SectionIntro,
  Scene,
  Section,
  Showcase,
  Step,
  Steps,
  SystemMap,
  Week,
} satisfies MDXComponents;

declare global {
  type MDXProvidedComponents = typeof HOME_COMPONENTS;
}
