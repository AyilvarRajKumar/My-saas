import { legalDocs } from '../pages/legal';

const prefix = typeof window !== 'undefined' && window.location.pathname !== '/' ? '/' : '';

const quickLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'portfolio' },
  { label: 'About', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

const serviceLinks = [
  'Web Development',
  'Mobile App Development',
  'Graphic Design',
  'Motion Graphics',
  'AI Content Creation',
  'Content Provider Outreach',
];

const Footer = () => {
  return (
    <footer className="bg-background pt-10 overflow-hidden">
      {/* Rounded card with a large curved bottom edge */}
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4">
        <div className="relative rounded-t-3xl rounded-b-[48px] md:rounded-b-[120px] border border-white/10 bg-surface px-6 sm:px-10 lg:px-16 pt-14 pb-16 md:pb-24 shadow-[0_30px_120px_-30px_rgba(168,85,247,0.35)]">
          <div className="absolute inset-0 rounded-[inherit] gradient-mesh pointer-events-none" aria-hidden="true" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-12">
            {/* Brand */}
            <div>
              <a href={`${prefix}#hero`} className="block font-heading text-2xl sm:text-3xl font-extrabold gradient-text tracking-tight">
                Digital Presence Agency
              </a>
              <p className="text-gray-400 mt-3 max-w-sm">
                Crafting digital experiences that push boundaries. We turn bold ideas into remarkable products.
              </p>

            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading text-white font-bold text-lg mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <a href={`${prefix}#${link.id}`} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-heading text-white font-bold text-lg mb-5">Services</h3>
              <ul className="space-y-3">
                {serviceLinks.map((service) => (
                  <li key={service}>
                    <a href={`${prefix}#services`} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {service}
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
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
          {legalDocs.map((d) => (
            <a key={d.path} href={d.path} className="text-gray-500 hover:text-white text-sm underline underline-offset-4 transition-colors">
              {d.label}
            </a>
          ))}
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
