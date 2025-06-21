import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { MicroInteraction } from '../Animation';
import { useAccessibility } from '../Accessibility/AccessibilityProvider';

const AccessibleButton = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ariaLabel,
  ariaDescribedBy,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const { announceToScreenReader } = useAccessibility();

  const variants = {
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    outline: 'btn--outline',
    ghost: 'btn--ghost',
    danger: 'btn--danger',
    success: 'btn--success'
  };

  const sizes = {
    small: 'btn--sm',
    medium: 'btn--md',
    large: 'btn--lg'
  };

  const handleClick = (event) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }

    // Announce action to screen readers
    if (ariaLabel) {
      announceToScreenReader(`${ariaLabel} activated`);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const buttonClasses = [
    'btn',
    variants[variant],
    sizes[size],
    fullWidth && 'btn--full',
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    className
  ].filter(Boolean).join(' ');

  const loadingSpinner = (
    <motion.div
      className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
  );

  const buttonContent = (
    <>
      {loading && iconPosition === 'left' && loadingSpinner}
      {icon && !loading && iconPosition === 'left' && (
        <i className={`${icon} mr-2`} aria-hidden="true" />
      )}
      
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
      
      {icon && !loading && iconPosition === 'right' && (
        <i className={`${icon} ml-2`} aria-hidden="true" />
      )}
      {loading && iconPosition === 'right' && loadingSpinner}
      
      {loading && (
        <span className="sr-only">Loading...</span>
      )}
    </>
  );

  return (
    <MicroInteraction
      effect="lift"
      intensity="medium"
      disabled={disabled || loading}
    >
      <motion.button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled || loading}
        whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        {...props}
      >
        {buttonContent}
      </motion.button>
    </MicroInteraction>
  );
});

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;
