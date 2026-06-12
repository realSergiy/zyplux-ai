import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useState } from 'react';

import { BrandMark } from '@/components/ui/brand-mark';
import { NAV } from '@/content';
import { button, container, navLink } from '@/styles';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 200 });

  useMotionValueEvent(scrollY, 'change', latest => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg border-border' : 'bg-transparent border-transparent'
      }`}
      initial={{ y: -80 }}
      style={{ willChange: 'transform' }}
      transition={{ damping: 30, stiffness: 100, type: 'spring' }}
    >
      <div className={container({ class: 'py-4 flex items-center justify-between' })}>
        <motion.a
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
        </motion.a>

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
      </div>

      <motion.div
        className='absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-accent to-violet'
        style={{ scaleX: scrollProgress }}
      />
    </motion.nav>
  );
};
