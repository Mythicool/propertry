import React from 'react';
import { motion } from 'framer-motion';
import './FeaturedProperties.scss';

const FeaturedProperties = () => {
  // Sample property data
  const featuredProperties = [
    {
      id: 1,
      title: "Modern Downtown Loft",
      price: "$485,000",
      address: "123 Main St, Oklahoma City, OK",
      beds: 2,
      baths: 2,
      sqft: "1,250",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Stunning modern loft in the heart of downtown with floor-to-ceiling windows and premium finishes.",
      mls: "MLS# 12345"
    },
    {
      id: 2,
      title: "Luxury Family Home",
      price: "$675,000",
      address: "456 Oak Avenue, Edmond, OK",
      beds: 4,
      baths: 3,
      sqft: "2,800",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Beautiful family home with spacious rooms, gourmet kitchen, and private backyard oasis.",
      mls: "MLS# 67890"
    },
    {
      id: 3,
      title: "Contemporary Townhouse",
      price: "$395,000",
      address: "789 Elm Street, Norman, OK",
      beds: 3,
      baths: 2.5,
      sqft: "1,850",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Stylish townhouse with modern amenities, open floor plan, and convenient location.",
      mls: "MLS# 11223"
    }
  ];

  return (
    <section className="featured-properties">
      <div className="container">
        <div className="featured-properties-showcase">
          <motion.div
            className="showcase-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="showcase-header__content">
              <motion.div
                className="showcase-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <i className="fas fa-star" aria-hidden="true"></i>
                <span>Featured Properties</span>
              </motion.div>
              
              <motion.h2
                className="showcase-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Exceptional Homes in 
                <span className="showcase-title__highlight"> Oklahoma City</span>
              </motion.h2>
              
              <motion.p
                className="showcase-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Handpicked properties in the most desirable neighborhoods, 
                each offering unique charm and modern amenities
              </motion.p>
            </div>
            
            <motion.div
              className="showcase-stats"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="stat-item">
                <span className="stat-number">{featuredProperties.length}</span>
                <span className="stat-label">Featured</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15</span>
                <span className="stat-label">Avg Days</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="showcase-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                className="showcase-property"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.7 + index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="showcase-footer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <div className="showcase-footer__content">
              <div className="showcase-footer__text">
                <h3>Ready to Find Your Dream Home?</h3>
                <p>Explore our complete collection of properties or let me help you find the perfect match</p>
              </div>
              <div className="showcase-footer__actions">
                <button className="btn btn--primary">
                  <i className="fas fa-search" aria-hidden="true"></i>
                  Browse All Properties
                </button>
                <button className="btn btn--outline">
                  <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                  Schedule Consultation
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Property Card Component
const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-card__image">
        <img src={property.image} alt={property.title} />
        <div className="property-card__badge">Featured</div>
      </div>
      
      <div className="property-card__content">
        <div className="property-card__price">{property.price}</div>
        <h3 className="property-card__title">{property.title}</h3>
        <div className="property-card__address">
          <i className="fas fa-map-marker-alt"></i>
          {property.address}
        </div>
        
        <div className="property-card__features">
          <div className="feature-item">
            <i className="fas fa-bed"></i>
            <span className="value">{property.beds}</span>
            <span className="label">Beds</span>
          </div>
          <div className="feature-item">
            <i className="fas fa-bath"></i>
            <span className="value">{property.baths}</span>
            <span className="label">Baths</span>
          </div>
          <div className="feature-item">
            <i className="fas fa-ruler-combined"></i>
            <span className="value">{property.sqft}</span>
            <span className="label">Sq Ft</span>
          </div>
        </div>
        
        <p className="property-card__description">{property.description}</p>
        
        <div className="property-card__footer">
          <span className="property-card__mls">{property.mls}</span>
          <button className="btn btn--primary btn--sm">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
