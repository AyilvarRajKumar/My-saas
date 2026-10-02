import SplitHeading from './SplitHeading';
import { motion, useReducedMotion } from 'framer-motion';
import { floatUpAndFade, stagger3DContainer } from '../utils/animations';

interface Project {
  title: string;
  category: string;
  summary: string;
  tags: string[];
  gradient: string;
  accent: string;
}

const projects: Project[] = [
  {
    title: 'FinTech Dashboard',
    category: 'Web App',
    summary: 'A clean dashboard for tracking payments, spending and account insights in one place.',
    tags: ['React', 'Node.js'],
    gradient: 'from-purple-500/40 to-blue-500/20',
    accent: 'bg-purple-400',
  },
  {
    title: 'E-Commerce Platform',
    category: 'Online Store',
    summary: 'A fast storefront with smooth checkout, product search and order tracking.',
    tags: ['Next.js', 'Stripe'],
    gradient: 'from-cyan-500/40 to-emerald-500/20',
    accent: 'bg-cyan-400',
  },
  {
    title: 'Health & Wellness App',
    category: 'Mobile App',
    summary: 'A mobile app for daily habits, reminders and progress tracking.',
    tags: ['React Native', 'Firebase'],
    gradient: 'from-pink-500/40 to-rose-500/20',
    accent: 'bg-pink-400',
  },
  {
    title: 'AI Analytics Tool',
    category: 'AI Product',
    summary: 'Turns raw business data into easy-to-read charts and AI-generated insights.',
    tags: ['Python', 'TensorFlow'],
    gradient: 'from-violet-500/40 to-indigo-500/20',
    accent: 'bg-violet-400',
  },
  {
    title: 'Social Media Suite',
    category: 'Content Tools',
    summary: 'Plan, schedule and review social content across channels from one workspace.',
    tags: ['Vue.js', 'GraphQL'],
    gradient: 'from-amber-500/40 to-orange-500/20',
    accent: 'bg-amber-400',
  },
  {
    title: 'Learning Management System',
    category: 'EdTech',
    summary: 'Courses, lessons and learner progress, organised for teachers and students.',
    tags: ['TypeScript', 'AWS'],
    gradient: 'from-teal-500/40 to-cyan-500/20',
    accent: 'bg-teal-400',
  },
];

/** Abstract browser preview, tinted per project. */
const MockWindow = ({ project, index }: { project: Project; index: number }) => {
  const bars = [45, 70, 55, 90, 65];
  const flip = index % 2 === 1;
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${project.gradient} p-3`}>
      <div className="rounded-xl bg-background/80 border border-white/10 overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="ml-3 h-2 flex-1 max-w-[9rem] rounded-full bg-white/10" />
        </div>
        <div className={`flex gap-3 p-3 h-36 ${flip ? 'flex-row-reverse' : ''}`}>
          <div className="w-1/4 space-y-2">
            <span className={`block h-2.5 w-3/4 rounded-full ${project.accent}`} />
            <span className="block h-2 w-full rounded-full bg-white/10" />
            <span className="block h-2 w-5/6 rounded-full bg-white/10" />
            <span className="block h-2 w-2/3 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-8 rounded-lg bg-white/[0.07] border border-white/10" />
              ))}
            </div>
            <div className="flex-1 flex items-end gap-2">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-t-md ${project.accent} opacity-70 origin-bottom transition-transform duration-500 group-hover:scale-y-110`}
                  style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioCard = ({ project, index }: { project: Project; index: number }) => {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? undefined : { opacity: 0, y: 50 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-hover group rounded-3xl border border-white/10 bg-surface p-4 flex flex-col"
    >
      <MockWindow project={project} index={index} />
      <div className="px-2 pt-5 pb-2 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent-cyan">{project.category}</span>
          <span className="font-mono text-[11px] text-gray-500">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="font-heading text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

const Portfolio = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
          variants={shouldReduceMotion ? undefined : stagger3DContainer}
        >
          <SplitHeading className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            Our <span className="gradient-text">Work</span>
          </SplitHeading>
          <motion.p
            variants={shouldReduceMotion ? undefined : floatUpAndFade}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Showcasing our finest digital creations
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <PortfolioCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
