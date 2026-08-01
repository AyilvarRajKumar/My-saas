import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  children: ReactNode;
  index: number;
  zIndex: number;
  topOffset?: number;
}

export default function ScrollSection({
  children,
  index,
  zIndex,
  topOffset = 0,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scale down slightly as the section gets pushed behind
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Reduce opacity subtly when stacked behind
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.7]);

  // Add a subtle shadow that intensifies as section is covered
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 1],
    [
      '0 0 0 0 rgba(0, 0, 0, 0)',
      '0 -10px 60px -10px rgba(0, 0, 0, 0.5)',
    ]
  );

  return (
    <div
      ref={sectionRef}
      className="scroll-section-wrapper"
      style={{
        position: 'relative',
        zIndex,
      }}
    >
      <motion.div
        className="scroll-section-inner"
        style={{
          position: 'sticky',
          top: `${topOffset}px`,
          scale,
          opacity,
          boxShadow,
          transformOrigin: 'center top',
          borderRadius: index > 0 ? '24px 24px 0 0' : undefined,
          overflow: 'hidden',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
