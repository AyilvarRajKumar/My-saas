import { useEffect } from 'react';
import { gsap, prefersReducedMotion } from './gsap';

/**
 * Global GSAP ScrollTrigger effects, driven by data attributes:
 *  [data-reveal]   fade + rise + de-blur once, staggered for siblings
 *  [data-parallax] vertical drift scrubbed to scroll (value = px)
 */
export function useScrollReveals() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 60,
          filter: 'blur(8px)',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const d = Number(el.dataset.parallax) || 60;
        gsap.to(el, {
          y: -d,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      });
    });
    return () => ctx.revert();
  }, []);
}
