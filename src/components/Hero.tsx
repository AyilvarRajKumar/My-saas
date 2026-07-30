const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Build. Scale. <span className="gradient-text">Succeed.</span>
        </h1>
        <p className="text-muted text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          We craft premium digital products that help SaaS companies grow faster and scale effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="btn-primary">Start Your Project</a>
          <a href="#portfolio" className="glass-sm px-8 py-3 font-medium hover:bg-surface/80 transition-colors text-center">
            View Our Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
