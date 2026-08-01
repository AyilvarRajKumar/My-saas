import { motion, useReducedMotion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { flipInX, stagger3DContainer } from '../utils/animations';
import TiltCard from './TiltCard';

const tiers = [
  {
    name: 'Starter',
    price: '$2,999',
    period: '/project',
    popular: false,
    features: [
      'Custom Design',
      'Responsive Development',
      '2 Revision Rounds',
      'Basic SEO',
      '2 Week Delivery',
    ],
  },
  {
    name: 'Professional',
    price: '$5,999',
    period: '/project',
    popular: true,
    features: [
      'Everything in Starter',
      'Advanced Animations',
      'CMS Integration',
      '5 Revision Rounds',
      'Priority Support',
      '3 Week Delivery',
    ],
  },
  {
    name: 'Enterprise',
    price: '$9,999+',
    period: '/project',
    popular: false,
    features: [
      'Everything in Professional',
      'Custom Integrations',
      'Dedicated Team',
      'Unlimited Revisions',
      'Ongoing Support',
      'Custom Timeline',
    ],
  },
];

const Pricing = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="py-24 px-6">
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
            variants={shouldReduceMotion ? undefined : flipInX}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </motion.h2>
          <motion.p
            variants={shouldReduceMotion ? undefined : flipInX}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Choose the plan that fits your project needs
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
          variants={shouldReduceMotion ? undefined : stagger3DContainer}
          style={{ perspective: '1200px' }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={shouldReduceMotion ? undefined : flipInX}
              className={tier.popular && !shouldReduceMotion ? 'animate-float-slow' : ''}
            >
              <TiltCard
                maxTilt={tier.popular ? 8 : 12}
                className={`${tier.popular ? 'radial-glow' : ''}`}
              >
                <div
                  className={`relative backdrop-blur-md bg-white/5 border rounded-3xl p-8 transition-all duration-300 ${
                    tier.popular
                      ? 'border-accent-purple/50 scale-105 shadow-lg shadow-accent-purple/20'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Popular Badge */}
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-semibold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Tier Name */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-gray-400 text-sm">{tier.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <HiCheck className="text-accent-cyan flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-accent-purple to-accent-cyan text-white hover:scale-105'
                        : 'border border-white/20 text-white hover:bg-white/5 hover:border-white/40'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
