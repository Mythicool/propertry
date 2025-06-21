import React, { useState } from 'react';
import { testimonials } from '../../data/testimonials';

function Testimonials() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (filter === 'all') return true;
    if (filter === 'featured') return testimonial.featured;
    if (filter === 'recent') {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return new Date(testimonial.date) >= sixMonthsAgo;
    }
    return true;
  });

  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="testimonials-page">
      {/* Page Header */}
      <section className="page-header bg-primary text-white">
        <div className="container">
          <div className="page-header__content text-center">
            <h1>Client Testimonials</h1>
            <p>
              Read what my satisfied clients have to say about their real estate experience
            </p>
            <div className="testimonials-stats">
              <div className="stat">
                <div className="stat-number">100+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat">
                <div className="stat-number">5.0</div>
                <div className="stat-label">Average Rating</div>
              </div>
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section section--sm">
        <div className="container">
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="filter" className="filter-label">Show:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="form__select"
              >
                <option value="all">All Reviews</option>
                <option value="featured">Featured Reviews</option>
                <option value="recent">Recent Reviews</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort" className="filter-label">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form__select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-grid-section section">
        <div className="container">
          <div className="testimonials-grid">
            {sortedTestimonials.map(testimonial => (
              <article key={testimonial.id} className="testimonial-card card">
                <div className="card__content">
                  <div className="testimonial-header">
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < testimonial.rating ? 'text-secondary' : 'text-gray-300'}`}
                          aria-hidden="true"
                        ></i>
                      ))}
                    </div>
                    {testimonial.featured && (
                      <span className="featured-badge">
                        <i className="fas fa-star" aria-hidden="true"></i>
                        Featured
                      </span>
                    )}
                  </div>

                  <blockquote className="testimonial-text">
                    "{testimonial.text}"
                  </blockquote>

                  <div className="testimonial-footer">
                    <div className="testimonial-author">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="author-avatar"
                      />
                      <div className="author-info">
                        <div className="author-name">{testimonial.name}</div>
                        <div className="author-location">{testimonial.location}</div>
                        <div className="testimonial-date">{formatDate(testimonial.date)}</div>
                      </div>
                    </div>

                    {testimonial.propertyAddress && (
                      <div className="property-info">
                        <i className="fas fa-home text-primary" aria-hidden="true"></i>
                        <span className="property-address">{testimonial.propertyAddress}</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {sortedTestimonials.length === 0 && (
            <div className="no-results">
              <div className="no-results__content">
                <i className="fas fa-comments no-results__icon" aria-hidden="true"></i>
                <h3>No Reviews Found</h3>
                <p>No testimonials match your current filter criteria.</p>
                <button 
                  className="btn btn--primary"
                  onClick={() => setFilter('all')}
                >
                  Show All Reviews
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section bg-gray-50">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Join My Happy Clients?</h2>
            <p>
              Experience the same exceptional service that has earned me these wonderful reviews. 
              Let's make your real estate dreams a reality.
            </p>
            <div className="cta-actions">
              <a href="/contact" className="btn btn--primary btn--lg">
                Start Your Journey
              </a>
              <a href="tel:(405) 771-0707" className="btn btn--outline btn--lg">
                <i className="fas fa-phone" aria-hidden="true"></i>
                Call Paula
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="review-form-section section">
        <div className="container">
          <div className="review-form-content">
            <div className="review-form-header text-center">
              <h2>Share Your Experience</h2>
              <p>
                Have you worked with Paula? We'd love to hear about your experience!
              </p>
            </div>

            <div className="review-form-card card">
              <div className="card__content">
                <form className="review-form">
                  <div className="form__group">
                    <label htmlFor="reviewName" className="form__label">Your Name *</label>
                    <input
                      type="text"
                      id="reviewName"
                      name="name"
                      className="form__input"
                      required
                    />
                  </div>

                  <div className="form__group">
                    <label htmlFor="reviewEmail" className="form__label">Email Address *</label>
                    <input
                      type="email"
                      id="reviewEmail"
                      name="email"
                      className="form__input"
                      required
                    />
                  </div>

                  <div className="form__group">
                    <label htmlFor="reviewLocation" className="form__label">Location</label>
                    <input
                      type="text"
                      id="reviewLocation"
                      name="location"
                      className="form__input"
                      placeholder="City, State"
                    />
                  </div>

                  <div className="form__group">
                    <label className="form__label">Rating *</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          className="rating-star"
                          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                        >
                          <i className="far fa-star" aria-hidden="true"></i>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form__group">
                    <label htmlFor="reviewText" className="form__label">Your Review *</label>
                    <textarea
                      id="reviewText"
                      name="review"
                      className="form__textarea"
                      rows="5"
                      placeholder="Tell us about your experience working with Paula..."
                      required
                    ></textarea>
                  </div>

                  <div className="form__group">
                    <label htmlFor="propertyAddress" className="form__label">Property Address (Optional)</label>
                    <input
                      type="text"
                      id="propertyAddress"
                      name="propertyAddress"
                      className="form__input"
                      placeholder="Address of property Paula helped you with"
                    />
                  </div>

                  <div className="form__actions">
                    <button type="submit" className="btn btn--primary btn--lg">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
