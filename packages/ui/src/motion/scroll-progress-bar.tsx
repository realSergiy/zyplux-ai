import { useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 200 });

  return (
    <m.div
      className='absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-linear-to-r from-accent to-violet'
      style={{ scaleX: scrollProgress }}
    />
  );
};
