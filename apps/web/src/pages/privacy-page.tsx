import { PageHeadline } from '@zyplux/ui/layout';
import { prose } from '@zyplux/ui/recipes';

import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PROSE_COMPONENTS } from '@/components/mdx/prose-components';
import { PRIVACY_PAGE, PrivacyBody } from '@/content';

export const PrivacyPage = () => (
  <SubpageLayout>
    <PageHeadline>{PRIVACY_PAGE.headline}</PageHeadline>
    <div className={prose({ size: 'base' })}>
      <PrivacyBody components={PROSE_COMPONENTS} />
    </div>
  </SubpageLayout>
);
