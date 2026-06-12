import * as m from 'motion/react-m';

export const ScrollCue = () => (
  <m.div
    animate={{ opacity: 1 }}
    aria-hidden
    className='absolute bottom-8 left-1/2 -translate-x-1/2'
    initial={{ opacity: 0 }}
    transition={{ delay: 0.8, duration: 1 }}
  >
    <m.div
      animate={{ y: [0, 10, 0] }}
      className='text-muted'
      initial={{ y: 0 }}
      transition={{ delay: 1.1, duration: 2, repeat: Infinity }}
    >
      <div className='w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-2'>
        <m.div
          animate={{ y: [0, 12, 0] }}
          className='w-1.5 h-1.5 bg-accent rounded-full'
          initial={{ y: 0 }}
          transition={{ delay: 1.1, duration: 1.5, repeat: Infinity }}
        />
      </div>
    </m.div>
  </m.div>
);
