import { motion, useReducedMotion } from 'framer-motion';
import {
  HiCode,
  HiDeviceMobile,
  HiColorSwatch,
  HiFilm,
  HiSparkles,
  HiUserGroup,
} from 'react-icons/hi';
import { fadeInUp, staggerContainer } from '../utils/animations';

const services = [
  {
    icon: HiCode,
    title: 'Web Development',
    description:
      'Custom, responsive websites & web applications built with cutting-edge technologies.',
  },
  {
    icon: HiDeviceMobile,
    title: 'Mobile App Development',
    description:
      'Native and cross-platform iOS & Android apps that users love.',
  },
  {
    icon: HiColorSwatch,
    title: 'Graphic Design',
    description:
      'Stunning flyers, branding, and social media creatives that captivate.',
  },
  {
    icon: HiFilm,
    title: 'Motion Graphics',
    description:
      'Animated videos, reels, and promotional content that tells your story.',
  },
  {
    icon: HiSparkles,
    title: 'AI Content Creation',
    description:
      'AI-powered copy, images, and video content at scale.',
  },
  {
    icon: HiUserGroup,
    title: 'Content Provider Outreach',
    description:
      'Sourcing and connecting brands with top content creators & influencers.',
  },
];

const Services = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="py-24 px-6">
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
            Our <span className="gradient-text">Services</span>
          </motion.h2>
          <motion.p
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            End-to-end solutions for modern SaaS businesses
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
          variants={shouldReduceMotion ? undefined : staggerContainer}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-accent-purple/20 hover:border-white/20"
            >
              <service.icon className="text-4xl text-accent-purple mb-5 group-hover:text-accent-cyan transition-colors duration-300" />
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
