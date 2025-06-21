import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return path !== '/' && location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Properties' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/home-valuation', label: 'Home Valuation' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <ul className="nav__list">
        {navItems.map((item, index) => (
          <motion.li
            key={item.path}
            className="nav__item"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              to={item.path}
              className={`nav__link ${isActive(item.path) ? 'active' : ''}`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              <motion.span
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>
              {isActive(item.path) && (
                <motion.div
                  className="nav__link-indicator"
                  layoutId="activeIndicator"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
