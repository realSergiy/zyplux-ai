import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Waves } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      style={{ willChange: 'transform' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <motion.a
          href='/'
          onClick={e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            globalThis.history.pushState({}, '', '/');
          }}
          className='flex items-center gap-2 cursor-pointer'
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          aria-label='Scroll to top'
        >
          <Waves className='h-8 w-8 text-primary' />
          <span className='text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>Totvibe</span>
        </motion.a>

        <div className='flex items-center gap-8'>
          <div className='hidden md:flex items-center gap-6'>
            {['Capabilities', 'Architecture', 'Connect'].map(item => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
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
