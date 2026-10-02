import { useState } from 'react';
import { HiMail, HiPhone, HiLocationMarker, HiArrowRight } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const quickLinks = ['Home', 'Services', 'Work', 'About', 'Contact'];

const serviceLinks = [
  'Web Development',
  'Mobile App Development',
  'Graphic Design',
  'Motion Graphics',
  'AI Content Creation',
  'Content Provider Outreach',
];

const linkClass =
  'text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200';

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
    <footer className="relative bg-surface border-t border-white/5 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full bg-accent-purple/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* CTA banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-md p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Ready to grow your <span className="gradient-text">digital presence?</span>
            </h2>
            <p className="text-gray-400">Tell us about your project and we&apos;ll get back within 24 hours.</p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 shrink-0 px-8 py-3 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold hover:scale-105 transition-transform duration-300"
          >
            Start a Project <HiArrowRight />
          </a>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold gradient-text mb-4">Digital Presence Agency</h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Crafting digital experiences that push boundaries. We turn bold ideas into remarkable products.
            </p>
            <a
              href="https://wa.me/916281589014"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe5b] transition-colors"
            >
              <FaWhatsapp className="text-lg" /> Chat on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className={linkClass}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-5">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a href="#services" className={linkClass}>{service}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-5">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-gray-400 mb-6">
              <li className="flex items-start gap-3">
                <HiMail className="text-accent-purple text-lg mt-0.5 shrink-0" />
                <a href="mailto:rajkumarayilvar@gmail.com" className="hover:text-white transition-colors break-all">rajkumarayilvar@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <HiPhone className="text-accent-purple text-lg mt-0.5 shrink-0" />
                <a href="tel:+916281589014" className="hover:text-white transition-colors">+91 6281589014</a>
              </li>
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-accent-purple text-lg mt-0.5 shrink-0" />
                <span>Isnapur X Road, Patancheruvu 502307, Telangana</span>
              </li>
            </ul>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-white/5 border border-white/10 rounded-l-xl px-4 py-2 text-white placeholder-gray-500 text-sm focus:border-accent-purple/50 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-semibold px-4 py-2 rounded-r-xl hover:opacity-90 transition-opacity"
              >
                {subscribed ? 'Done!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">&copy; 2026 Digital Presence Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
