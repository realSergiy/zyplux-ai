import { container } from '@zyplux/ui/recipes';

import { BrandMark } from '@/components/ui/brand-mark';
import { BRAND_NAME, CONTACT_EMAIL, FOOTER, NAV } from '@/content';

type FooterLink = { external?: boolean; href: string; label: string };

const FOOTER_COLUMNS: { heading: string; links: FooterLink[] }[] = [
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
  <footer className='relative mt-24 py-12 border-t border-border'>
    <div className={container()}>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-8 mb-8'>
        <div className='col-span-1 md:col-span-2'>
          <div className='flex items-center gap-2 mb-4'>
            <BrandMark />
          </div>
          <p className='text-muted max-w-md'>{FOOTER.blurb}</p>
        </div>

        {FOOTER_COLUMNS.map(column => (
          <div key={column.heading}>
            <h3 className='font-semibold text-heading mb-4'>{column.heading}</h3>
            <ul className='space-y-2'>
              {column.links.map(link => (
                <li key={link.href}>
                  <a
                    className='text-muted hover:text-accent transition-colors'
                    href={link.href}
                    {...(link.external === true ? { rel: 'noreferrer', target: '_blank' } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='pt-8 border-t border-border text-center text-sm text-muted'>
        <p>
          © {new Date().getFullYear()} {BRAND_NAME}.
        </p>
      </div>
    </div>
  </footer>
);
