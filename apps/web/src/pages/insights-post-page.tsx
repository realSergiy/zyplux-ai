import { PageHeadline } from '@zyplux/ui/layout';
import { prose } from '@zyplux/ui/recipes';
import { Suspense } from 'react';

import type { InsightsPost } from '@/posts';

import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PROSE_COMPONENTS } from '@/components/mdx/prose-components';

export const InsightsPostPage = ({ post }: { post: InsightsPost }) => (
  <SubpageLayout>
    <article>
      <PageHeadline className='mb-2'>{post.title}</PageHeadline>
      <p className='text-sm text-muted mb-8'>{post.date}</p>
      <div className={prose()}>
        <Suspense>
          <post.body components={PROSE_COMPONENTS} />
        </Suspense>
      </div>
    </article>
  </SubpageLayout>
);
