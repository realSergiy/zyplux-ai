import { NavBar } from '@zyplux/ui/blocks/nav-bar';
import { button, navLink } from '@zyplux/ui/recipes';
import * as m from 'motion/react-m';

import { BrandMark } from '@/components/ui/brand-mark';
import { NAV } from '@/content';

export const Navigation = () => (
  <NavBar
    brand={
      <m.a
        aria-label='Scroll to top'
        className='flex items-center gap-2 cursor-pointer'
        href='/'
        onClick={event => {
          event.preventDefault();
          window.scrollTo({ behavior: 'smooth', top: 0 });
          globalThis.history.pushState({}, '', '/');
        }}
        transition={{ stiffness: 300, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
      >
        <BrandMark />
      </m.a>
    }
  >
    <div className='flex items-center gap-6'>
      <div className='hidden md:flex items-center gap-6'>
        {[...NAV.links, { href: '/agent', label: NAV.agentLink }].map(link => (
          <a className={navLink()} href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <a className={button({ size: 'sm' })} href='#audit'>
        {NAV.cta}
      </a>
    </div>
  </NavBar>
);
