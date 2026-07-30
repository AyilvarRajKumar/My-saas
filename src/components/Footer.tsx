const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xl font-bold gradient-text">SaaS Agency</div>
        <p className="text-muted text-sm">
          &copy; {new Date().getFullYear()} SaaS Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
