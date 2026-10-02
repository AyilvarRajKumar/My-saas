import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/** Soft glowing cursor ring that trails the mouse and swells over clickable things. */
export default function CursorFollower() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    const r = ring.current!, d = dot.current!;
    gsap.set([r, d], { xPercent: -50, yPercent: -50 });
    const rx = gsap.quickTo(r, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(r, 'y', { duration: 0.45, ease: 'power3' });
    const dx = gsap.quickTo(d, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(d, 'y', { duration: 0.08 });
    const move = (e: PointerEvent) => {
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
      gsap.to([r, d], { opacity: 1, duration: 0.2, overwrite: 'auto' });
      const hot = (e.target as HTMLElement | null)?.closest('a,button,select,input,textarea,[role=button]');
      gsap.to(r, { scale: hot ? 1.9 : 1, duration: 0.25, overwrite: 'auto' });
    };
    const leave = () => gsap.to([r, d], { opacity: 0, duration: 0.2 });
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="hidden [@media(pointer:fine)]:block pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <div ref={ring} className="absolute left-0 top-0 w-9 h-9 rounded-full border border-accent-purple/70 bg-accent-purple/10 opacity-0 mix-blend-screen" />
      <div ref={dot} className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-0" />
    </div>
  );
}
