import { createFileRoute } from '@tanstack/react-router';

import { PAGES } from '@/content';
import { PrivacyPage } from '@/pages/privacy-page';
import { pageHead } from '@/seo';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: ({ match }) => pageHead(PAGES.privacy, match.pathname),
});
