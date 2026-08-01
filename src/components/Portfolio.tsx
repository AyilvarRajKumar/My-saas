import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { floatUpAndFade, stagger3DContainer } from '../utils/animations';
import TiltCard from './TiltCard';

interface Project {
  title: string;
  tags: string[];
  gradient: string;
}

const projects: Project[] = [
  {
    title: 'FinTech Dashboard',
    tags: ['React', 'Node.js'],
    gradient: 'from-purple-600 to-blue-600',
  },
  {
    title: 'E-Commerce Platform',
    tags: ['Next.js', 'Stripe'],
    gradient: 'from-cyan-500 to-emerald-500',
  },
  {
    title: 'Health & Wellness App',
    tags: ['React Native', 'Firebase'],
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'AI Analytics Tool',
    tags: ['Python', 'TensorFlow'],
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    title: 'Social Media Suite',
    tags: ['Vue.js', 'GraphQL'],
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Learning Management System',
    tags: ['TypeScript', 'AWS'],
    gradient: 'from-teal-500 to-cyan-500',
  },
];

const PortfolioCard = ({ project, index }: { project: Project; index: number }) => {
  const shouldReduceMotion = useReducedMotion();

  // Parallax depth: each row gets slightly different animation delay
  const depthVariant: Variants = {
    hidden: {
      opacity: 0,
      y: 60 + (index % 3) * 10,
      scale: 0.92,
      rotateX: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 150,
        damping: 20,
        mass: 0.7,
        delay: (index % 3) * 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : depthVariant}
      className="group"
    >
      <TiltCard maxTilt={12} className="aspect-[4/3] rounded-3xl overflow-hidden">
        <div className="relative w-full h-full rounded-3xl overflow-hidden cursor-pointer">
          {/* Gradient Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`}
          />

          {/* Glass overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

          {/* Project Title centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-xl font-bold text-white text-center px-4 drop-shadow-lg">
              {project.title}
            </h3>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const Portfolio = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
          variants={shouldReduceMotion ? undefined : stagger3DContainer}
        >
          <motion.h2
            variants={shouldReduceMotion ? undefined : floatUpAndFade}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Our <span className="gradient-text">Work</span>
          </motion.h2>
          <motion.p
            variants={shouldReduceMotion ? undefined : floatUpAndFade}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Showcasing our finest digital creations
          </motion.p>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
          variants={shouldReduceMotion ? undefined : stagger3DContainer}
          style={{ perspective: '1200px' }}
        >
          {projects.map((project, index) => (
            <PortfolioCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
