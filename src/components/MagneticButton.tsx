import { useRef, type AnchorHTMLAttributes } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/** Anchor that is gently pulled toward the cursor (GSAP quickTo). */
export default function MagneticButton({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.3;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
    gsap.to(ref.current, { x, y, duration: 0.5, ease: 'power3.out' });
  };
  const leave = () =>
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });

  return (
    <a ref={ref} onMouseMove={move} onMouseLeave={leave} {...props}>
      {children}
    </a>
  );
}
