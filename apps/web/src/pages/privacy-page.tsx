import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PageHeadline } from '@/components/ui/page-headline';
import { PRIVACY_PAGE } from '@/content';

export const PrivacyPage = () => (
  <SubpageLayout>
    <PageHeadline>{PRIVACY_PAGE.headline}</PageHeadline>
    <div className='space-y-4 [&_strong]:text-heading' dangerouslySetInnerHTML={{ __html: PRIVACY_PAGE.body }} />
  </SubpageLayout>
);
