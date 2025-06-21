import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ 
  variant = 'text', 
  width = '100%', 
  height = '1rem',
  className = '',
  count = 1,
  ...props 
}) => {
  const skeletonVariants = {
    text: {
      height: '1rem',
      borderRadius: '0.25rem'
    },
    title: {
      height: '2rem',
      borderRadius: '0.25rem'
    },
    avatar: {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%'
    },
    card: {
      height: '12rem',
      borderRadius: '0.75rem'
    },
    image: {
      height: '8rem',
      borderRadius: '0.5rem'
    },
    button: {
      height: '2.5rem',
      borderRadius: '0.375rem'
    }
  };

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { x: '100%' }
  };

  const getSkeletonStyle = () => ({
    width,
    height: variant === 'avatar' ? skeletonVariants[variant].width : height,
    ...skeletonVariants[variant]
  });

  const renderSkeleton = (index) => (
    <motion.div
      key={index}
      className={`skeleton-loader ${className}`}
      style={getSkeletonStyle()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      {...props}
    >
      <motion.div
        className="skeleton-loader__shimmer"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );

  return (
    <div className="skeleton-loader-container">
      {Array.from({ length: count }, (_, index) => renderSkeleton(index))}
    </div>
  );
};

// Predefined skeleton components
export const SkeletonText = (props) => (
  <SkeletonLoader variant="text" {...props} />
);

export const SkeletonTitle = (props) => (
  <SkeletonLoader variant="title" {...props} />
);

export const SkeletonAvatar = (props) => (
  <SkeletonLoader variant="avatar" {...props} />
);

export const SkeletonCard = (props) => (
  <SkeletonLoader variant="card" {...props} />
);

export const SkeletonImage = (props) => (
  <SkeletonLoader variant="image" {...props} />
);

export const SkeletonButton = (props) => (
  <SkeletonLoader variant="button" {...props} />
);

// Property Card Skeleton
export const PropertyCardSkeleton = () => (
  <div className="skeleton-property-card">
    <SkeletonImage height="200px" />
    <div className="skeleton-property-card__content">
      <SkeletonTitle width="60%" />
      <SkeletonText width="80%" />
      <SkeletonText width="40%" />
      <div className="skeleton-property-card__features">
        <SkeletonText width="30%" />
        <SkeletonText width="30%" />
        <SkeletonText width="30%" />
      </div>
      <SkeletonButton width="40%" />
    </div>
  </div>
);

export default SkeletonLoader;
