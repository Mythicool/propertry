import React from 'react';
import { motion } from 'framer-motion';
import { useCounterAnimation } from '../../hooks/useAnimation';

const AnimatedCounter = ({ 
  end, 
  start = 0, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = '',
  ...props 
}) => {
  const { ref, count } = useCounterAnimation(end, duration, start);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...props}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.div>
  );
};

export default AnimatedCounter;
