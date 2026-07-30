import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiSearch, HiPencil, HiCog, HiCheckCircle } from 'react-icons/hi';
import { fadeInUp, staggerContainer } from '../utils/animations';

const steps = [
  {
    number: '01',
    icon: HiSearch,
    title: 'Discover',
    description: 'We dive deep into your goals, audience, and market to define the perfect strategy.',
  },
  {
    number: '02',
    icon: HiPencil,
    title: 'Design',
    description: 'Crafting wireframes and visual designs that align with your brand identity.',
  },
  {
    number: '03',
    icon: HiCog,
    title: 'Develop',
    description: 'Building your product with clean, scalable code and modern technologies.',
  },
  {
    number: '04',
    icon: HiCheckCircle,
    title: 'Deliver',
    description: 'Rigorous testing, deployment, and ongoing support to ensure success.',
  },
];

const Process = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section id="process" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
          variants={shouldReduceMotion ? undefined : staggerContainer}
        >
          <motion.h2
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            How It <span className="gradient-text">Works</span>
          </motion.h2>
          <motion.p
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A proven methodology that delivers results every time
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={sectionRef} className="relative">
          {/* Animated Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 px-16">
            <svg
              className="w-full h-2"
              viewBox="0 0 1000 4"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0 2 H1000"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={isInView && !shouldReduceMotion ? { pathLength: 1 } : { pathLength: shouldReduceMotion ? 1 : 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a855f7" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Animated Connecting Line - Mobile */}
          <div className="lg:hidden absolute top-0 bottom-0 left-8 w-1">
            <svg
              className="w-full h-full"
              viewBox="0 0 4 800"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M2 0 V800"
                stroke="url(#lineGradientVertical)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={isInView && !shouldReduceMotion ? { pathLength: 1 } : { pathLength: shouldReduceMotion ? 1 : 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="lineGradientVertical" x1="0" y1="0" x2="0" y2="800" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a855f7" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps */}
          <motion.div
            className="relative grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6"
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            variants={
              shouldReduceMotion
                ? undefined
                : {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.3,
                      },
                    },
                  }
            }
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="relative pl-16 lg:pl-0"
              >
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 text-center lg:text-center">
                  <span className="text-sm font-bold gradient-text mb-2 block">
                    {step.number}
                  </span>
                  <step.icon className="text-3xl text-accent-cyan mx-auto lg:mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;
