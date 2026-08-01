import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import ScrollSection from './components/ScrollSection';

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-white font-sans">
        <Header />
        {/* Hero stays as the first unpinned full-screen section */}
        <Hero />

        {/* Stacking sections - each rises up and stacks on top of the previous */}
        <ScrollSection index={0} zIndex={10} topOffset={0}>
          <Services />
        </ScrollSection>

        <ScrollSection index={1} zIndex={20} topOffset={20}>
          <Process />
        </ScrollSection>

        <ScrollSection index={2} zIndex={30} topOffset={40}>
          <Portfolio />
        </ScrollSection>

        <ScrollSection index={3} zIndex={40} topOffset={60}>
          <Testimonials />
        </ScrollSection>

        <ScrollSection index={4} zIndex={50} topOffset={80}>
          <Pricing />
        </ScrollSection>

        <ScrollSection index={5} zIndex={60} topOffset={100}>
          <Contact />
        </ScrollSection>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
