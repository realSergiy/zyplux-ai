import type { ReactNode } from 'react';

import { container } from '@zyplux/ui/recipes';

export type FooterColumn = {
  heading: string;
  links: { external?: boolean; href: string; label: string }[];
};

export const SiteFooter = ({
  blurb,
  brand,
  columns,
  copyright,
}: {
  blurb: ReactNode;
  brand: ReactNode;
  columns: FooterColumn[];
  copyright: ReactNode;
}) => (
  <footer className='relative mt-24 py-12 border-t border-border'>
    <div className={container()}>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-8 mb-8'>
        <div className='col-span-1 md:col-span-2'>
          <div className='flex items-center gap-2 mb-4'>{brand}</div>
          <p className='text-muted max-w-md'>{blurb}</p>
        </div>

        {columns.map(column => (
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
        <p>{copyright}</p>
      </div>
    </div>
  </footer>
);
