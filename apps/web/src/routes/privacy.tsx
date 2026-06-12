import PrivacyBody, { frontmatter } from '@content/pages/privacy.mdx';
import { createFileRoute } from '@tanstack/react-router';
import { PageHeadline } from '@zyplux/ui/layout';
import { prose } from '@zyplux/ui/recipes';

import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PROSE_COMPONENTS } from '@/components/mdx/prose-components';
import { pageHead } from '@/seo';

export const PrivacyPage = () => (
  <SubpageLayout>
    <PageHeadline>{frontmatter.headline}</PageHeadline>
    <div className={prose({ size: 'base' })}>
      <PrivacyBody components={PROSE_COMPONENTS} />
    </div>
  </SubpageLayout>
);

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: ({ match }) => pageHead(frontmatter, match.pathname),
});
