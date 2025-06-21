import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyImage } from '../UI';

function PropertyCard({ property, featured = false, variant = 'default' }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFeet = (sqft) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const getCardClasses = () => {
    let classes = 'card card--property';
    if (featured) classes += ' card--featured';
    if (variant === 'showcase') classes += ' card--showcase';
    return classes;
  };

  return (
    <motion.article
      className={getCardClasses()}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="card__image">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="w-full h-full"
          >
            <LazyImage
              src={property.images[currentImageIndex]}
              alt={`${property.address} - Image ${currentImageIndex + 1} of ${property.images.length}`}
              className="w-full h-full object-cover"
              fadeInDuration={0.4}
              threshold={0.1}
              rootMargin="100px"
            />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="card__image-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        ></motion.div>

        {property.status && (
          <motion.div
            className={`card__image-badge ${
              property.status === 'Active' ? '' :
              property.status === 'Pending' ? 'card__image-badge--warning' :
              property.status === 'Sold' ? 'card__image-badge--error' : ''
            }`}
            initial={{ opacity: 0, scale: 0, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {property.status}
          </motion.div>
        )}

        <motion.div
          className="card__image-actions"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            className="btn btn--icon"
            onClick={toggleLike}
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              color: isLiked ? '#ef4444' : '#6b7280',
              scale: isLiked ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <i className={`${isLiked ? 'fas' : 'far'} fa-heart`} aria-hidden="true"></i>
          </motion.button>
          <motion.button
            className="btn btn--icon"
            aria-label="Share property"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-share-alt" aria-hidden="true"></i>
          </motion.button>
        </motion.div>

        {property.images.length > 1 && (
          <>
            <motion.button
              className="card__nav card__nav--prev"
              onClick={prevImage}
              aria-label="Previous image"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
            </motion.button>
            <motion.button
              className="card__nav card__nav--next"
              onClick={nextImage}
              aria-label="Next image"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </motion.button>

            <motion.div
              className="card__image-indicators"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {property.images.map((_, index) => (
                <motion.button
                  key={index}
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`View image ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  animate={{
                    scale: index === currentImageIndex ? 1.1 : 1,
                    opacity: index === currentImageIndex ? 1 : 0.6
                  }}
                  transition={{ duration: 0.2 }}
                ></motion.button>
              ))}
            </motion.div>
          </>
        )}
      </div>

      <motion.div
        className="card__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="card__price"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {formatPrice(property.price)}
        </motion.div>

        <motion.div
          className="card__address"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
          {property.address}
        </motion.div>

        <motion.div
          className="card__features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            { icon: 'fa-bed', value: property.bedrooms, label: `bed${property.bedrooms !== 1 ? 's' : ''}` },
            { icon: 'fa-bath', value: property.bathrooms, label: `bath${property.bathrooms !== 1 ? 's' : ''}` },
            { icon: 'fa-ruler-combined', value: formatSquareFeet(property.squareFeet), label: 'sqft' }
          ].map((feature, index) => (
            <motion.div
              key={feature.icon}
              className="card__features-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <i className={`fas ${feature.icon}`} aria-hidden="true"></i>
              <span className="value">{feature.value}</span>
              <span>{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {property.description && (
          <motion.p
            className="card__text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {property.description.length > 120
              ? `${property.description.substring(0, 120)}...`
              : property.description
            }
          </motion.p>
        )}

        <motion.div
          className="card__footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="card__mls">
            MLS # {property.mlsNumber}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/properties/${property.id}`}
              className="btn btn--primary btn--sm"
              aria-label={`View details for ${property.address}`}
            >
              View Details
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default PropertyCard;
