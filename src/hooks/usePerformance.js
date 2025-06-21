import { useEffect, useRef, useState, useCallback } from 'react';

// Hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrame = useRef(null);

  useEffect(() => {
    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime.current + 1000) {
        const currentFPS = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
        setFps(currentFPS);
        setIsLowPerformance(currentFPS < 30);
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationFrame.current = requestAnimationFrame(measureFPS);
    };

    animationFrame.current = requestAnimationFrame(measureFPS);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return { fps, isLowPerformance };
};

// Hook for debouncing values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for throttling functions
export const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

// Hook for optimized scroll handling
export const useOptimizedScroll = (callback, options = {}) => {
  const { throttle = 16, passive = true } = options;
  const throttledCallback = useThrottle(callback, throttle);

  useEffect(() => {
    const handleScroll = (e) => {
      throttledCallback(e);
    };

    window.addEventListener('scroll', handleScroll, { passive });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [throttledCallback, passive]);
};

// Hook for intersection observer with performance optimizations
export const useOptimizedIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState([]);
  const observer = useRef(null);
  const elements = useRef(new Set());

  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    freezeOnceVisible = false
  } = options;

  const observe = useCallback((element) => {
    if (!element || elements.current.has(element)) return;

    elements.current.add(element);
    
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (observedEntries) => {
          setEntries(observedEntries);
          
          if (freezeOnceVisible) {
            observedEntries.forEach((entry) => {
              if (entry.isIntersecting) {
                observer.current?.unobserve(entry.target);
                elements.current.delete(entry.target);
              }
            });
          }
        },
        { threshold, rootMargin, root }
      );
    }

    observer.current.observe(element);
  }, [threshold, rootMargin, root, freezeOnceVisible]);

  const unobserve = useCallback((element) => {
    if (observer.current && element) {
      observer.current.unobserve(element);
      elements.current.delete(element);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
      elements.current.clear();
    }
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { entries, observe, unobserve, disconnect };
};

// Hook for reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

// Hook for device capabilities detection
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    hasTouch: false,
    supportsWebP: false,
    supportsAvif: false,
    connectionSpeed: 'unknown'
  });

  useEffect(() => {
    const checkCapabilities = async () => {
      // Device type detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(navigator.userAgent);
      const isDesktop = !isMobile && !isTablet;

      // Touch support
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Image format support
      const supportsWebP = await checkImageSupport('webp');
      const supportsAvif = await checkImageSupport('avif');

      // Connection speed
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const connectionSpeed = connection ? connection.effectiveType : 'unknown';

      setCapabilities({
        isMobile,
        isTablet,
        isDesktop,
        hasTouch,
        supportsWebP,
        supportsAvif,
        connectionSpeed
      });
    };

    checkCapabilities();
  }, []);

  return capabilities;
};

// Helper function to check image format support
const checkImageSupport = (format) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    
    const testImages = {
      webp: 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA',
      avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
    };
    
    img.src = testImages[format];
  });
};

// Hook for memory usage monitoring
export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = useState(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        setMemoryInfo({
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};
