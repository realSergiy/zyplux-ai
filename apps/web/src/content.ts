import { frontmatter as homeMeta } from '@content/home.mdx';
import { frontmatter as agentPage } from '@content/pages/agent.mdx';
import { frontmatter as insightsPage } from '@content/pages/insights.mdx';
import { frontmatter as privacyPage } from '@content/pages/privacy.mdx';

export { frontmatter as AGENT_PAGE, default as AgentBody } from '@content/pages/agent.mdx';
export { frontmatter as INSIGHTS_PAGE, default as InsightsBody } from '@content/pages/insights.mdx';
export { frontmatter as PRIVACY_PAGE, default as PrivacyBody } from '@content/pages/privacy.mdx';

export const PAGES = {
  agent: agentPage,
  index: homeMeta,
  insights: insightsPage,
  privacy: privacyPage,
};
