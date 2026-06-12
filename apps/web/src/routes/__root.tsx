import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { MotionProvider } from '@zyplux/ui/motion/provider';

import '@/index.css';

const RootDocument = () => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <HeadContent />
    </head>
    <body>
      <MotionProvider>
        <Outlet />
      </MotionProvider>
      <Scripts />
    </body>
  </html>
);

export const Route = createRootRoute({
  component: RootDocument,
  head: () => ({
    links: [{ href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' }],
    meta: [{ content: 'width=device-width, initial-scale=1.0', name: 'viewport' }],
  }),
});
