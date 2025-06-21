import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../Navigation/Navigation';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.header
        className={`header ${isScrolled ? 'header--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="header__container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/" className="header__logo" aria-label="Paula Wilson Realty - Home">
              <motion.img
                src="/images/lime-logo.png"
                alt="Lime Realty Logo"
                width="120"
                height="48"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="header__logo-text">
                <div className="name">Paula Wilson</div>
                <div className="title">REALTOR®</div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            className="header__nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Navigation />
          </motion.div>

          <motion.div
            className="header__contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href="tel:(405) 771-0707"
              className="header__contact-phone"
              aria-label="Call Paula Wilson at (405) 771-0707"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-phone" aria-hidden="true"></i>
              (405) 771-0707
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn--primary btn--sm header__contact-email"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Email Me
            </motion.a>
          </motion.div>

          <motion.button
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.i
              className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}
              aria-hidden="true"
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            ></motion.i>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="header__mobile-menu active"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="header__mobile-menu-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="logo">
                <motion.i
                  className="fas fa-home"
                  aria-hidden="true"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                ></motion.i>
                Paula Wilson
              </div>
              <motion.button
                className="close"
                onClick={toggleMobileMenu}
                aria-label="Close mobile menu"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </motion.button>
            </motion.div>

            <motion.nav
              className="header__mobile-menu-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {[
                { to: "/", label: "Home" },
                { to: "/properties", label: "Properties" },
                { to: "/testimonials", label: "Testimonials" },
                { to: "/home-valuation", label: "Home Valuation" },
                { to: "/contact", label: "Contact" }
              ].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              className="header__mobile-menu-contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <motion.a
                href="tel:(405) 771-0707"
                className="contact-item"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-phone" aria-hidden="true"></i>
                <div>
                  <div className="label">Call Now</div>
                  <div>(405) 771-0707</div>
                </div>
              </motion.a>
              <motion.a
                href="mailto:paula@paulawilsonrealty.com"
                className="contact-item"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <div>
                  <div className="label">Email</div>
                  <div>paula@paulawilsonrealty.com</div>
                </div>
              </motion.a>
              <motion.div
                className="contact-item"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <i className="fas fa-language" aria-hidden="true"></i>
                <div>
                  <div className="label">Languages</div>
                  <div>English & Spanish</div>
                </div>
              </motion.div>
              <motion.button
                className="btn btn--primary btn--full"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                Schedule Consultation
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="header__backdrop active"
            onClick={toggleMobileMenu}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
