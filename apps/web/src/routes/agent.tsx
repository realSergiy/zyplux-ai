import AgentBody, { frontmatter } from '@content/pages/agent.mdx';
import { createFileRoute } from '@tanstack/react-router';
import { PageHeadline } from '@zyplux/ui/layout';
import { prose } from '@zyplux/ui/recipes';

import { EmailCapture } from '@/components/forms/email-capture';
import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PROSE_COMPONENTS } from '@/components/mdx/prose-components';
import { pageHead } from '@/seo';

export const AgentPage = () => (
  <SubpageLayout>
    <PageHeadline>{frontmatter.headline}</PageHeadline>
    <div className={prose({ class: 'mb-10' })}>
      <AgentBody components={PROSE_COMPONENTS} />
    </div>
    <EmailCapture button={frontmatter.button} emailLabel={frontmatter.emailLabel} formName='agent-updates' />
  </SubpageLayout>
);

export const Route = createFileRoute('/agent')({
  component: AgentPage,
  head: ({ match }) => pageHead(frontmatter, match.pathname),
});
