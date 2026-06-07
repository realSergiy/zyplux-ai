import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden' style={{ willChange: 'auto' }}>
      <div className='container mx-auto px-4 py-32 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-center max-w-4xl mx-auto'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8'
          >
            <Sparkles className='h-4 w-4 text-primary' />
            <span className='text-sm font-medium text-primary'>Neural Intelligence Systems</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='text-6xl md:text-8xl font-bold mb-6 leading-tight'
          >
            <span className='bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] animate-pulse-glow'>
              Totvibe
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto'
          >
            Experience the future of agentic web systems and cognitive frameworks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <motion.button
              whileHover={{ scale: 1.05, willChange: 'transform' }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-shadow'
              aria-label='Deploy AI Agents (Coming Soon)'
            >
              Deploy Agents
              <ArrowRight className='h-5 w-5' />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, willChange: 'transform' }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-4 rounded-full border-2 border-primary text-foreground font-semibold hover:bg-primary/10 transition-colors'
              aria-label='Explore AI Framework (Coming Soon)'
            >
              Explore Framework
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className='absolute bottom-8 left-1/2 -translate-x-1/2'
        >
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.1 }}
            className='text-muted-foreground'
          >
            <div className='w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2'>
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1.1 }}
                className='w-1.5 h-1.5 bg-primary rounded-full'
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
