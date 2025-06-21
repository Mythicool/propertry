import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const FloatingElement = ({ 
  icon, 
  variant, 
  position, 
  delay = 0,
  onHover,
  onClick 
}) => {
  const controls = useAnimation();
  const elementRef = useRef(null);

  // Initialize animation
  React.useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      y: 0
    });
  }, [controls]);

  const handleMouseEnter = () => {
    controls.start({
      scale: 1.4,
      rotate: 15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    });

    // Create particle effect
    createParticles();
    
    if (onHover) onHover();
  };

  const handleMouseLeave = () => {
    controls.start({
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    });
  };

  const handleClick = () => {
    // Trigger burst animation
    controls.start({
      scale: [1.4, 1.6, 1.4],
      rotate: [15, 25, 15],
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    });

    if (onClick) onClick();
  };

  const createParticles = () => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create multiple particle elements
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${centerX}px;
        top: ${centerY}px;
      `;

      document.body.appendChild(particle);

      // Animate particle
      const angle = (i * 60) * (Math.PI / 180);
      const distance = 50 + Math.random() * 30;
      const endX = centerX + Math.cos(angle) * distance;
      const endY = centerY + Math.sin(angle) * distance;

      particle.animate([
        {
          transform: 'translate(0, 0) scale(1)',
          opacity: 1
        },
        {
          transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => {
        document.body.removeChild(particle);
      };
    }
  };

  return (
    <motion.div
      ref={elementRef}
      className={`floating-element floating-element--${variant}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom
      }}
      initial={{ 
        opacity: 0, 
        scale: 0,
        y: 20
      }}
      animate={controls}
      transition={{
        duration: 0.8,
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        scale: 1.4,
        rotate: 15,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <i className={icon} aria-hidden="true"></i>
    </motion.div>
  );
};

const FloatingElements = () => {
  const elements = [
    {
      icon: 'fas fa-heart',
      variant: '1',
      position: { top: '20%', right: '15%' },
      delay: 0.5
    },
    {
      icon: 'fas fa-key',
      variant: '2', 
      position: { top: '60%', left: '10%' },
      delay: 1.0
    },
    {
      icon: 'fas fa-home',
      variant: '3',
      position: { top: '30%', left: '20%' },
      delay: 1.5
    }
  ];

  return (
    <div className="hero__floating-elements">
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          icon={element.icon}
          variant={element.variant}
          position={element.position}
          delay={element.delay}
          onHover={() => {
            // Optional: Add sound effect or haptic feedback
            console.log(`Floating element ${element.variant} hovered`);
          }}
          onClick={() => {
            // Optional: Add click interaction
            console.log(`Floating element ${element.variant} clicked`);
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
