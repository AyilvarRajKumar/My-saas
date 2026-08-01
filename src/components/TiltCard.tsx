import { useState, useCallback, useRef, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
}

interface TiltState {
  rotateX: number;
  rotateY: number;
  shineX: number;
  shineY: number;
}

const TiltCard = ({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  glare = true,
}: TiltCardProps) => {
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    shineX: 50,
    shineY: 50,
  });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;

      setTilt({ rotateX, rotateY, shineX, shineY });
    },
    [shouldReduceMotion, maxTilt]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  }, []);

  return (
    <div style={{ perspective: `${perspective}px` }} className={className}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: shouldReduceMotion ? 0 : tilt.rotateX,
          rotateY: shouldReduceMotion ? 0 : tilt.rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {children}
        {/* Shine/glare overlay */}
        {glare && !shouldReduceMotion && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovering ? 0.15 : 0,
              background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default TiltCard;
