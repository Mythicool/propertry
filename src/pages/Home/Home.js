import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import SearchForm from '../../components/SearchForm/SearchForm';
import { getFeaturedProperties } from '../../data/properties';
import { getFeaturedTestimonials } from '../../data/testimonials';
import {
  AnimatedSection,
  StaggeredList,
  AnimatedCounter,
  ParallaxElement,
  AnimatedButton,
  FloatingElements
} from '../../components/Animation';
import TestimonialCarousel from '../../components/TestimonialCarousel/TestimonialCarousel';

function Home() {
  const navigate = useNavigate();
  const featuredProperties = getFeaturedProperties();
  const featuredTestimonials = getFeaturedTestimonials();

  const handleSearch = (filters) => {
    // Navigate to properties page with filters
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value);
      }
    });
    navigate(`/properties?${searchParams.toString()}`);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <ParallaxElement speed={0.5} className="hero__background">
          <motion.img
            src="/images/hero-bg.jpg"
            alt="Beautiful Oklahoma City home"
            className="hero__image"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.div
            className="hero__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </ParallaxElement>

        {/* Enhanced Floating Elements */}
        <FloatingElements />

        <div className="hero__content">
          <div className="container">
            <motion.div
              className="hero__text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h1
                className="hero__title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Find Your Dream Home in
                </motion.span>
                <motion.span
                  className="text-primary gradient-text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {" "}Oklahoma City
                </motion.span>
              </motion.h1>

              <motion.p
                className="hero__subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                Experienced bilingual REALTOR® with 10+ years of sales experience.
                Let me help you navigate the Oklahoma City real estate market with confidence.
              </motion.p>

              {/* Animated Statistics */}
              <motion.div
                className="hero__stats"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.div
                  className="hero__stat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <AnimatedCounter
                    end={150}
                    duration={2000}
                    className="hero__stat-number"
                  />
                  <span className="hero__stat-label">Homes Sold</span>
                </motion.div>
                <motion.div
                  className="hero__stat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <AnimatedCounter
                    end={10}
                    duration={2000}
                    suffix="+"
                    className="hero__stat-number"
                  />
                  <span className="hero__stat-label">Years Experience</span>
                </motion.div>
                <motion.div
                  className="hero__stat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  <AnimatedCounter
                    end={98}
                    duration={2000}
                    suffix="%"
                    className="hero__stat-number"
                  />
                  <span className="hero__stat-label">Client Satisfaction</span>
                </motion.div>
              </motion.div>

              <motion.div
                className="hero__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.0 }}
              >
                <AnimatedButton
                  as={Link}
                  to="/properties"
                  variant="primary"
                  size="lg"
                  className="hero__btn"
                >
                  <i className="fas fa-search" aria-hidden="true"></i>
                  Browse Properties
                </AnimatedButton>
                <AnimatedButton
                  as={Link}
                  to="/home-valuation"
                  variant="outline"
                  size="lg"
                  className="hero__btn"
                >
                  <i className="fas fa-calculator" aria-hidden="true"></i>
                  Get Home Value
                </AnimatedButton>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="hero__trust-indicators"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
              >
                <div className="trust-item">
                  <i className="fas fa-award" aria-hidden="true"></i>
                  <span>Licensed REALTOR®</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-language" aria-hidden="true"></i>
                  <span>English & Spanish</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-handshake" aria-hidden="true"></i>
                  <span>Trusted by 150+ Families</span>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="hero__quick-links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
              >
                <Link to="/testimonials" className="quick-link">
                  <i className="fas fa-star" aria-hidden="true"></i>
                  Client Reviews
                </Link>
                <Link to="/contact" className="quick-link">
                  <i className="fas fa-calendar" aria-hidden="true"></i>
                  Schedule Meeting
                </Link>
                <a href="tel:(405) 771-0707" className="quick-link">
                  <i className="fas fa-phone" aria-hidden="true"></i>
                  Call Now
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <i className="fas fa-chevron-down"></i>
          </motion.div>
        </motion.div>
      </section>

      {/* Search Section */}
      <AnimatedSection className="search-section section--sm" animation="fadeInUp" delay={0.2}>
        <div className="container">
          <div className="hero-adjacent-card">
            <div className="search-section__content">
              <motion.h2
                className="text-center mb-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Start Your Property Search
              </motion.h2>
              <motion.div
                className="search-section__form"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <SearchForm onSearch={handleSearch} />
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* About Paula Section */}
      <AnimatedSection className="about-section section" animation="fadeInUp">
        <div className="container">
          <div className="section-card">
            <div className="about-section__content">
            <motion.div
              className="about-section__image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.img
                src="/images/paula-wilson.jpg"
                alt="Paula Wilson - Professional REALTOR®"
                className="about-section__photo"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="about-section__badge"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <i className="fas fa-award" aria-hidden="true"></i>
                <span>10+ Years Experience</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="about-section__text"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Meet Paula Wilson
              </motion.h2>
              <motion.h3
                className="text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Your Trusted Oklahoma City REALTOR®
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                With over 10 years of sales experience and deep roots in Oklahoma City,
                I bring a unique combination of market expertise and personal dedication
                to every real estate transaction.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                As a bilingual REALTOR®, I'm proud to serve both English and Spanish-speaking
                clients, ensuring clear communication throughout your home buying or selling journey.
              </motion.p>

              <StaggeredList className="about-section__highlights" delay={0.1}>
                <div className="highlight">
                  <i className="fas fa-home text-primary" aria-hidden="true"></i>
                  <div>
                    <h4>Local Expert</h4>
                    <p>Born and raised in Oklahoma City</p>
                  </div>
                </div>

                <div className="highlight">
                  <i className="fas fa-language text-primary" aria-hidden="true"></i>
                  <div>
                    <h4>Bilingual Service</h4>
                    <p>Fluent in English and Spanish</p>
                  </div>
                </div>

                <div className="highlight">
                  <i className="fas fa-handshake text-primary" aria-hidden="true"></i>
                  <div>
                    <h4>Proven Results</h4>
                    <p>10+ years of successful transactions</p>
                  </div>
                </div>
              </StaggeredList>

              <motion.div
                className="about-section__actions"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <AnimatedButton as={Link} to="/contact" variant="primary">
                  Work With Paula
                </AnimatedButton>
                <AnimatedButton as="a" href="tel:(405) 771-0707" variant="outline">
                  <i className="fas fa-phone" aria-hidden="true"></i>
                  (405) 771-0707
                </AnimatedButton>
              </motion.div>
            </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Properties Section */}
      <AnimatedSection className="featured-properties section" animation="fadeInUp">
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
                  <PropertyCard
                    property={property}
                    featured={true}
                    variant="showcase"
                  />
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
                  <AnimatedButton as={Link} to="/properties" variant="primary" size="lg">
                    <i className="fas fa-search" aria-hidden="true"></i>
                    Browse All Properties
                  </AnimatedButton>
                  <AnimatedButton as={Link} to="/contact" variant="outline" size="lg">
                    <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                    Schedule Consultation
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="services section" animation="fadeInUp">
        <div className="container">
          <div className="section-card">
            <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>How I Can Help You</h2>
            <p className="section-subtitle">
              Comprehensive real estate services tailored to your needs
            </p>
          </motion.div>

          <StaggeredList className="services-grid" delay={0.2}>
            <motion.div
              className="service-card"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="service-card__icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className="fas fa-search-plus" aria-hidden="true"></i>
              </motion.div>
              <h3>Home Buying</h3>
              <p>
                Find your perfect home with personalized search assistance,
                market analysis, and expert negotiation to get the best deal.
              </p>
              <Link to="/properties" className="service-card__link">
                Start Your Search
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </motion.div>

            <motion.div
              className="service-card"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="service-card__icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className="fas fa-home" aria-hidden="true"></i>
              </motion.div>
              <h3>Home Selling</h3>
              <p>
                Maximize your home's value with professional marketing,
                strategic pricing, and proven selling strategies.
              </p>
              <Link to="/home-valuation" className="service-card__link">
                Get Home Value
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </motion.div>

            <motion.div
              className="service-card"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="service-card__icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className="fas fa-calculator" aria-hidden="true"></i>
              </motion.div>
              <h3>Market Analysis</h3>
              <p>
                Get detailed market insights and property valuations
                to make informed real estate decisions.
              </p>
              <Link to="/contact" className="service-card__link">
                Request Analysis
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </motion.div>
          </StaggeredList>
          </div>
        </div>
      </AnimatedSection>

      {/* Statistics Section */}
      <AnimatedSection className="stats-section section bg-primary text-white" animation="fadeInUp">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Proven Track Record</h2>
            <p className="section-subtitle">
              Numbers that speak to my commitment and success
            </p>
          </motion.div>

          <StaggeredList className="stats-grid" delay={0.2}>
            <div className="stat-card">
              <motion.div
                className="stat-card__icon"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className="fas fa-home"></i>
              </motion.div>
              <AnimatedCounter end={150} suffix="+" className="stat-card__number" />
              <p className="stat-card__label">Homes Sold</p>
            </div>

            <div className="stat-card">
              <motion.div
                className="stat-card__icon"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className="fas fa-users"></i>
              </motion.div>
              <AnimatedCounter end={200} suffix="+" className="stat-card__number" />
              <p className="stat-card__label">Happy Clients</p>
            </div>

            <div className="stat-card">
              <motion.div
                className="stat-card__icon"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className="fas fa-award"></i>
              </motion.div>
              <AnimatedCounter end={10} suffix="+" className="stat-card__number" />
              <p className="stat-card__label">Years Experience</p>
            </div>

            <div className="stat-card">
              <motion.div
                className="stat-card__icon"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className="fas fa-star"></i>
              </motion.div>
              <AnimatedCounter end={98} suffix="%" className="stat-card__number" />
              <p className="stat-card__label">Client Satisfaction</p>
            </div>
          </StaggeredList>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="testimonials section" animation="fadeInUp">
        <div className="container">
          <div className="section-card">
            <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>What My Clients Say</h2>
            <p className="section-subtitle">
              Real experiences from satisfied homebuyers and sellers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <TestimonialCarousel
              testimonials={featuredTestimonials}
              autoPlay={true}
              interval={6000}
            />
          </motion.div>

          <motion.div
            className="text-center mt-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatedButton as={Link} to="/testimonials" variant="outline" size="lg">
              Read More Reviews
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </AnimatedButton>
          </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="cta-section section bg-primary text-white" animation="fadeInUp">
        <div className="container">
          <motion.div
            className="cta-section__content text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Make Your Move?
            </motion.h2>
            <motion.p
              className="cta-section__text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Whether you're buying your first home or selling your current one,
              I'm here to guide you through every step of the process.
            </motion.p>
            <motion.div
              className="cta-section__actions"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <AnimatedButton as={Link} to="/contact" variant="secondary" size="lg">
                Schedule Consultation
              </AnimatedButton>
              <AnimatedButton as="a" href="tel:(405) 771-0707" variant="outline" size="lg">
                <i className="fas fa-phone" aria-hidden="true"></i>
                Call Now
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default Home;
