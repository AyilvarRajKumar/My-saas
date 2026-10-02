import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import SplitHeading from './SplitHeading';
import MagneticButton from './MagneticButton';
import { fadeInUp, staggerContainer } from '../utils/animations';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '62', label: 'Happy Clients' },
  { value: '15', label: 'Team Members' },
  { value: '5+', label: 'Years Experience' },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms for floating blobs
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Scroll-based fade out and parallax for hero content
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const animationProps = shouldReduceMotion
    ? { initial: undefined, animate: undefined, variants: undefined }
    : {};

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Floating Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        <motion.div
          style={shouldReduceMotion ? {} : { y: blob1Y }}
          className="absolute -top-20 -left-32 w-[500px] h-[500px] bg-accent-purple/30 rounded-full blur-3xl"
        />
        <motion.div
          style={shouldReduceMotion ? {} : { y: blob2Y }}
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-accent-cyan/20 rounded-full blur-3xl"
        />
        <motion.div
          style={shouldReduceMotion ? {} : { y: blob3Y }}
          className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] bg-accent-purple/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Content with scroll fade-out */}
      <motion.div
        className="relative z-10 max-w-5xl text-center"
        style={shouldReduceMotion ? {} : { opacity: contentOpacity, y: contentY }}
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        animate={shouldReduceMotion ? undefined : 'visible'}
        {...animationProps}
      >
        {/* Headline */}
        <SplitHeading as="h1" className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold leading-[1.08] mb-6 tracking-tight">
          We Build{' '}
          <span className="gradient-text font-serif italic font-normal">Digital Products</span>
          <br className="hidden sm:block" />
          {' '}That Move Businesses Forward
        </SplitHeading>

        {/* Subheadline */}
        <motion.p
          variants={shouldReduceMotion ? undefined : fadeInUp}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          We craft premium digital experiences that help SaaS companies grow
          faster, scale effortlessly, and stand out in crowded markets.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <MagneticButton
            href="#contact"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold text-lg hover:scale-105 transition-transform duration-200 shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/50"
          >
            Get Started
          </MagneticButton>
          <MagneticButton
            href="#portfolio"
            className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:scale-105 hover:bg-white/5 transition-all duration-200"
          >
            Our Work
          </MagneticButton>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card-hover bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5 text-center cursor-default"
            >
              <div className="font-num text-3xl md:text-4xl font-semibold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
