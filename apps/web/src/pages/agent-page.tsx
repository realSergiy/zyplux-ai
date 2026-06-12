import { PageHeadline } from '@zyplux/ui/layout';
import { prose } from '@zyplux/ui/recipes';

import { EmailCapture } from '@/components/forms/email-capture';
import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PROSE_COMPONENTS } from '@/components/mdx/prose-components';
import { AGENT_PAGE, AgentBody } from '@/content';

export const AgentPage = () => (
  <SubpageLayout>
    <PageHeadline>{AGENT_PAGE.headline}</PageHeadline>
    <div className={prose({ class: 'mb-10' })}>
      <AgentBody components={PROSE_COMPONENTS} />
    </div>
    <EmailCapture button={AGENT_PAGE.button} emailLabel={AGENT_PAGE.emailLabel} formName='agent-updates' />
  </SubpageLayout>
);
