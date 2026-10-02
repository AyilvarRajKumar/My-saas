import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/** Thin gradient bar scrubbed to total page scroll. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none" aria-hidden="true">
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent-purple to-accent-cyan"
      />
    </div>
  );
}
