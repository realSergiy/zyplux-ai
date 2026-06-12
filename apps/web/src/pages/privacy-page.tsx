import { PageHeadline } from '@zyplux/ui/layout';
import { prose } from '@zyplux/ui/recipes';

import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PRIVACY_PAGE } from '@/content';

export const PrivacyPage = () => (
  <SubpageLayout>
    <PageHeadline>{PRIVACY_PAGE.headline}</PageHeadline>
    <div className={prose({ size: 'base' })} dangerouslySetInnerHTML={{ __html: PRIVACY_PAGE.body }} />
  </SubpageLayout>
);
