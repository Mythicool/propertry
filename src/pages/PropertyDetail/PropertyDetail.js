import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../../data/properties';

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const foundProperty = getPropertyById(id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      navigate('/properties');
    }
  }, [id, navigate]);

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

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your interest! Paula will contact you soon.');
    setShowContactForm(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  if (!property) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  return (
    <div className="property-detail">
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="nav nav--breadcrumb" aria-label="Breadcrumb">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/" className="nav__link">Home</Link>
              </li>
              <li className="nav__item">
                <Link to="/properties" className="nav__link">Properties</Link>
              </li>
              <li className="nav__item">
                <span className="nav__link active">{property.address}</span>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Property Header */}
      <section className="property-header">
        <div className="container">
          <div className="property-header__content">
            <div className="property-header__info">
              <h1 className="property-header__address">{property.address}</h1>
              <div className="property-header__price">{formatPrice(property.price)}</div>
              <div className="property-header__features">
                <span className="feature">
                  <i className="fas fa-bed" aria-hidden="true"></i>
                  {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
                </span>
                <span className="feature">
                  <i className="fas fa-bath" aria-hidden="true"></i>
                  {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
                </span>
                <span className="feature">
                  <i className="fas fa-ruler-combined" aria-hidden="true"></i>
                  {formatSquareFeet(property.squareFeet)} sqft
                </span>
                <span className="feature">
                  <i className="fas fa-calendar" aria-hidden="true"></i>
                  Built {property.yearBuilt}
                </span>
              </div>
              <div className="property-header__status">
                <span className={`status-badge status-badge--${property.status.toLowerCase()}`}>
                  {property.status}
                </span>
                <span className="mls-number">MLS # {property.mlsNumber}</span>
              </div>
            </div>
            
            <div className="property-header__actions">
              <button 
                className="btn btn--primary btn--lg"
                onClick={() => setShowContactForm(true)}
              >
                <i className="fas fa-envelope" aria-hidden="true"></i>
                Contact Paula
              </button>
              <a href="tel:(405) 771-0707" className="btn btn--outline btn--lg">
                <i className="fas fa-phone" aria-hidden="true"></i>
                Call Now
              </a>
              <button className="btn btn--ghost btn--lg">
                <i className="fas fa-heart" aria-hidden="true"></i>
                Save
              </button>
              <button className="btn btn--ghost btn--lg">
                <i className="fas fa-share-alt" aria-hidden="true"></i>
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <section className="property-gallery">
        <div className="container">
          <div className="gallery">
            <div className="gallery__main">
              <img
                src={property.images[currentImageIndex]}
                alt={`${property.address} - View ${currentImageIndex + 1}`}
                className="gallery__main-image"
              />
              
              <button
                className="gallery__nav gallery__nav--prev"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <i className="fas fa-chevron-left" aria-hidden="true"></i>
              </button>
              
              <button
                className="gallery__nav gallery__nav--next"
                onClick={nextImage}
                aria-label="Next image"
              >
                <i className="fas fa-chevron-right" aria-hidden="true"></i>
              </button>
              
              <div className="gallery__counter">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>
            
            <div className="gallery__thumbnails">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  className={`gallery__thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleImageChange(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="property-details section">
        <div className="container">
          <div className="property-details__content">
            <div className="property-details__main">
              <div className="property-description">
                <h2>Property Description</h2>
                <p>{property.description}</p>
              </div>

              <div className="property-features">
                <h3>Property Features</h3>
                <div className="features-grid">
                  {property.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <i className="fas fa-check text-primary" aria-hidden="true"></i>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="property-specs">
                <h3>Property Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Property Type</span>
                    <span className="spec-value">{property.propertyType}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Year Built</span>
                    <span className="spec-value">{property.yearBuilt}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Lot Size</span>
                    <span className="spec-value">{property.lotSize} acres</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Days on Market</span>
                    <span className="spec-value">{property.daysOnMarket} days</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Neighborhood</span>
                    <span className="spec-value">{property.neighborhood}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">MLS Number</span>
                    <span className="spec-value">{property.mlsNumber}</span>
                  </div>
                </div>
              </div>

              {property.schools && (
                <div className="property-schools">
                  <h3>School Information</h3>
                  <div className="schools-grid">
                    <div className="school-item">
                      <i className="fas fa-school text-primary" aria-hidden="true"></i>
                      <div>
                        <div className="school-level">Elementary</div>
                        <div className="school-name">{property.schools.elementary}</div>
                      </div>
                    </div>
                    <div className="school-item">
                      <i className="fas fa-school text-primary" aria-hidden="true"></i>
                      <div>
                        <div className="school-level">Middle School</div>
                        <div className="school-name">{property.schools.middle}</div>
                      </div>
                    </div>
                    <div className="school-item">
                      <i className="fas fa-graduation-cap text-primary" aria-hidden="true"></i>
                      <div>
                        <div className="school-level">High School</div>
                        <div className="school-name">{property.schools.high}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="property-details__sidebar">
              <div className="contact-card card">
                <div className="card__content">
                  <div className="agent-info">
                    <img 
                      src="/images/paula-wilson.jpg" 
                      alt="Paula Wilson" 
                      className="agent-photo"
                    />
                    <div>
                      <h4>Paula Wilson</h4>
                      <p>REALTOR®</p>
                      <div className="agent-contact">
                        <a href="tel:(405) 771-0707" className="contact-link">
                          <i className="fas fa-phone" aria-hidden="true"></i>
                          (405) 771-0707
                        </a>
                        <a href="mailto:paula@paulawilsonrealty.com" className="contact-link">
                          <i className="fas fa-envelope" aria-hidden="true"></i>
                          paula@paulawilsonrealty.com
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="btn btn--primary btn--full"
                    onClick={() => setShowContactForm(true)}
                  >
                    Request Information
                  </button>
                  
                  <button className="btn btn--outline btn--full">
                    Schedule Showing
                  </button>
                </div>
              </div>

              <div className="mortgage-calculator card">
                <div className="card__content">
                  <h4>Mortgage Calculator</h4>
                  <div className="calculator-result">
                    <div className="monthly-payment">
                      <span className="label">Est. Monthly Payment</span>
                      <span className="amount">${Math.round(property.price * 0.005).toLocaleString()}</span>
                    </div>
                    <p className="calculator-note">
                      *Estimate based on 20% down payment at 7% interest rate
                    </p>
                  </div>
                  <Link to="/contact" className="btn btn--outline btn--full">
                    Get Pre-Approved
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactForm && (
        <div className="modal-overlay" onClick={() => setShowContactForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3>Contact Paula About This Property</h3>
              <button 
                className="modal__close"
                onClick={() => setShowContactForm(false)}
                aria-label="Close modal"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
            
            <form className="modal__content" onSubmit={handleFormSubmit}>
              <div className="form__group">
                <label htmlFor="name" className="form__label">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form__input"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="form__group">
                <label htmlFor="email" className="form__label">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form__input"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="form__group">
                <label htmlFor="phone" className="form__label">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form__input"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="form__group">
                <label htmlFor="message" className="form__label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form__textarea"
                  rows="4"
                  placeholder={`I'm interested in ${property.address}. Please contact me with more information.`}
                  value={formData.message}
                  onChange={handleFormChange}
                ></textarea>
              </div>
              
              <div className="form__actions">
                <button type="submit" className="btn btn--primary">
                  Send Message
                </button>
                <button 
                  type="button" 
                  className="btn btn--ghost"
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;
