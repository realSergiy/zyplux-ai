import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Brain, Network, Workflow, Sparkles, Cpu, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Autonomous Agents',
    description: 'AI agents that execute complex workflows without manual intervention, reducing operational overhead by up to 80%.',
  },
  {
    icon: Network,
    title: 'Distributed Processing',
    description: 'Scale processing across multiple nodes for parallel task execution and faster decision-making.',
  },
  {
    icon: Workflow,
    title: 'Multi-Agent Coordination',
    description: 'Orchestrate teams of specialized agents that collaborate to solve complex problems beyond individual capabilities.',
  },
  {
    icon: Sparkles,
    title: 'Continuous Learning',
    description: 'Systems that improve performance over time by learning from outcomes and user feedback.',
  },
  {
    icon: Cpu,
    title: 'Contextual Intelligence',
    description: 'Agents understand nuanced context and intent, delivering more accurate and relevant results.',
  },
  {
    icon: Zap,
    title: 'Real-Time Adaptation',
    description: 'Dynamic response to changing conditions with sub-second decision-making and execution.',
  },
];

const FeatureCard = ({ feature, index, isFeatured = false }: { feature: (typeof features)[0]; index: number; isFeatured?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        y: -8,
        rotateX: 5,
        rotateY: 5,
      }}
      className={`group relative ${isFeatured ? 'md:col-span-2' : ''}`}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px', willChange: 'transform, opacity' }}
    >
      <div
        className={`h-full rounded-2xl bg-card/50 backdrop-blur-lg border ${isFeatured ? 'border-primary/30' : 'border-border/50'} ${isFeatured ? 'p-12' : 'p-8'} hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10`}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        {isFeatured && <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 rounded-2xl' />}

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
          whileHover={{ rotate: 360, scale: 1.1 }}
          className={`${isFeatured ? 'w-20 h-20' : 'w-14 h-14'} rounded-xl bg-primary/10 flex items-center justify-center mb-6 relative z-10`}
          style={{ willChange: 'transform' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
          >
            <Icon className={`${isFeatured ? 'h-10 w-10' : 'h-7 w-7'} text-primary`} />
          </motion.div>
        </motion.div>

        <h3 className={`${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold mb-3 relative z-10`}>{feature.title}</h3>
        <p className={`text-muted-foreground relative z-10 ${isFeatured ? 'text-lg' : ''}`}>{feature.description}</p>
      </div>
    </motion.div>
  );
};

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id='capabilities' className='relative py-32 overflow-hidden'>
      <div className='container mx-auto px-4'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-5xl md:text-6xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>Core Capabilities</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Build intelligent applications powered by autonomous AI agents that think, learn, and execute
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} isFeatured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
