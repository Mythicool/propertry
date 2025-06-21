import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  className = '',
  containerClassName = '',
  loadingClassName = '',
  errorClassName = '',
  fadeInDuration = 0.5,
  threshold = 0.1,
  rootMargin = '50px',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isInView && src && !isLoaded && !hasError) {
      setIsLoading(true);
      
      const img = new Image();
      
      img.onload = () => {
        setIsLoaded(true);
        setIsLoading(false);
        if (onLoad) onLoad();
      };
      
      img.onerror = () => {
        setHasError(true);
        setIsLoading(false);
        if (onError) onError();
      };
      
      img.src = src;
    }
  }, [isInView, src, isLoaded, hasError, onLoad, onError]);

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: fadeInDuration,
        ease: "easeOut"
      }
    }
  };

  const placeholderVariants = {
    visible: { opacity: 1 },
    hidden: { 
      opacity: 0,
      transition: { 
        duration: fadeInDuration / 2,
        ease: "easeOut"
      }
    }
  };

  const shimmerVariants = {
    animate: {
      x: ['-100%', '100%'],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Placeholder/Loading State */}
      {(!isLoaded || isLoading) && !hasError && (
        <motion.div
          className={`absolute inset-0 ${loadingClassName}`}
          variants={placeholderVariants}
          initial="visible"
          animate={isLoaded ? "hidden" : "visible"}
        >
          <img
            src={placeholder}
            alt=""
            className={`w-full h-full object-cover ${className}`}
            aria-hidden="true"
          />
          
          {/* Shimmer effect */}
          {isLoading && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          )}
        </motion.div>
      )}

      {/* Error State */}
      {hasError && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${errorClassName}`}>
          <div className="text-center text-gray-500">
            <i className="fas fa-image text-2xl mb-2" />
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {isLoaded && !hasError && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          {...props}
        />
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          Loading...
        </div>
      )}
    </div>
  );
};

export default LazyImage;
