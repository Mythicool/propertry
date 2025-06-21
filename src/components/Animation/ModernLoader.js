import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../Accessibility/AccessibilityProvider';

const ModernLoader = ({
  type = 'dots',
  size = 'medium',
  color = 'primary',
  className = '',
  ...props
}) => {
  const { getAnimationProps } = useAccessibility();

  const sizes = {
    small: { container: 'w-8 h-8', dot: 'w-2 h-2' },
    medium: { container: 'w-12 h-12', dot: 'w-3 h-3' },
    large: { container: 'w-16 h-16', dot: 'w-4 h-4' }
  };

  const colors = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    accent: 'bg-accent-color',
    white: 'bg-white',
    gray: 'bg-gray-500'
  };

  const currentSize = sizes[size] || sizes.medium;
  const currentColor = colors[color] || colors.primary;

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const spinVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const waveVariants = {
    animate: {
      scaleY: [1, 2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const morphVariants = {
    animate: {
      borderRadius: ["20%", "50%", "20%"],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const renderLoader = () => {
    const accessibleProps = getAnimationProps({});

    switch (type) {
      case 'dots':
        return (
          <motion.div
            className={`flex space-x-1 ${currentSize.container}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            {...accessibleProps}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className={`${currentSize.dot} ${currentColor} rounded-full`}
                variants={dotVariants}
              />
            ))}
          </motion.div>
        );

      case 'pulse':
        return (
          <motion.div
            className={`${currentSize.container} ${currentColor} rounded-full`}
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            {...accessibleProps}
          />
        );

      case 'spin':
        return (
          <motion.div
            className={`${currentSize.container} border-4 border-gray-200 border-t-primary-500 rounded-full`}
            variants={spinVariants}
            initial="initial"
            animate="animate"
            {...accessibleProps}
          />
        );

      case 'wave':
        return (
          <motion.div
            className={`flex items-end space-x-1 ${currentSize.container}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            {...accessibleProps}
          >
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className={`w-1 h-8 ${currentColor} rounded-full`}
                variants={waveVariants}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </motion.div>
        );

      case 'morph':
        return (
          <motion.div
            className={`${currentSize.container} ${currentColor}`}
            variants={morphVariants}
            initial="initial"
            animate="animate"
            {...accessibleProps}
          />
        );

      case 'gradient':
        return (
          <motion.div
            className={`${currentSize.container} rounded-full bg-gradient-to-r from-primary-400 to-secondary-400`}
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            {...accessibleProps}
          />
        );

      default:
        return renderLoader();
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      {renderLoader()}
    </div>
  );
};

export default ModernLoader;
