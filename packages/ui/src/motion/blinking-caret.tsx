import * as m from 'motion/react-m';

export const BlinkingCaret = () => (
  <m.span
    animate={{ opacity: [1, 0, 1] }}
    aria-hidden
    className='inline-block h-4 w-px bg-accent'
    initial={{ opacity: 1 }}
    transition={{ duration: 1, repeat: Infinity }}
  />
);
