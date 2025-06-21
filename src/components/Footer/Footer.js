import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate newsletter subscription
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__content">
          {/* Brand Section */}
          <div className="footer__brand">
            <div className="logo">
              <img 
                src="/images/lime-logo.png" 
                alt="Lime Realty Logo" 
                width="120" 
                height="48"
              />
              <div className="logo-text">
                <div className="name">Paula Wilson</div>
                <div className="title">REALTOR®</div>
              </div>
            </div>
            
            <p className="description">
              Experienced bilingual REALTOR® serving Oklahoma City and surrounding areas. 
              Dedicated to providing exceptional service and helping you find your dream home.
            </p>

            <div className="contact-info">
              <a href="tel:(405) 771-0707" className="contact-item">
                <i className="fas fa-phone" aria-hidden="true"></i>
                <div>
                  <div className="label">Phone</div>
                  <div>(405) 771-0707</div>
                </div>
              </a>
              
              <a href="mailto:paula@paulawilsonrealty.com" className="contact-item">
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <div>
                  <div className="label">Email</div>
                  <div>paula@paulawilsonrealty.com</div>
                </div>
              </a>
              
              <div className="contact-item">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <div>
                  <div className="label">Serving</div>
                  <div>Oklahoma City & Metro</div>
                </div>
              </div>
              
              <div className="contact-item">
                <i className="fas fa-language" aria-hidden="true"></i>
                <div>
                  <div className="label">Languages</div>
                  <div>English & Spanish</div>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a 
                href="https://facebook.com/paulawilsonrealty" 
                className="social-link social-link--facebook"
                aria-label="Follow Paula Wilson on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f" aria-hidden="true"></i>
              </a>
              <a 
                href="https://instagram.com/paulawilsonrealty" 
                className="social-link social-link--instagram"
                aria-label="Follow Paula Wilson on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>
              <a 
                href="https://linkedin.com/in/paulawilsonrealty" 
                className="social-link social-link--linkedin"
                aria-label="Connect with Paula Wilson on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__links">
            <h3 className="footer__title">Quick Links</h3>
            <nav className="footer__nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/properties" className="nav-link">Browse Properties</Link>
              <Link to="/testimonials" className="nav-link">Client Reviews</Link>
              <Link to="/home-valuation" className="nav-link">Home Valuation</Link>
              <Link to="/contact" className="nav-link">Contact Paula</Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="footer__newsletter">
            <h3 className="footer__title">Stay Updated</h3>
            <p className="newsletter-text">
              Get the latest market updates and new listings delivered to your inbox.
            </p>
            
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="form__input-group">
                <input
                  type="email"
                  className="form__input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter"
                />
              </div>
              <button 
                type="submit" 
                className="btn btn--secondary btn--full"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>
                    <i className="fas fa-check" aria-hidden="true"></i>
                    Subscribed!
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer__bottom">
        <div className="footer__container">
          <div className="copyright">
            © {currentYear} Paula Wilson Realty. All rights reserved. 
            Powered by <a href="https://tribus.com" target="_blank" rel="noopener noreferrer">TRIBUS</a>
          </div>
          
          <div className="footer__legal">
            <a href="/privacy" className="legal-link">Privacy Policy</a>
            <a href="/terms" className="legal-link">Terms of Service</a>
            <a href="/accessibility" className="legal-link">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
