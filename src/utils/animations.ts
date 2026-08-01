import type { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// 3D card flip entrance from X axis
export const flipInX: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 60,
    y: 30,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    },
  },
};

// 3D rotation entrance from left
export const rotateInFromLeft: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -45,
    x: -60,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 22,
      mass: 0.7,
    },
  },
};

// 3D rotation entrance from right
export const rotateInFromRight: Variants = {
  hidden: {
    opacity: 0,
    rotateY: 45,
    x: 60,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 22,
      mass: 0.7,
    },
  },
};

// Parallax float up with fade
export const floatUpAndFade: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Bouncy elastic scale entrance
export const elasticScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
      mass: 0.6,
    },
  },
};

// Ambient glow pulse for decorative elements
export const glowPulse: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: [0.4, 0.8, 0.4],
    scale: [0.95, 1.05, 0.95],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// 3D perspective stagger container with depth
export const stagger3DContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// 3D perspective emergence for timeline/process steps
export const perspectiveEmerge: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 30,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 18,
      mass: 0.8,
    },
  },
};
