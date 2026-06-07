import { useAtom } from 'jotai';
import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';

import { useTheme } from '@/hooks/use-theme';
import { mountedAtom, showHintAtom } from '@/store/atoms';

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useAtom(mountedAtom);
  const [showHint, setShowHint] = useAtom(showHintAtom);

  useEffect(() => {
    setMounted(true);
    const hasSeenHint = localStorage.getItem('theme-hint-seen');
    if (!hasSeenHint) {
      setTimeout(() => {
        setShowHint(true);
      }, 2000);
      setTimeout(() => {
        setShowHint(false);
        localStorage.setItem('theme-hint-seen', 'true');
      }, 8000);
    }
  }, [setMounted, setShowHint]);

  if (!mounted) {
    return <div className='h-10 w-10 rounded-full bg-muted animate-pulse' />;
  }

  const toggleTheme = () => {
    setShowHint(false);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className='relative'>
      <button
        aria-label='Toggle theme'
        className='relative h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200 flex items-center justify-center'
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <Moon className='h-5 w-5 text-primary' /> : <Sun className='h-5 w-5 text-primary' />}
      </button>

      <AnimatePresence>
        {showHint && (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className='absolute top-full right-0 mt-2 px-3 py-2 bg-primary/90 backdrop-blur-lg rounded-lg shadow-lg text-primary-foreground text-sm whitespace-nowrap pointer-events-none'
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
          >
            <div className='flex items-center gap-2'>
              <span>Try dark mode!</span>
              <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                ✨
              </motion.div>
            </div>
            <div className='absolute -top-1 right-4 w-2 h-2 bg-primary/90 rotate-45' />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
