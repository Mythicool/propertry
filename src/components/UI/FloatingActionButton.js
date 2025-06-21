import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicroInteraction } from '../Animation';

const FloatingActionButton = ({
  actions = [],
  mainIcon = 'fas fa-plus',
  position = 'bottom-right',
  size = 'medium',
  color = 'primary',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const sizes = {
    small: 'w-12 h-12',
    medium: 'w-14 h-14',
    large: 'w-16 h-16'
  };

  const colors = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    accent: 'bg-accent-color hover:bg-accent-dark text-white',
    white: 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg'
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action) => {
    if (action.onClick) {
      action.onClick();
    }
    setIsOpen(false);
  };

  const containerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const actionVariants = {
    hidden: { scale: 0, opacity: 0, y: 20 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }),
    exit: { scale: 0, opacity: 0, y: 20 }
  };

  const mainButtonVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 ${positions[position]} ${className}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          {...props}
        >
          {/* Action Items */}
          <AnimatePresence>
            {isOpen && actions.length > 0 && (
              <motion.div
                className="flex flex-col-reverse items-center space-y-reverse space-y-3 mb-3"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {actions.map((action, index) => (
                  <motion.div
                    key={action.id || index}
                    custom={index}
                    variants={actionVariants}
                    className="relative group"
                  >
                    <MicroInteraction
                      effect="lift"
                      intensity="medium"
                      className={`
                        ${sizes[size]} 
                        ${colors[color]}
                        rounded-full 
                        shadow-lg 
                        flex 
                        items-center 
                        justify-center 
                        cursor-pointer
                        transition-all
                        duration-300
                      `}
                      onClick={() => handleActionClick(action)}
                    >
                      <i className={action.icon} />
                    </MicroInteraction>
                    
                    {/* Tooltip */}
                    {action.label && (
                      <motion.div
                        className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 
                                   bg-gray-900 text-white text-sm px-3 py-1 rounded-lg 
                                   whitespace-nowrap opacity-0 group-hover:opacity-100 
                                   transition-opacity duration-300 pointer-events-none"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 0, x: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {action.label}
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 
                                        border-4 border-transparent border-l-gray-900" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <MicroInteraction
            effect="lift"
            intensity="strong"
            className={`
              ${sizes[size]} 
              ${colors[color]}
              rounded-full 
              shadow-xl 
              flex 
              items-center 
              justify-center 
              cursor-pointer
              transition-all
              duration-300
              relative
              overflow-hidden
            `}
            onClick={toggleMenu}
          >
            <motion.i
              className={mainIcon}
              variants={mainButtonVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ scale: 0, opacity: 0.3 }}
              animate={{ scale: isOpen ? 1.5 : 0, opacity: isOpen ? 0 : 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </MicroInteraction>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;
