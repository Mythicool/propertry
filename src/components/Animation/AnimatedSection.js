import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useAnimation';
import { useAccessibility } from '../Accessibility/AccessibilityProvider';

const AnimatedSection = ({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  ...props
}) => {
  const { getAnimationProps } = useAccessibility();
  const { ref, animationProps } = useScrollAnimation({
    threshold,
    delay,
    duration
  });

  const animations = {
    fadeInUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 }
    },
    fadeInDown: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 }
    },
    fadeInRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    slideInUp: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 }
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -180 },
      animate: { opacity: 1, rotate: 0 }
    },
    bounceIn: {
      initial: { opacity: 0, scale: 0.3 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 100
        }
      }
    },
    flipIn: {
      initial: { opacity: 0, rotateY: -90 },
      animate: { opacity: 1, rotateY: 0 }
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 }
    },
    slideInRight: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 }
    },
    elastic: {
      initial: { opacity: 0, scale: 0 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          damping: 8,
          stiffness: 200
        }
      }
    }
  };

  const selectedAnimation = animations[animation] || animations.fadeInUp;

  const accessibleAnimationProps = getAnimationProps({
    initial: selectedAnimation.initial,
    animate: animationProps.animate.opacity === 1 ? selectedAnimation.animate : selectedAnimation.initial,
    transition: { duration, ease: "easeOut" }
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      {...accessibleAnimationProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
