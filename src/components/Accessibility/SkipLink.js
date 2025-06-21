import React from 'react';
import { motion } from 'framer-motion';

const SkipLink = ({ href = '#main-content', children = 'Skip to main content' }) => {
  return (
    <motion.a
      href={href}
      className="skip-link"
      initial={{ y: -100, opacity: 0 }}
      whileFocus={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
};

export default SkipLink;
