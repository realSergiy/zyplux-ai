import { createFileRoute, notFound } from '@tanstack/react-router';
import { PageHeadline } from '@zyplux/ui/layout';
import { prose } from '@zyplux/ui/recipes';
import { Suspense } from 'react';

import type { InsightsPost } from '@/posts';

import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PROSE_COMPONENTS } from '@/components/mdx/prose-components';
import { INSIGHTS_POSTS } from '@/posts';
import { postHead } from '@/seo';

const findPost = (slug: string) => {
  const post = INSIGHTS_POSTS.find(candidate => candidate.slug === slug);
  if (!post) {
    throw notFound();
  }
  return post;
};

const InsightsPostPage = ({ post }: { post: InsightsPost }) => (
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

const PostComponent = () => {
  const { slug } = Route.useParams();
  return <InsightsPostPage post={findPost(slug)} />;
};

export const Route = createFileRoute('/insights_/$slug')({
  component: PostComponent,
  head: ({ match }) => postHead(findPost(match.params.slug)),
});
