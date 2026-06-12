import type { ReactNode } from 'react';

import { useScrolledPast } from '@zyplux/ui/hooks';
import { cx } from '@zyplux/ui/lib/style';
import { ScrollProgressBar } from '@zyplux/ui/motion';
import { container } from '@zyplux/ui/recipes';
import * as m from 'motion/react-m';

const SCROLLED_THRESHOLD_PX = 50;

export const NavBar = ({ brand, children }: { brand: ReactNode; children: ReactNode }) => {
  const scrolled = useScrolledPast(SCROLLED_THRESHOLD_PX);

  return (
    <m.nav
      animate={{ y: 0 }}
      className={cx(
        'fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-lg border-border' : 'bg-transparent border-transparent',
      )}
      initial={{ y: -80 }}
      style={{ willChange: 'transform' }}
      transition={{ damping: 30, stiffness: 100, type: 'spring' }}
    >
      <div className={container({ class: 'py-4 flex items-center justify-between' })}>
        {brand}
        {children}
      </div>
      <ScrollProgressBar />
    </m.nav>
  );
};
