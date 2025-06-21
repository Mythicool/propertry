// Animation Components Export
export { default as AnimatedSection } from './AnimatedSection';
export { default as StaggeredList } from './StaggeredList';
export { default as AnimatedCounter } from './AnimatedCounter';
export { default as ParallaxElement } from './ParallaxElement';
export { default as AnimatedButton } from './AnimatedButton';
export { default as MicroInteraction } from './MicroInteraction';
export { default as ModernLoader } from './ModernLoader';
export { default as FloatingElements } from './FloatingElements';

// Animation Variants
export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

export const slideInUp = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 }
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -180 },
  animate: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: -180 }
};

// Stagger Container Variants
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Page Transition Variants
export const pageTransition = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

// Modal Variants
export const modalVariants = {
  initial: { opacity: 0, scale: 0.8, y: 50 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

// Hover Variants
export const hoverScale = {
  hover: { scale: 1.05, y: -5 },
  tap: { scale: 0.95 }
};

export const hoverGlow = {
  hover: { 
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    y: -5
  }
};
