import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.scss';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Hero content slides for dynamic content
  const heroSlides = [
    {
      title: "Find Your Dream Home in",
      highlight: "Oklahoma City",
      subtitle: "With Paula Wilson, your trusted real estate expert",
      description: "Experience personalized service, local expertise, and proven results in Oklahoma City's most desirable neighborhoods.",
      cta: "Browse Properties",
      stats: { homes: "500+", experience: "15+", satisfaction: "98%" }
    },
    {
      title: "Luxury Living Awaits in",
      highlight: "Premier Locations",
      subtitle: "Discover exceptional properties with Paula Wilson",
      description: "From modern downtown lofts to elegant family estates, find the perfect home that matches your lifestyle and dreams.",
      cta: "View Luxury Homes",
      stats: { luxury: "150+", avgDays: "12", clients: "1000+" }
    },
    {
      title: "Your Real Estate Journey",
      highlight: "Starts Here",
      subtitle: "Expert guidance every step of the way",
      description: "Whether buying your first home or selling your current one, Paula Wilson provides the expertise and support you need.",
      cta: "Schedule Consultation",
      stats: { sold: "300+", rating: "5.0", years: "15+" }
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const currentContent = heroSlides[currentSlide];

  return (
    <section className="hero section--hero" id="home">
      {/* Animated Background Elements */}
      <div className="hero__background">
        <motion.div 
          className="hero__bg-element hero__bg-element--1"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="hero__bg-element hero__bg-element--2"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="hero__bg-element hero__bg-element--3"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Parallax Container */}
      <motion.div className="hero__parallax" style={{ y, opacity }}>
        <div className="container">
          <div className="hero__content">
            {/* Main Content */}
            <motion.div 
              className="hero__main"
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                className="hero__badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <i className="fas fa-award" aria-hidden="true"></i>
                <span>Oklahoma City's Premier Realtor</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="hero__title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {currentContent.title}
                <span className="hero__title-highlight"> {currentContent.highlight}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="hero__subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {currentContent.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                className="hero__description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {currentContent.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="hero__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="btn btn--primary btn--xl hero__cta-primary">
                  <i className="fas fa-search" aria-hidden="true"></i>
                  {currentContent.cta}
                </button>
                <button className="btn btn--secondary btn--xl hero__cta-secondary">
                  <i className="fas fa-phone" aria-hidden="true"></i>
                  Call Paula
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="hero__stats"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {Object.entries(currentContent.stats).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="hero__stat"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <span className="hero__stat-number">{value}</span>
                    <span className="hero__stat-label">
                      {key === 'homes' && 'Homes Sold'}
                      {key === 'experience' && 'Years Experience'}
                      {key === 'satisfaction' && 'Client Satisfaction'}
                      {key === 'luxury' && 'Luxury Properties'}
                      {key === 'avgDays' && 'Avg Days on Market'}
                      {key === 'clients' && 'Happy Clients'}
                      {key === 'sold' && 'Properties Sold'}
                      {key === 'rating' && 'Average Rating'}
                      {key === 'years' && 'Years in Business'}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Side Image/Visual */}
            <motion.div
              className="hero__visual"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="hero__image-container">
                <motion.img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Beautiful Oklahoma City home"
                  className="hero__image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="hero__image-overlay">
                  <motion.div
                    className="hero__floating-card"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <i className="fas fa-home"></i>
                    <span>Dream Home Awaits</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <motion.div
            className="hero__indicators"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero__indicator ${index === currentSlide ? 'hero__indicator--active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="sr-only">Slide {index + 1}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="hero__scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <i className="fas fa-chevron-down" aria-hidden="true"></i>
        </motion.div>
        <span>Discover More</span>
      </motion.div>
    </section>
  );
};

export default Hero;
