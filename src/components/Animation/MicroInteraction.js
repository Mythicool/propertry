import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../Accessibility/AccessibilityProvider';

const MicroInteraction = ({
  children,
  type = 'hover',
  effect = 'lift',
  intensity = 'medium',
  className = '',
  disabled = false,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const { getAnimationProps } = useAccessibility();

  const intensityValues = {
    subtle: { scale: 1.02, y: -2, rotate: 1 },
    medium: { scale: 1.05, y: -4, rotate: 2 },
    strong: { scale: 1.08, y: -8, rotate: 3 }
  };

  const currentIntensity = intensityValues[intensity] || intensityValues.medium;

  const effects = {
    lift: {
      whileHover: { 
        y: -currentIntensity.y, 
        scale: currentIntensity.scale,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      whileTap: { scale: 0.98, y: 0 }
    },
    scale: {
      whileHover: { 
        scale: currentIntensity.scale,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      whileTap: { scale: 0.95 }
    },
    rotate: {
      whileHover: { 
        rotate: currentIntensity.rotate,
        scale: currentIntensity.scale,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      whileTap: { rotate: -currentIntensity.rotate, scale: 0.98 }
    },
    glow: {
      whileHover: { 
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
        scale: currentIntensity.scale,
        transition: { duration: 0.3 }
      },
      whileTap: { scale: 0.98 }
    },
    bounce: {
      whileHover: { 
        y: [0, -currentIntensity.y, 0],
        transition: { 
          y: { 
            repeat: Infinity, 
            duration: 0.6,
            ease: "easeInOut"
          }
        }
      },
      whileTap: { scale: 0.95 }
    },
    pulse: {
      whileHover: { 
        scale: [1, currentIntensity.scale, 1],
        transition: { 
          scale: { 
            repeat: Infinity, 
            duration: 1,
            ease: "easeInOut"
          }
        }
      },
      whileTap: { scale: 0.95 }
    },
    shake: {
      whileHover: { 
        x: [-2, 2, -2, 2, 0],
        transition: { 
          x: { 
            repeat: Infinity, 
            duration: 0.5,
            ease: "easeInOut"
          }
        }
      },
      whileTap: { scale: 0.98 }
    },
    flip: {
      whileHover: { 
        rotateY: 180,
        transition: { duration: 0.6, ease: "easeInOut" }
      },
      whileTap: { scale: 0.98 }
    },
    magnetic: {
      whileHover: { 
        scale: currentIntensity.scale,
        transition: { type: "spring", stiffness: 300, damping: 10 }
      },
      whileTap: { scale: 0.95 }
    }
  };

  const selectedEffect = effects[effect] || effects.lift;

  const handleMouseEnter = () => {
    if (!disabled) setIsActive(true);
  };

  const handleMouseLeave = () => {
    if (!disabled) setIsActive(false);
  };

  const accessibleProps = getAnimationProps(selectedEffect);

  if (disabled) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...accessibleProps}
      {...props}
    >
      {children}
      <AnimatePresence>
        {isActive && effect === 'ripple' && (
          <motion.div
            className="absolute inset-0 rounded-full bg-white opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MicroInteraction;
