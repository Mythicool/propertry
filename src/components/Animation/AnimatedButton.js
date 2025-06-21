import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  as: Component = 'button',
  ...props
}) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    loading: {
      scale: [1, 1.05, 1],
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };



  const getClassName = () => {
    let classes = `btn btn--${variant} btn--${size}`;
    if (className) classes += ` ${className}`;
    if (loading) classes += ' btn--loading';
    return classes;
  };

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      className={getClassName()}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : "initial"}
      whileTap={!disabled && !loading ? "tap" : "initial"}
      animate={loading ? "loading" : "initial"}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      <motion.span className="btn__content">
        {children}
      </motion.span>
      
      {loading && (
        <motion.div
          className="btn__spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <i className="fas fa-spinner" />
        </motion.div>
      )}
    </MotionComponent>
  );
};

export default AnimatedButton;
