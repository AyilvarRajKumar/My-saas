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
    <footer className="bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Multi-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Logo & Tagline */}
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-4">Digital Presence Agency</h2>
            <p className="text-gray-400 leading-relaxed">
              Crafting digital experiences that push boundaries. We turn bold
              ideas into remarkable products.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Stay Updated */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="flex mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-l-xl px-4 py-2 text-white placeholder-gray-500 text-sm focus:border-accent-purple/50 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-semibold px-4 py-2 rounded-r-xl hover:opacity-90 transition-opacity"
              >
                {subscribed ? 'Done!' : 'Subscribe'}
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  type="button"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-purple/50 hover:shadow-lg hover:shadow-accent-purple/20 transition-all duration-300"
                >
                  <social.icon className="text-base" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Digital Presence Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
