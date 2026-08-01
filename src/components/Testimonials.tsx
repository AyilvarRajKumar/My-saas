import { motion, useReducedMotion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const testimonials = [
  {
    quote:
      'RudraThings transformed our outdated platform into a modern, high-converting SaaS product. Our user engagement increased by 340% within the first quarter.',
    name: 'Sarah Chen',
    role: 'CEO, CloudMetrics',
    initials: 'SC',
    color: 'bg-purple-500',
  },
  {
    quote:
      'The team delivered our mobile app ahead of schedule with impeccable quality. Their attention to detail in both UX and performance is unmatched.',
    name: 'Marcus Johnson',
    role: 'CTO, FinFlow',
    initials: 'MJ',
    color: 'bg-cyan-500',
  },
  {
    quote:
      'Working with RudraThings felt like having an in-house team. They understood our vision from day one and executed it flawlessly across every touchpoint.',
    name: 'Emily Rodriguez',
    role: 'Founder, DataPulse',
    initials: 'ER',
    color: 'bg-pink-500',
  },
  {
    quote:
      'Their AI content strategy doubled our organic traffic in just two months. The ROI on our investment has been exceptional.',
    name: 'David Park',
    role: 'Head of Growth, ScaleUp',
    initials: 'DP',
    color: 'bg-emerald-500',
  },
  {
    quote:
      'From branding to web development, RudraThings handled everything. Our rebrand generated more buzz than any campaign we have ever run.',
    name: 'Lisa Thompson',
    role: 'VP Marketing, SyncLabs',
    initials: 'LT',
    color: 'bg-amber-500',
  },
  {
    quote:
      'The motion graphics they created for our product launch were stunning. We saw a 5x increase in social media engagement overnight.',
    name: 'Alex Rivera',
    role: 'Creative Director, Vortex',
    initials: 'AR',
    color: 'bg-indigo-500',
  },
];

const Testimonials = () => {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate for infinite scroll
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 px-6 overflow-hidden">
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
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
          <motion.p
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Trusted by innovative companies around the world
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Scrolling container */}
          <div className="group">
            <div
              className={`flex gap-6 w-max ${shouldReduceMotion ? '' : 'animate-scroll motion-reduce:animate-none group-hover:[animation-play-state:paused]'}`}
            >
              {doubledTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="min-w-[350px] max-w-[350px] bg-surface/80 border border-white/10 rounded-3xl p-8 flex flex-col"
                >
                  {/* Quote */}
                  <p className="text-gray-300 italic leading-relaxed mb-6 flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Client info */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center text-white font-semibold text-sm`}
                    >
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Testimonials;
