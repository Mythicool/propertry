import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Custom hook for scroll-triggered animations
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
    duration = 0.6,
    ...restOptions
  } = options;

  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    ...restOptions
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  return {
    ref,
    isVisible,
    inView,
    animationProps: {
      initial: { opacity: 0, y: 50 },
      animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
      transition: { duration, ease: "easeOut" }
    }
  };
};

// Custom hook for staggered animations
export const useStaggerAnimation = (items = [], delay = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const getStaggerProps = (index) => ({
    initial: { opacity: 0, y: 30 },
    animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: {
      duration: 0.5,
      delay: index * delay,
      ease: "easeOut"
    }
  });

  return { ref, isVisible, getStaggerProps };
};

// Custom hook for hover animations
export const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    whileHover: { scale: 1.05, y: -5 },
    transition: { duration: 0.3, ease: "easeOut" }
  };

  return { isHovered, hoverProps };
};

// Custom hook for parallax effect
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

// Custom hook for typing animation
export const useTypingAnimation = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

// Custom hook for counter animation
export const useCounterAnimation = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      let startTime = null;
      
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * (end - start) + start));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, isVisible, end, duration, start]);

  return { ref, count };
};
