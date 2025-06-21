import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Properties from './pages/Properties/Properties';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import Testimonials from './pages/Testimonials/Testimonials';
import HomeValuation from './pages/HomeValuation/HomeValuation';
import Contact from './pages/Contact/Contact';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import ScrollToTopButton from './components/ScrollToTop/ScrollToTopButton';
import AccessibilityProvider from './components/Accessibility/AccessibilityProvider';
import SkipLink from './components/Accessibility/SkipLink';
import { FloatingActionButton } from './components/UI';

function App() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut"
  };

  return (
    <AccessibilityProvider>
      <div className="App">
        <SkipLink href="#main-content" />
        <ScrollToTop />
        <ScrollProgress />
        <Header />

        <motion.main
          id="main-content"
          className="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Home />
              </motion.div>
            } />
            <Route path="/properties" element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Properties />
              </motion.div>
            } />
            <Route path="/properties/:id" element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <PropertyDetail />
              </motion.div>
            } />
            <Route path="/testimonials" element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Testimonials />
              </motion.div>
            } />
            <Route path="/home-valuation" element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <HomeValuation />
              </motion.div>
            } />
            <Route path="/contact" element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Contact />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </motion.main>

      <Footer />
      <ScrollToTopButton />

      {/* Floating Action Button with quick actions */}
      <FloatingActionButton
        actions={[
          {
            id: 'call',
            icon: 'fas fa-phone',
            label: 'Call Paula',
            onClick: () => window.location.href = 'tel:(405) 771-0707'
          },
          {
            id: 'email',
            icon: 'fas fa-envelope',
            label: 'Send Email',
            onClick: () => window.location.href = 'mailto:paula@paulawilsonrealty.com'
          },
          {
            id: 'schedule',
            icon: 'fas fa-calendar',
            label: 'Schedule Meeting',
            onClick: () => window.location.href = '#contact'
          },
          {
            id: 'valuation',
            icon: 'fas fa-home',
            label: 'Home Valuation',
            onClick: () => window.location.href = '/home-valuation'
          }
        ]}
        mainIcon="fas fa-headset"
        position="bottom-right"
        size="medium"
        color="primary"
      />
      </div>
    </AccessibilityProvider>
  );
}

export default App;
