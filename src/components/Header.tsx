import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'portfolio' },
  { label: 'About', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

// On legal pages, section links must go back to the home page first.
const prefix = typeof window !== 'undefined' && window.location.pathname !== '/' ? '/' : '';
const navLinks = navItems.map((n) => ({ label: n.label, href: `${prefix}#${n.id}` }));
const contactHref = `${prefix}#contact`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-[110] px-3 sm:px-6 pointer-events-none">
      {/* Floating, iOS-style frosted glass pill */}
      <nav
        className={`pointer-events-auto relative mx-auto max-w-5xl rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4
          border border-white/20 backdrop-blur-2xl backdrop-saturate-[1.8]
          shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(255,255,255,0.05)]
          transition-all duration-500 ${scrolled ? 'bg-white/[0.09] max-w-4xl' : 'bg-white/[0.06]'}`}
      >
        <a href={`${prefix}#hero`} className="font-heading text-sm sm:text-lg font-semibold gradient-text tracking-tight whitespace-nowrap">
          Digital Presence Agency
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-gray-200 hover:text-white hover:bg-white/10 transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={contactHref}
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-semibold hover:scale-105 transition-transform duration-200 shadow-lg shadow-accent-purple/25"
        >
          Book a Call
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-50 p-1.5 text-white"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="pointer-events-auto fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 200,
                duration: shouldReduceMotion ? 0 : undefined,
              }}
              className="pointer-events-auto fixed top-0 right-0 h-full w-[75%] max-w-sm bg-surface/95 backdrop-blur-lg border-l border-white/10 z-40 md:hidden flex flex-col pt-24 px-8"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-lg font-medium text-gray-200 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <a
                href={contactHref}
                onClick={handleNavClick}
                className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold hover:scale-105 transition-transform duration-200"
              >
                Book a Call
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
