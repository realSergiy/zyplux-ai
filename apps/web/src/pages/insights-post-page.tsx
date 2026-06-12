import { PageHeadline } from '@zyplux/ui/components/page-headline';

import type { InsightsPost } from '@/posts';

import { SubpageLayout } from '@/components/layout/subpage-layout';

export const InsightsPostPage = ({ post }: { post: InsightsPost }) => (
  <SubpageLayout>
    <article>
      <PageHeadline className='mb-2'>{post.title}</PageHeadline>
      <p className='text-sm text-muted mb-8'>{post.date}</p>
      <div className='space-y-4 text-lg' dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  </SubpageLayout>
);
