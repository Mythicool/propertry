import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LazyImage = ({
  src,
  alt,
  placeholder = '/images/placeholder.jpg',
  className = '',
  width,
  height,
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const currentImg = imgRef.current;
    
    if (!currentImg || isInView) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observerRef.current.observe(currentImg);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isInView]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const placeholderVariants = {
    visible: { opacity: 1 },
    hidden: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div 
      ref={imgRef}
      className={`lazy-image ${className}`}
      style={{ width, height }}
      {...props}
    >
      {/* Placeholder */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            className="lazy-image__placeholder"
            variants={placeholderVariants}
            initial="visible"
            exit="hidden"
          >
            <div className="lazy-image__skeleton">
              <motion.div
                className="lazy-image__shimmer"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Image */}
      {isInView && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          className={`lazy-image__image ${isLoaded ? 'loaded' : ''}`}
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          width={width}
          height={height}
        />
      )}

      {/* Error State */}
      {hasError && (
        <motion.div
          className="lazy-image__error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <i className="fas fa-image" />
          <span>Failed to load image</span>
        </motion.div>
      )}
    </div>
  );
};

export default LazyImage;
