import { useAtom } from 'jotai';
import { Waves } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { scrolledAtom } from '@/store/atoms';

export const Navigation = () => {
  const [scrolled, setScrolled] = useAtom(scrolledAtom);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrolled]);

  return (
    <motion.nav
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      style={{ willChange: 'transform' }}
      transition={{ damping: 30, stiffness: 100, type: 'spring' }}
    >
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <motion.a
          aria-label='Scroll to top'
          className='flex items-center gap-2 cursor-pointer'
          href='/'
          onClick={e => {
            e.preventDefault();
            window.scrollTo({ behavior: 'smooth', top: 0 });
            globalThis.history.pushState({}, '', '/');
          }}
          transition={{ stiffness: 300, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
        >
          <Waves className='h-8 w-8 text-primary' />
          <span className='text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>
            Totvibe
          </span>
        </motion.a>

        <div className='flex items-center gap-8'>
          <div className='hidden md:flex items-center gap-6'>
            {['Capabilities', 'Architecture', 'Connect'].map(item => (
              <motion.a
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                href={`#${item.toLowerCase()}`}
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};
