import { Waves } from 'lucide-react';
import { motion } from 'motion/react';

export const SceneLoader = () => (
  <div className='fixed inset-0 -z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm'>
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className='flex flex-col items-center gap-6'
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        className='relative'
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <Waves className='h-16 w-16 text-primary' />
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          className='absolute inset-0 rounded-full bg-primary/20 blur-xl'
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        className='text-sm text-muted-foreground'
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        Initializing neural network...
      </motion.div>

      <div className='flex gap-2'>
        {[0, 1, 2].map(i => (
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            className='h-2 w-2 rounded-full bg-primary'
            key={i}
            transition={{
              delay: i * 0.2,
              duration: 0.6,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </motion.div>
  </div>
);
