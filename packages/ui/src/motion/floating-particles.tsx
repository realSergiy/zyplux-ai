import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';

type Particle = { delay: number; duration: number; left: string; size: number; top: string };

const AMBIENT_PARTICLES: Particle[] = [
  { delay: 0, duration: 7, left: '12%', size: 6, top: '28%' },
  { delay: 0.8, duration: 8, left: '70%', size: 5, top: '20%' },
  { delay: 1.5, duration: 9, left: '82%', size: 4, top: '34%' },
  { delay: 2.2, duration: 10, left: '24%', size: 4, top: '64%' },
  { delay: 1.1, duration: 8.5, left: '90%', size: 5, top: '70%' },
];

export const FloatingParticles = ({ particles = AMBIENT_PARTICLES }: { particles?: Particle[] }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion === true) {
    return;
  }

  return (
    <div aria-hidden className='pointer-events-none absolute inset-0 z-0'>
      {particles.map(particle => (
        <m.span
          animate={{ opacity: [0.15, 0.5, 0.15], y: [0, -18, 0] }}
          className='absolute rounded-full bg-accent/40'
          initial={{ opacity: 0.15, y: 0 }}
          key={`${particle.left}-${particle.top}`}
          style={{ height: particle.size, left: particle.left, top: particle.top, width: particle.size }}
          transition={{ delay: particle.delay, duration: particle.duration, ease: 'easeInOut', repeat: Infinity }}
        />
      ))}
    </div>
  );
};
