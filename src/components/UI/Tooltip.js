import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const Tooltip = ({
  children,
  content,
  position = 'top',
  trigger = 'hover',
  delay = 300,
  className = '',
  contentClassName = '',
  arrow = true,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    let x, y;

    switch (position) {
      case 'top':
        x = triggerRect.left + scrollX + triggerRect.width / 2;
        y = triggerRect.top + scrollY - 10;
        break;
      case 'bottom':
        x = triggerRect.left + scrollX + triggerRect.width / 2;
        y = triggerRect.bottom + scrollY + 10;
        break;
      case 'left':
        x = triggerRect.left + scrollX - 10;
        y = triggerRect.top + scrollY + triggerRect.height / 2;
        break;
      case 'right':
        x = triggerRect.right + scrollX + 10;
        y = triggerRect.top + scrollY + triggerRect.height / 2;
        break;
      default:
        x = triggerRect.left + scrollX + triggerRect.width / 2;
        y = triggerRect.top + scrollY - 10;
    }

    setTooltipPosition({ x, y });
  };

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      calculatePosition();
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      hideTooltip();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    const handleResize = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    const handleClickOutside = (event) => {
      if (trigger === 'click' &&
          tooltipRef.current &&
          !tooltipRef.current.contains(event.target) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target)) {
        hideTooltip();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, trigger, calculatePosition]);

  const getTransformOrigin = () => {
    switch (position) {
      case 'top':
        return 'bottom center';
      case 'bottom':
        return 'top center';
      case 'left':
        return 'right center';
      case 'right':
        return 'left center';
      default:
        return 'bottom center';
    }
  };

  const getArrowClasses = () => {
    const baseClasses = 'absolute w-0 h-0 border-solid';
    
    switch (position) {
      case 'top':
        return `${baseClasses} border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900 top-full left-1/2 transform -translate-x-1/2`;
      case 'bottom':
        return `${baseClasses} border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900 bottom-full left-1/2 transform -translate-x-1/2`;
      case 'left':
        return `${baseClasses} border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-900 left-full top-1/2 transform -translate-y-1/2`;
      case 'right':
        return `${baseClasses} border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-900 right-full top-1/2 transform -translate-y-1/2`;
      default:
        return `${baseClasses} border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900 top-full left-1/2 transform -translate-x-1/2`;
    }
  };

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transformOrigin: getTransformOrigin()
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.15 }
    }
  };

  const tooltip = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          className={`
            fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg
            max-w-xs pointer-events-none select-none
            ${contentClassName}
          `}
          style={{
            left: position === 'left' ? tooltipPosition.x - (tooltipRef.current?.offsetWidth || 0) : 
                  position === 'right' ? tooltipPosition.x : 
                  tooltipPosition.x - (tooltipRef.current?.offsetWidth || 0) / 2,
            top: position === 'top' ? tooltipPosition.y - (tooltipRef.current?.offsetHeight || 0) : 
                 position === 'bottom' ? tooltipPosition.y : 
                 tooltipPosition.y - (tooltipRef.current?.offsetHeight || 0) / 2,
          }}
          variants={tooltipVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {content}
          {arrow && <div className={getArrowClasses()} />}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {children}
      </div>
      {createPortal(tooltip, document.body)}
    </>
  );
};

export default Tooltip;
