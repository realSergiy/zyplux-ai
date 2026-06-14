import InsightsBody, { frontmatter } from '@content/pages/insights.mdx';
import { createFileRoute } from '@tanstack/react-router';
import { PageHeadline } from '@zyplux/ui/layout';
import { prose } from '@zyplux/ui/recipes';

import { EmailCapture } from '@/components/forms/email-capture';
import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PROSE_COMPONENTS } from '@/components/mdx/prose-components';
import { INSIGHTS_POSTS } from '@/posts';
import { pageHead } from '@/seo';

const InsightsPage = () => (
  <SubpageLayout>
    <PageHeadline>{frontmatter.headline}</PageHeadline>
    {INSIGHTS_POSTS.length > 0 && (
      <ul className='space-y-6 mb-12'>
        {INSIGHTS_POSTS.map(post => (
          <li key={post.slug}>
            <a className='group block' href={`/insights/${post.slug}`}>
              <h2 className='text-2xl font-semibold text-heading group-hover:text-accent transition-colors'>
                {post.title}
              </h2>
              <p className='mt-1 text-sm text-muted'>{post.date}</p>
              <p className='mt-2 text-muted'>{post.description}</p>
            </a>
          </li>
        ))}
      </ul>
    )}
    <div className={prose({ class: 'mb-10' })}>
      <InsightsBody components={PROSE_COMPONENTS} />
    </div>
    <EmailCapture button={frontmatter.button} emailLabel={frontmatter.emailLabel} formName='insights-updates' />
  </SubpageLayout>
);

export const Route = createFileRoute('/insights')({
  component: InsightsPage,
  head: ({ match }) => pageHead(frontmatter, match.pathname),
});
