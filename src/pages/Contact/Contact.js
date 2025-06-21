import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    bestTime: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '', email: '', phone: '', subject: '', message: '',
        preferredContact: 'email', bestTime: ''
      });
    }, 3000);
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="page-header bg-primary text-white">
        <div className="container">
          <div className="page-header__content text-center">
            <h1>Contact Paula Wilson</h1>
            <p>
              Ready to start your real estate journey? I'm here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-card card">
              <div className="card__content text-center">
                <div className="contact-icon">
                  <i className="fas fa-phone text-primary" aria-hidden="true"></i>
                </div>
                <h3>Call Me</h3>
                <p>Ready to talk? Give me a call!</p>
                <a href="tel:(405) 771-0707" className="contact-link">
                  (405) 771-0707
                </a>
                <p className="contact-note">Available 7 days a week</p>
              </div>
            </div>

            <div className="contact-card card">
              <div className="card__content text-center">
                <div className="contact-icon">
                  <i className="fas fa-envelope text-primary" aria-hidden="true"></i>
                </div>
                <h3>Email Me</h3>
                <p>Send me a message anytime</p>
                <a href="mailto:paula@paulawilsonrealty.com" className="contact-link">
                  paula@paulawilsonrealty.com
                </a>
                <p className="contact-note">I respond within 2 hours</p>
              </div>
            </div>

            <div className="contact-card card">
              <div className="card__content text-center">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt text-primary" aria-hidden="true"></i>
                </div>
                <h3>Service Area</h3>
                <p>Proudly serving</p>
                <div className="contact-link">
                  Oklahoma City & Metro Area
                </div>
                <p className="contact-note">Including surrounding communities</p>
              </div>
            </div>

            <div className="contact-card card">
              <div className="card__content text-center">
                <div className="contact-icon">
                  <i className="fas fa-language text-primary" aria-hidden="true"></i>
                </div>
                <h3>Languages</h3>
                <p>Bilingual services available</p>
                <div className="contact-link">
                  English & Spanish
                </div>
                <p className="contact-note">Servicio en español disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section section bg-gray-50">
        <div className="container">
          <div className="contact-form-content">
            <div className="contact-form-header text-center">
              <h2>Send Me a Message</h2>
              <p>
                Have questions about buying or selling? I'd love to hear from you!
              </p>
            </div>

            <div className="contact-form-card card">
              <div className="card__content">
                {isSubmitted ? (
                  <div className="form-success text-center">
                    <div className="success-icon">
                      <i className="fas fa-check-circle text-success" aria-hidden="true"></i>
                    </div>
                    <h3>Message Sent!</h3>
                    <p>
                      Thank you for reaching out! I'll get back to you within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form__group">
                        <label htmlFor="name" className="form__label form__label--required">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form__input"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form__group">
                        <label htmlFor="email" className="form__label form__label--required">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form__input"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form__group">
                        <label htmlFor="phone" className="form__label">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form__input"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form__group">
                        <label htmlFor="subject" className="form__label">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          className="form__select"
                          value={formData.subject}
                          onChange={handleInputChange}
                        >
                          <option value="">Select a topic</option>
                          <option value="buying">Buying a Home</option>
                          <option value="selling">Selling a Home</option>
                          <option value="valuation">Home Valuation</option>
                          <option value="market">Market Information</option>
                          <option value="consultation">Schedule Consultation</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form__group">
                      <label htmlFor="message" className="form__label form__label--required">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form__textarea"
                        rows="5"
                        placeholder="Tell me about your real estate needs..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <div className="form-row">
                      <div className="form__group">
                        <label className="form__label">Preferred Contact Method</label>
                        <div className="radio-group">
                          <div className="form__radio">
                            <input
                              type="radio"
                              id="contact-email"
                              name="preferredContact"
                              value="email"
                              checked={formData.preferredContact === 'email'}
                              onChange={handleInputChange}
                            />
                            <div className="form__radio-indicator"></div>
                            <label htmlFor="contact-email" className="form__radio-label">
                              Email
                            </label>
                          </div>
                          <div className="form__radio">
                            <input
                              type="radio"
                              id="contact-phone"
                              name="preferredContact"
                              value="phone"
                              checked={formData.preferredContact === 'phone'}
                              onChange={handleInputChange}
                            />
                            <div className="form__radio-indicator"></div>
                            <label htmlFor="contact-phone" className="form__radio-label">
                              Phone
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form__group">
                        <label htmlFor="bestTime" className="form__label">
                          Best Time to Contact
                        </label>
                        <select
                          id="bestTime"
                          name="bestTime"
                          className="form__select"
                          value={formData.bestTime}
                          onChange={handleInputChange}
                        >
                          <option value="">Any time</option>
                          <option value="morning">Morning (8am - 12pm)</option>
                          <option value="afternoon">Afternoon (12pm - 5pm)</option>
                          <option value="evening">Evening (5pm - 8pm)</option>
                          <option value="weekend">Weekends</option>
                        </select>
                      </div>
                    </div>

                    <div className="form__actions">
                      <button type="submit" className="btn btn--primary btn--lg">
                        <i className="fas fa-paper-plane" aria-hidden="true"></i>
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Paula Section */}
      <section className="about-paula-section section">
        <div className="container">
          <div className="about-paula-content">
            <div className="about-paula-image">
              <img 
                src="/images/paula-wilson.jpg" 
                alt="Paula Wilson - Professional REALTOR®" 
                className="paula-photo"
              />
            </div>
            
            <div className="about-paula-text">
              <h2>About Paula Wilson</h2>
              <h3 className="text-primary">Your Trusted Oklahoma City REALTOR®</h3>
              
              <p>
                With over 10 years of sales experience and a deep passion for helping people 
                achieve their real estate dreams, I bring dedication, expertise, and personalized 
                service to every transaction.
              </p>
              
              <p>
                As a bilingual REALTOR®, I'm proud to serve both English and Spanish-speaking 
                clients throughout Oklahoma City and the surrounding metro area. Whether you're 
                buying your first home, selling your current property, or investing in real estate, 
                I'm here to guide you through every step of the process.
              </p>

              <div className="paula-credentials">
                <div className="credential">
                  <i className="fas fa-certificate text-primary" aria-hidden="true"></i>
                  <span>Licensed REALTOR®</span>
                </div>
                <div className="credential">
                  <i className="fas fa-award text-primary" aria-hidden="true"></i>
                  <span>10+ Years Experience</span>
                </div>
                <div className="credential">
                  <i className="fas fa-users text-primary" aria-hidden="true"></i>
                  <span>100+ Happy Clients</span>
                </div>
                <div className="credential">
                  <i className="fas fa-language text-primary" aria-hidden="true"></i>
                  <span>Bilingual Service</span>
                </div>
              </div>

              <div className="paula-quote">
                <blockquote>
                  "My goal is to make your real estate experience as smooth and stress-free as possible. 
                  I believe in honest communication, expert guidance, and going above and beyond for my clients."
                </blockquote>
                <cite>- Paula Wilson</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section bg-gray-50">
        <div className="container">
          <div className="section-header text-center">
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about working with Paula</p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3>How quickly do you respond to inquiries?</h3>
              <p>
                I typically respond to emails and messages within 2 hours during business hours, 
                and I'm available by phone 7 days a week for urgent matters.
              </p>
            </div>

            <div className="faq-item">
              <h3>What areas do you serve?</h3>
              <p>
                I serve Oklahoma City and the entire metro area, including Edmond, Norman, 
                Moore, Yukon, Mustang, and surrounding communities.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you offer services in Spanish?</h3>
              <p>
                Yes! I'm fluent in both English and Spanish and can provide all real estate 
                services in either language to better serve my clients.
              </p>
            </div>

            <div className="faq-item">
              <h3>What's your commission rate?</h3>
              <p>
                My commission rates are competitive and negotiable based on the specific 
                circumstances of your transaction. Contact me for a personalized quote.
              </p>
            </div>

            <div className="faq-item">
              <h3>How long does it take to buy/sell a home?</h3>
              <p>
                The timeline varies, but typically it takes 30-45 days to close on a purchase 
                and homes sell within 30-60 days when priced correctly in today's market.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you work with first-time homebuyers?</h3>
              <p>
                Absolutely! I love working with first-time buyers and will guide you through 
                every step of the process, from pre-approval to closing and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section bg-primary text-white">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Get Started?</h2>
            <p>
              Don't wait - the perfect home or buyer could be just around the corner. 
              Let's connect today and make your real estate goals a reality.
            </p>
            <div className="cta-actions">
              <a href="tel:(405) 771-0707" className="btn btn--secondary btn--lg">
                <i className="fas fa-phone" aria-hidden="true"></i>
                Call Now
              </a>
              <a href="/home-valuation" className="btn btn--outline btn--lg">
                Get Home Value
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
