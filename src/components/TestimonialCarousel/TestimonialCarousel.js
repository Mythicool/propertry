import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialCarousel = ({ testimonials, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isPlaying || testimonials.length <= 1) return;

    const timer = setInterval(nextTestimonial, interval);
    return () => clearInterval(timer);
  }, [isPlaying, interval, nextTestimonial, testimonials.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-carousel__container">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextTestimonial();
              } else if (swipe > swipeConfidenceThreshold) {
                prevTestimonial();
              }
            }}
            className="testimonial-carousel__slide"
          >
            <div className="testimonial-card testimonial-card--carousel">
              <motion.div 
                className="testimonial-card__quote"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <i className="fas fa-quote-left"></i>
              </motion.div>
              
              <motion.blockquote 
                className="testimonial-card__text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                "{testimonials[currentIndex].text}"
              </motion.blockquote>
              
              <motion.div 
                className="testimonial-card__rating"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.i 
                    key={i} 
                    className="fas fa-star" 
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  />
                ))}
              </motion.div>
              
              <motion.div 
                className="testimonial-card__author"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].name}
                  className="testimonial-card__avatar"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="testimonial-card__info">
                  <div className="testimonial-card__name">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="testimonial-card__location">
                    {testimonials[currentIndex].location}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <motion.button
          className="testimonial-carousel__nav testimonial-carousel__nav--prev"
          onClick={prevTestimonial}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          aria-label="Previous testimonial"
        >
          <i className="fas fa-chevron-left"></i>
        </motion.button>

        <motion.button
          className="testimonial-carousel__nav testimonial-carousel__nav--next"
          onClick={nextTestimonial}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          aria-label="Next testimonial"
        >
          <i className="fas fa-chevron-right"></i>
        </motion.button>

        {/* Play/Pause Button */}
        {testimonials.length > 1 && (
          <motion.button
            className="testimonial-carousel__play-pause"
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
          >
            <motion.i 
              className={`fas fa-${isPlaying ? 'pause' : 'play'}`}
              animate={{ rotate: isPlaying ? 0 : 360 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        )}
      </div>

      {/* Indicators */}
      {testimonials.length > 1 && (
        <motion.div 
          className="testimonial-carousel__indicators"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              animate={{ 
                scale: index === currentIndex ? 1.2 : 1,
                opacity: index === currentIndex ? 1 : 0.6
              }}
              transition={{ duration: 0.3 }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </motion.div>
      )}

      {/* Progress Bar */}
      {isPlaying && testimonials.length > 1 && (
        <motion.div 
          className="testimonial-carousel__progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <motion.div
            className="testimonial-carousel__progress-bar"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: interval / 1000, 
              ease: "linear",
              repeat: Infinity
            }}
            key={currentIndex}
          />
        </motion.div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
