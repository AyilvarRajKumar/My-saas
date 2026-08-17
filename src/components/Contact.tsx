import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiCheck,
} from 'react-icons/hi';
import { FiTwitter, FiLinkedin, FiInstagram, FiDribbble } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { rotateInFromLeft, rotateInFromRight, elasticScale, stagger3DContainer } from '../utils/animations';

const services = [
  'Web Development',
  'Mobile App Development',
  'Graphic Design',
  'Motion Graphics',
  'AI Content Creation',
  'Content Provider Outreach',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      }, 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (field: keyof FormErrors) =>
    `w-full bg-white/5 border ${
      errors[field] ? 'border-red-500/50 ring-1 ring-red-500/50' : 'border-white/10'
    } rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 focus:outline-none transition-all`;

  const socialLinks = [
    { icon: FiTwitter, label: 'Twitter' },
    { icon: FiLinkedin, label: 'LinkedIn' },
    { icon: FiInstagram, label: 'Instagram' },
    { icon: FiDribbble, label: 'Dribbble' },
  ];

  const contactInfoItems = [
    { icon: HiMail, text: 'rajkumarayilvar@gmail.com' },
    { icon: HiPhone, text: '+91 6281589014' },
    { icon: HiLocationMarker, text: 'Hitech City, Hyderabad, Telangana, India' },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
          variants={shouldReduceMotion ? undefined : stagger3DContainer}
        >
          <motion.h2
            variants={shouldReduceMotion ? undefined : elasticScale}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Let&apos;s <span className="gradient-text">Work Together</span>
          </motion.h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <motion.div
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            variants={shouldReduceMotion ? undefined : rotateInFromLeft}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Ready to bring your vision to life? Reach out to Raj Kumar,
              Founder and CEO, and let us start building something
              extraordinary together.
            </p>

            {/* Contact Info with staggered bounce-in */}
            <motion.div
              className="space-y-4 mb-8"
              initial={shouldReduceMotion ? undefined : 'hidden'}
              whileInView={shouldReduceMotion ? undefined : 'visible'}
              viewport={{ once: true }}
              variants={shouldReduceMotion ? undefined : stagger3DContainer}
            >
              {contactInfoItems.map((item) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-4"
                  variants={shouldReduceMotion ? undefined : elasticScale}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <item.icon className="text-accent-purple" />
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Icons with staggered bounce */}
            <motion.div
              className="flex gap-3"
              initial={shouldReduceMotion ? undefined : 'hidden'}
              whileInView={shouldReduceMotion ? undefined : 'visible'}
              viewport={{ once: true }}
              variants={shouldReduceMotion ? undefined : stagger3DContainer}
            >
              {socialLinks.map((social) => (
                <motion.button
                  key={social.label}
                  type="button"
                  aria-label={social.label}
                  variants={shouldReduceMotion ? undefined : elasticScale}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-purple/50 hover:shadow-lg hover:shadow-accent-purple/20 transition-all duration-300"
                >
                  <social.icon className="text-lg" />
                </motion.button>
              ))}
            </motion.div>

            {/* WhatsApp Button */}
            <motion.div
              className="mt-6"
              initial={shouldReduceMotion ? undefined : 'hidden'}
              whileInView={shouldReduceMotion ? undefined : 'visible'}
              viewport={{ once: true }}
              variants={shouldReduceMotion ? undefined : elasticScale}
            >
              <a
                href="https://wa.me/916281589014"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5b] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#25D366]/20"
              >
                <FaWhatsapp className="text-xl" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Form with floating effect */}
          <motion.div
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            variants={shouldReduceMotion ? undefined : rotateInFromRight}
          >
            <div className={!shouldReduceMotion ? 'animate-float-slow' : ''}>
            <form
              onSubmit={handleSubmit}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses('name')}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses('email')}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 focus:outline-none transition-all"
                  />
                </div>

                {/* Service Dropdown */}
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 focus:outline-none transition-all appearance-none"
                  >
                    <option value="" className="bg-surface text-gray-400">
                      Service Interested In
                    </option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-surface">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses('message')} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-accent-purple to-accent-cyan text-white hover:scale-105'
                  }`}
                >
                  {isSubmitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <HiCheck className="text-xl" />
                      Message Sent!
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
