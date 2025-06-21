import React from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

const ParallaxElement = ({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'up',
  ...props 
}) => {
  const { scrollY } = useViewportScroll();
  
  // Create transforms based on direction and speed
  const yTransform = useTransform(scrollY, [0, 1000], [0, direction === 'up' ? -speed * 100 : speed * 100]);
  const xTransform = useTransform(scrollY, [0, 1000], [0, direction === 'left' ? -speed * 100 : speed * 100]);

  const getStyle = () => {
    if (direction === 'left' || direction === 'right') {
      return { x: xTransform };
    }
    return { y: yTransform };
  };

  return (
    <motion.div
      className={className}
      style={getStyle()}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxElement;
