import React, { createContext, useContext, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/usePerformance';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: false
  });

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check for reduced motion preference
    setPreferences(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion
    }));
  }, [prefersReducedMotion]);

  useEffect(() => {
    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const handleHighContrastChange = (e) => {
      setPreferences(prev => ({
        ...prev,
        highContrast: e.matches
      }));
    };

    setPreferences(prev => ({
      ...prev,
      highContrast: highContrastQuery.matches
    }));

    highContrastQuery.addEventListener('change', handleHighContrastChange);

    return () => {
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
    };
  }, []);

  useEffect(() => {
    // Detect screen reader usage
    const detectScreenReader = () => {
      const isScreenReader = 
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver') ||
        window.speechSynthesis ||
        document.querySelector('[aria-live]') !== null;

      setPreferences(prev => ({
        ...prev,
        screenReader: isScreenReader
      }));
    };

    detectScreenReader();
  }, []);

  useEffect(() => {
    // Detect keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setPreferences(prev => ({
          ...prev,
          keyboardNavigation: true
        }));
        document.removeEventListener('keydown', handleKeyDown);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Apply accessibility classes to body
  useEffect(() => {
    const body = document.body;
    
    body.classList.toggle('reduced-motion', preferences.reducedMotion);
    body.classList.toggle('high-contrast', preferences.highContrast);
    body.classList.toggle('large-text', preferences.largeText);
    body.classList.toggle('screen-reader', preferences.screenReader);
    body.classList.toggle('keyboard-navigation', preferences.keyboardNavigation);
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getAnimationProps = (defaultProps = {}) => {
    if (preferences.reducedMotion) {
      return {
        ...defaultProps,
        initial: false,
        animate: false,
        exit: false,
        transition: { duration: 0 }
      };
    }
    return defaultProps;
  };

  const value = {
    preferences,
    updatePreference,
    getAnimationProps,
    isReducedMotion: preferences.reducedMotion,
    isHighContrast: preferences.highContrast,
    isScreenReader: preferences.screenReader,
    isKeyboardNavigation: preferences.keyboardNavigation
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityProvider;
