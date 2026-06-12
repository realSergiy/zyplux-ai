import { createFileRoute } from '@tanstack/react-router';

import { PAGES } from '@/content';
import { InsightsPage } from '@/pages/insights-page';
import { pageHead } from '@/seo';

export const Route = createFileRoute('/insights')({
  component: InsightsPage,
  head: ({ match }) => pageHead(PAGES.insights, match.pathname),
});
