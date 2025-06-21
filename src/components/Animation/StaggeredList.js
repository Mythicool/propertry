import React from 'react';
import { motion } from 'framer-motion';
import { useStaggerAnimation } from '../../hooks/useAnimation';

const StaggeredList = ({ 
  children, 
  className = '', 
  delay = 0.1,
  duration = 0.5,
  animation = 'fadeInUp',
  ...props 
}) => {
  const childrenArray = React.Children.toArray(children);
  const { ref, getStaggerProps } = useStaggerAnimation(childrenArray, delay);

  const animations = {
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 }
    },
    fadeInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    }
  };

  const selectedAnimation = animations[animation] || animations.fadeInUp;

  return (
    <div ref={ref} className={className} {...props}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={selectedAnimation.initial}
          animate={getStaggerProps(index).animate}
          transition={{
            duration,
            delay: index * delay,
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default StaggeredList;
