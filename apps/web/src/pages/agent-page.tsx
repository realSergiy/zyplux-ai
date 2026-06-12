import { PageHeadline } from '@zyplux/ui/layout/page-headline';
import { prose } from '@zyplux/ui/recipes';

import { EmailCapture } from '@/components/forms/email-capture';
import { SubpageLayout } from '@/components/layout/subpage-layout';
import { AGENT_PAGE } from '@/content';

export const AgentPage = () => (
  <SubpageLayout>
    <PageHeadline>{AGENT_PAGE.headline}</PageHeadline>
    <div className={prose({ class: 'mb-10' })} dangerouslySetInnerHTML={{ __html: AGENT_PAGE.body }} />
    <EmailCapture button={AGENT_PAGE.button} emailLabel={AGENT_PAGE.emailLabel} formName='agent-updates' />
  </SubpageLayout>
);
