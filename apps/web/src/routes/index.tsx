import { createFileRoute } from '@tanstack/react-router';

import { PAGES } from '@/content';
import { HomePage } from '@/pages/home-page';
import { pageHead } from '@/seo';

export const Route = createFileRoute('/')({
  component: HomePage,
  head: ({ match }) => pageHead(PAGES.index, match.pathname),
});
