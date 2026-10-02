import { useState } from 'react';
import { FiTwitter, FiLinkedin, FiInstagram, FiDribbble } from 'react-icons/fi';

const quickLinks = ['Home', 'Services', 'Work', 'About', 'Contact'];

const serviceLinks = [
  'Web Development',
  'Mobile App Development',
  'Graphic Design',
  'Motion Graphics',
  'AI Content Creation',
  'Content Provider Outreach',
];

const socialLinks = [
  { icon: FiTwitter, label: 'Twitter' },
  { icon: FiLinkedin, label: 'LinkedIn' },
  { icon: FiInstagram, label: 'Instagram' },
  { icon: FiDribbble, label: 'Dribbble' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-background pt-10 overflow-hidden">
      {/* Rounded card with a large curved bottom edge */}
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4">
        <div className="relative rounded-t-3xl rounded-b-[48px] md:rounded-b-[120px] border border-white/10 bg-surface px-6 sm:px-10 lg:px-16 pt-14 pb-16 md:pb-24 shadow-[0_30px_120px_-30px_rgba(168,85,247,0.35)]">
          <div className="absolute inset-0 rounded-[inherit] gradient-mesh pointer-events-none" aria-hidden="true" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12">
            {/* Brand + newsletter */}
            <div>
              <a href="#hero" className="block text-2xl sm:text-3xl font-bold gradient-text tracking-tight">
                Digital Presence Agency
              </a>
              <p className="text-gray-400 mt-3 max-w-sm">
                Crafting digital experiences that push boundaries. We turn bold ideas into remarkable products.
              </p>

              <h3 className="text-white font-semibold text-lg mt-10 mb-4">Subscribe to our newsletter</h3>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-accent-purple/50 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  {subscribed ? 'Done!' : 'Subscribe'}
                </button>
              </form>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-bold text-lg mb-5">Services</h3>
              <ul className="space-y-3">
                {serviceLinks.map((service) => (
                  <li key={service}>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow */}
            <div>
              <h3 className="text-white font-bold text-lg mb-5">Follow us at</h3>
              <ul className="space-y-4">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a href="#contact" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200">
                      <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent-purple/60 group-hover:shadow-lg group-hover:shadow-accent-purple/20 transition-all">
                        <social.icon className="text-sm" />
                      </span>
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-4 text-center">
        <p className="text-gray-400 text-sm">&copy; 2026 Digital Presence Agency. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-2">
          <a href="#" className="text-gray-500 hover:text-white text-sm underline underline-offset-4 transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-500 hover:text-white text-sm underline underline-offset-4 transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Giant looping wordmark: never pauses, not selectable or clickable */}
      <div className="py-6 select-none pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-scroll">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="mx-4 sm:mx-6 flex items-center gap-4 sm:gap-6 text-4xl sm:text-6xl font-extrabold text-white/15 whitespace-nowrap">
              DIGITAL PRESENCE
              <span className="w-12 h-12 sm:w-[72px] sm:h-[72px] rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white text-xl sm:text-3xl">
                ↗
              </span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
