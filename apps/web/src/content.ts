export const BRAND_NAME = 'Zyplux';
export const TAGLINE = 'Neural Intelligence Systems';
export const SITE_DOMAIN = 'zyplux.ai';
export const SITE_URL = 'https://zyplux.ai';
export const THEME_COLOR = '#0d1117';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const CONTACT_EMAIL = 'hello@zyplux.ai';
export const SKIP_LINK_LABEL = 'Skip to main content';

export const PAGES = {
  agent: {
    description:
      'This page will show Zyplux at work — a real session, not a video. Leave your email and you’ll be the first to see it.',
    path: '/agent',
    title: `${BRAND_NAME} — See the agent`,
  },
  index: {
    description:
      'We connect a private AI agent to the systems your business already runs on and give it real jobs — the repetitive, multi-step work that eats your team’s week.',
    path: '/',
    title: `${BRAND_NAME} — ${TAGLINE}`,
  },
  insights: {
    description: 'Short, honest reads on what AI agents can and can’t do for a business. No jargon, no hype.',
    path: '/insights',
    title: `${BRAND_NAME} — Insights`,
  },
  privacy: {
    description: 'How zyplux.ai handles what you type into our forms — what we collect, why, and where it goes.',
    path: '/privacy',
    title: `${BRAND_NAME} — Privacy`,
  },
};

export const FORM_ENDPOINT = 'https://example.com/REPLACE-WITH-FORM-ENDPOINT';

export type FormName = 'agent-updates' | 'audit' | 'insights-updates';

export const FORM_MESSAGES = {
  auditSuccess: 'Thanks — your request is in. The audit lands in your inbox within days.',
  captureSuccess: 'Thanks — you’re on the list.',
  errorPrefix: 'Something went wrong — email us instead at ',
  sending: 'Sending…',
};

export const NAV = {
  agentLink: 'See the agent',
  backHome: 'Back home',
  cta: 'Get your free audit',
  links: [
    { href: '#how-it-works', label: 'How it works' },
    { href: '#security', label: 'Security' },
    { href: '#faq', label: 'FAQ' },
  ],
};

export const HERO = {
  badge: 'Bespoke AI agents for smart businesses',
  microcopy: 'No call required. Yours to keep.',
  primaryCta: 'Get your free workflow audit',
  secondaryCta: 'See how it works ↓',
  subhead:
    'We integrate a private AI agent to the systems your business already runs on — email, spreadsheets, databases — and give it real jobs: the repetitive, multi-step work that eats your team’s week. It works around the clock. Nothing goes out without your approval.',
};

export const TIMELINE = {
  bridgeEnd: ' shows you which ones are hiding in your business.',
  bridgeLink: 'The free audit',
  bridgeStart: 'These are scenarios — drawn from the workflows we automate.',
  intro: 'What a week with Zyplux looks like.',
  scenes: [
    {
      body: 'Zyplux reads it, finds the matching purchase order in your system, spots that the total is $312 over, and queues it for your bookkeeper with the discrepancy highlighted. She’ll see it at 9:00 — already checked.',
      status: 'Filed, matched, flagged — before anyone was awake.',
      timestamp: 'Monday, 2:14 AM',
      title: 'a supplier emails an invoice.',
    },
    {
      body: 'Sales, deliveries, complaints, cash — pulled from your own systems, summarized in plain language, in your inbox before your first coffee. The same report that used to cost someone their Monday morning.',
      status: 'Done. Every Monday. Without fail.',
      timestamp: 'Monday, 7:30 AM',
      title: 'the weekly report wrote itself.',
    },
    {
      body: 'A customer emails. Zyplux finds their order in your database and drafts a reply with the delivery date and tracking link. Your support person reads it and clicks Approve. Sixty seconds — not an afternoon of digging.',
      status: 'Answered fast. Approved by a human.',
      timestamp: 'Tuesday, 9:05 AM',
      title: '"Where is my order?"',
    },
    {
      body: '"Should we take on the second warehouse?" Overnight, Zyplux read your numbers, pulled the market data, and wrote you a two-page brief — with the trade-offs, not just charts.',
      status: 'A decision-ready brief, not a data dump.',
      timestamp: 'Friday, 8 AM',
      title: 'a question worth real money.',
    },
  ],
};

export const NOT_CHATBOT = {
  heading: 'This is not a chatbot',
  paragraphs: [
    'You’ve met chatbots. They wait for questions and sometimes get the answers wrong.',
    'An agent is different: it acts. It reads what arrives, checks it against your systems, does the multi-step work, and files the result. You describe the job once — it runs the job every time.',
    'And it knows its limits. Anything that leaves the building — an email to a customer, a payment, a change to your records — waits for a human click. That’s built into the platform, not bolted on.',
  ],
  points: [
    { detail: 'not in a chat window', title: 'Acts in your systems' },
    { detail: 'around the clock', title: 'Runs jobs end-to-end' },
    { detail: 'anything that goes out', title: 'Your team approves' },
  ],
};

export const PROCESS = {
  cta: 'Start with the free audit',
  heading: 'How this becomes real',
  steps: [
    {
      body: 'Tell us how your business runs — or let us take a look. You get back a plain-English read of your workflows, the top three automation opportunities ranked by the hours they’d return.',
      title: 'Free workflow audit.',
    },
    {
      body: 'Pick one job from the audit. We connect Zyplux to the systems involved, build the workflow, and run it live. You measure the result before any talk of more.',
      title: 'One workflow, live in weeks.',
    },
    {
      body: 'We don’t hand over and disappear. We watch the workflow, refine it, and when it has proven its number, we talk about the next one. The pattern is simple: start with one job, grow from the savings.',
      title: 'Run, tune, expand.',
    },
  ],
};

export const FOUNDER = {
  heading: 'Who’s behind Zyplux',
  paragraphs: [
    'I’m Sergiy Yeskov, an engineer in Sydney. I’ve spent nearly twenty years building the software businesses run on — thirteen of them on a global logistics platform companies around the world use for their freight, invoicing, and pricing, where I built the pricing engine and led a team of ten-plus engineers. The last few years I’ve worked purely on AI: systems that read a company’s documents, answer from its own data, and — the hard part — act safely inside it.',
    'I built Zyplux because nothing on the shelf could do that hard part. Plenty of tools can chat about your business; none could be trusted to work inside it. So I built a platform where approvals, hard limits, and a full log of every action aren’t features bolted on — they’re the foundation it started from.',
    'When you work with Zyplux, you work with me: the engineer who built the platform designs your workflows, connects your systems, and answers your email. No account managers, no hand-offs, no juniors learning on your business.',
  ],
  photoAlt: 'Sergiy Yeskov',
};

export const SECURITY = {
  heading: 'Your data, your rules',
  intro: 'You’d be trusting us with your email, your records, your customers. Here’s the deal, plainly:',
  points: [
    {
      detail: 'Access is scoped system by system, permission by permission.',
      title: 'The agent sees only what you connect.',
    },
    {
      detail: 'Customer-facing actions wait for a human click — built into the platform itself.',
      title: 'Nothing goes out without approval.',
    },
    {
      detail: 'A full record of what the agent did, when, and why — yours to inspect at any time.',
      title: 'Every action is logged.',
    },
    {
      title: 'Your data never trains public AI models.',
    },
    {
      detail: 'Not shared infrastructure juggling a thousand customers.',
      title: 'Your agent runs privately, for your business alone.',
    },
  ],
};

export const FAQ = {
  heading: 'FAQ',
  items: [
    {
      answer:
        'If anyone on your team retypes information from one system into another, answers the same kind of email every day, or assembles the same report every week — you’re ready. The audit confirms exactly where.',
      question: 'How do I know if my business is ready for this?',
    },
    {
      answer:
        'That’s normal, and it’s fine. We work with your systems as they are and carry the technical load. Your team’s only job is to tell us how the work happens today.',
      question: 'We don’t have clean data or an IT department.',
    },
    {
      answer:
        'The audit lands within days. A pilot workflow goes live in weeks, not quarters — and you’ll be counting saved hours from its first week of operation.',
      question: 'How long until we see results?',
    },  
    {
      answer:
        'It replaces the worst hour of their day, not their jobs. The point is to stop your best people retyping data so they can do the work you actually hired them for.',
      question: 'Will this replace my employees?',
    },
    {
      answer:
        'It stays yours. Access is scoped to what you connect, every action is logged, and nothing is ever used to train public AI models. The "Your data, your rules" section above is the short version — we’re glad to walk through the details.',
      question: 'What happens to our data?',
    },
    {
      answer:
        'Occasionally it will — anyone who tells you otherwise is selling something. The system is built so a mistake costs a click, not a customer: outward-facing work is drafted for your approval, every action is logged, and the agent operates inside hard limits we set together.',
      question: 'What if the AI makes a mistake?',
    },
    {
      answer:
        'We stay. Monitoring, tuning, and a direct line to the engineer who built it. Expansion only happens after the first workflow proves its number.',
      question: 'What happens after you build it?',
    },
  ],
};

export const FINAL_CTA = {
  heading: 'Find out what’s hiding in your week.',
  sub: 'The audit is free, takes one short form, and is yours to keep',
};

export const AUDIT_FORM = {
  button: 'Get my free audit',
  companyLabel: 'Company',
  emailLabel: 'Work email',
  nameLabel: 'Name',
  taskLabel: 'What’s one task your team dreads?',
};

export const FOOTER = {
  blurb:
    'A private AI agent connected to the systems your business already runs on — doing the repetitive work, with nothing going out without your approval.',
  contactHeading: 'Contact',
  linkedin: { href: 'https://www.linkedin.com/in/sergiy-yeskov-4a8534152/', label: 'LinkedIn' },
  navigateHeading: 'Navigate',
  pages: [
    { href: '/agent', label: 'See the agent' },
    { href: '/insights', label: 'Insights' },
    { href: '/privacy', label: 'Privacy' },
  ],
  pagesHeading: 'Pages',
};

export const AGENT_PAGE = {
  button: 'Show me when it’s live',
  emailLabel: 'Email',
  headline: 'The agent, live.',
  paragraphs: [
    'This page will show Zyplux at work — a real session, not a video: reading what arrives, checking it against connected systems, drafting the work, and stopping to ask for approval before anything goes out.',
    'We’re polishing the showcase. Leave your email and you’ll be the first to see it.',
  ],
};

export const INSIGHTS_PAGE = {
  button: 'Send me the first one',
  emailLabel: 'Email',
  headline: 'How agents actually work — in plain language.',
  paragraphs: [
    'Short, honest reads on what AI agents can and can’t do for a business: how they reason, where they fail, and what words like "approval" and "audit trail" mean in practice. No jargon, no hype.',
    'The first articles are being written. Leave your email to get them when they land.',
  ],
};

export const PRIVACY_PAGE = {
  closing: 'Zyplux is based in Sydney, Australia.',
  headline: 'Privacy, plainly.',
  intro:
    'This page covers zyplux.ai, the website. How we handle a client’s business data during an engagement is a different, stricter story — the short version lives in "Your data, your rules" on the home page, and the full version in your service agreement.',
  sections: [
    {
      body: 'Only what you type into our forms: your name, work email, company, and anything you write in the message box. The site has no accounts and sets no cookies.',
      lead: 'What we collect.',
    },
    {
      body: 'To respond to your audit request, or to send you the updates you asked for. Nothing else — no profiling, no ad targeting.',
      lead: 'Why.',
    },
    {
      body: 'Form submissions are delivered to us by our form provider, which processes them on our behalf, and land in our inbox. We never sell or share your details.',
      lead: 'Where it goes.',
    },
    {
      body: 'Every update includes a way to opt out — or simply reply and tell us to stop, and we will.',
      lead: 'Updates you asked for.',
    },
    {
      body: 'We don’t run tracking or analytics scripts.',
      lead: 'Analytics.',
    },
    {
      body: 'Email hello@zyplux.ai — we’ll answer, and we’ll delete what we hold about you on request.',
      lead: 'Questions or removal.',
    },
  ],
};
