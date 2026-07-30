import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiCheck,
} from 'react-icons/hi';
import { FiTwitter, FiLinkedin, FiInstagram, FiDribbble } from 'react-icons/fi';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../utils/animations';

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

  return (
    <section id="contact" className="py-24 px-6">
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
            variants={shouldReduceMotion ? undefined : fadeInLeft}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Ready to bring your vision to life? We would love to hear about
              your project. Reach out and let us start building something
              extraordinary together.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <HiMail className="text-accent-purple" />
                </div>
                <span className="text-gray-300">hello@nexus.agency</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <HiPhone className="text-accent-purple" />
                </div>
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <HiLocationMarker className="text-accent-purple" />
                </div>
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  type="button"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-purple/50 hover:shadow-lg hover:shadow-accent-purple/20 transition-all duration-300"
                >
                  <social.icon className="text-lg" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            variants={shouldReduceMotion ? undefined : fadeInRight}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
