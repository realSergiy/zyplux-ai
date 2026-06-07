import { motion } from 'motion/react';
import { Waves } from 'lucide-react';

export const SceneLoader = () => {
  return (
    <div className='fixed inset-0 -z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col items-center gap-6'
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='relative'
        >
          <Waves className='h-16 w-16 text-primary' />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className='absolute inset-0 rounded-full bg-primary/20 blur-xl'
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className='text-sm text-muted-foreground'>
          Initializing neural network...
        </motion.div>

        <div className='flex gap-2'>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className='h-2 w-2 rounded-full bg-primary'
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
