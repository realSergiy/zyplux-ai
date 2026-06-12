import type { FooterColumn } from '@zyplux/ui/blocks';

import { SiteFooter } from '@zyplux/ui/blocks';

import { BrandMark } from '@/components/ui/brand-mark';
import { BRAND_NAME, CONTACT_EMAIL, FOOTER, NAV } from '@/content';

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: FOOTER.navigateHeading,
    links: NAV.links.map(link => ({ href: `/${link.href}`, label: link.label })),
  },
  { heading: FOOTER.pagesHeading, links: FOOTER.pages },
  {
    heading: FOOTER.contactHeading,
    links: [
      { href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
      { external: true, href: FOOTER.linkedin.href, label: FOOTER.linkedin.label },
    ],
  },
];

export const Footer = () => (
  <SiteFooter
    blurb={FOOTER.blurb}
    brand={<BrandMark />}
    columns={FOOTER_COLUMNS}
    copyright={
      <>
        © {new Date().getFullYear()} {BRAND_NAME}.
      </>
    }
  />
);
