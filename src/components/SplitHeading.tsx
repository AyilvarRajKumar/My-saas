import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, SplitText, prefersReducedMotion } from '../lib/gsap';

interface SplitHeadingProps {
  as?: 'h1' | 'h2';
  className?: string;
  children: ReactNode;
}

/** SplitText word-by-word masked reveal, triggered on scroll. */
export default function SplitHeading({ as = 'h2', className, children }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const el = ref.current;
    const ctx = gsap.context(() => {
      const split = SplitText.create(el, { type: 'words', mask: 'words', wordsClass: 'split-word', autoSplit: true });
      gsap.from(split.words, {
        yPercent: 110,
        rotate: 4,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
