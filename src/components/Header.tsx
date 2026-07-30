const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold gradient-text">SaaS Agency</div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-muted hover:text-white transition-colors">Services</a>
          <a href="#process" className="text-muted hover:text-white transition-colors">Process</a>
          <a href="#portfolio" className="text-muted hover:text-white transition-colors">Portfolio</a>
          <a href="#pricing" className="text-muted hover:text-white transition-colors">Pricing</a>
          <a href="#contact" className="btn-primary text-sm">Get Started</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
