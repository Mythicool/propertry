import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ isLoading = true, text = 'Loading...' }) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.3 }
    }
  };

  const progressVariants = {
    initial: { width: '0%' },
    animate: { 
      width: '100%',
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="page-loader"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <div className="page-loader__content">
            <motion.div
              className="page-loader__logo"
              variants={logoVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="page-loader__spinner"
                variants={spinnerVariants}
                animate="animate"
              >
                <i className="fas fa-home"></i>
              </motion.div>
            </motion.div>

            <motion.h2
              className="page-loader__text"
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              {text}
            </motion.h2>

            <motion.div
              className="page-loader__progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                className="page-loader__progress-bar"
                variants={progressVariants}
                initial="initial"
                animate="animate"
              />
            </motion.div>

            <motion.div
              className="page-loader__dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="page-loader__dot"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
