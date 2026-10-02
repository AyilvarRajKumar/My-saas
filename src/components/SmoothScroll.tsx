import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Lenis drives the scroll position; GSAP's ticker drives Lenis so
 * ScrollTrigger animations stay perfectly in sync. A low lerp + damped
 * wheel multiplier means even a fast flick glides slowly to rest.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.055,
      wheelMultiplier: 0.65,
      touchMultiplier: 1.1,
      smoothWheel: true,
      anchors: { offset: -72, duration: 1.8 },
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
