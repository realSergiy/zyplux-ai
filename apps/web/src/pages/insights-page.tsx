import { PageHeadline } from '@zyplux/ui/layout';
import { prose } from '@zyplux/ui/recipes';

import { EmailCapture } from '@/components/forms/email-capture';
import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PROSE_COMPONENTS } from '@/components/mdx/prose-components';
import { INSIGHTS_PAGE, InsightsBody } from '@/content';
import { INSIGHTS_POSTS } from '@/posts';

export const InsightsPage = () => (
  <SubpageLayout>
    <PageHeadline>{INSIGHTS_PAGE.headline}</PageHeadline>
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
    <EmailCapture button={INSIGHTS_PAGE.button} emailLabel={INSIGHTS_PAGE.emailLabel} formName='insights-updates' />
  </SubpageLayout>
);
