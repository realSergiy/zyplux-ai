import { Brain, Cpu, Network, Sparkles, Workflow, Zap } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const features = [
  {
    description:
      'AI agents that execute complex workflows without manual intervention, reducing operational overhead by up to 80%.',
    icon: Brain,
    title: 'Autonomous Agents',
  },
  {
    description: 'Scale processing across multiple nodes for parallel task execution and faster decision-making.',
    icon: Network,
    title: 'Distributed Processing',
  },
  {
    description:
      'Orchestrate teams of specialized agents that collaborate to solve complex problems beyond individual capabilities.',
    icon: Workflow,
    title: 'Multi-Agent Coordination',
  },
  {
    description: 'Systems that improve performance over time by learning from outcomes and user feedback.',
    icon: Sparkles,
    title: 'Continuous Learning',
  },
  {
    description: 'Agents understand nuanced context and intent, delivering more accurate and relevant results.',
    icon: Cpu,
    title: 'Contextual Intelligence',
  },
  {
    description: 'Dynamic response to changing conditions with sub-second decision-making and execution.',
    icon: Zap,
    title: 'Real-Time Adaptation',
  },
];

const FeatureCard = ({
  feature,
  index,
  isFeatured = false,
}: {
  feature: (typeof features)[0];
  index: number;
  isFeatured?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px', once: false });
  const Icon = feature.icon;

  return (
    <motion.div
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      className={`group relative ${isFeatured ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      ref={ref}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{
        rotateX: 5,
        rotateY: 5,
        y: -8,
      }}
    >
      <div
        className={`h-full rounded-2xl bg-card/50 backdrop-blur-lg border ${isFeatured ? 'border-primary/30' : 'border-border/50'} ${isFeatured ? 'p-12' : 'p-8'} hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10`}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        {isFeatured && (
          <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 rounded-2xl' />
        )}

        <motion.div
          animate={isInView ? { rotate: 0, scale: 1 } : { rotate: -180, scale: 0 }}
          className={`${isFeatured ? 'w-20 h-20' : 'w-14 h-14'} rounded-xl bg-primary/10 flex items-center justify-center mb-6 relative z-10`}
          initial={{ rotate: -180, scale: 0 }}
          style={{ willChange: 'transform' }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5, stiffness: 200, type: 'spring' }}
          whileHover={{ rotate: 360, scale: 1.1 }}
        >
          <motion.div
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
          >
            <Icon className={`${isFeatured ? 'h-10 w-10' : 'h-7 w-7'} text-primary`} />
          </motion.div>
        </motion.div>

        <h3 className={`${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold mb-3 relative z-10`}>
          {feature.title}
        </h3>
        <p className={`text-muted-foreground relative z-10 ${isFeatured ? 'text-lg' : ''}`}>{feature.description}</p>
      </div>
    </motion.div>
  );
};

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px', once: false });

  return (
    <section className='relative py-32 overflow-hidden' id='capabilities'>
      <div className='container mx-auto px-4'>
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          ref={ref}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-5xl md:text-6xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>
              Core Capabilities
            </span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Build intelligent applications powered by autonomous AI agents that think, learn, and execute
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <FeatureCard feature={feature} index={index} isFeatured={index === 0} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
