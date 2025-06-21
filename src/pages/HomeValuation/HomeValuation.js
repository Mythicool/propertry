import React, { useState } from 'react';

function HomeValuation() {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: 'OK',
    zipCode: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    yearBuilt: '',
    lotSize: '',
    condition: '',
    name: '',
    email: '',
    phone: '',
    timeframe: '',
    additionalInfo: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.address && formData.city && formData.zipCode;
      case 2:
        return formData.propertyType && formData.bedrooms && formData.bathrooms;
      case 3:
        return formData.name && formData.email;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="home-valuation-page">
        <section className="success-section section">
          <div className="container">
            <div className="success-content text-center">
              <div className="success-icon">
                <i className="fas fa-check-circle text-success" aria-hidden="true"></i>
              </div>
              <h1>Thank You!</h1>
              <p className="success-message">
                Your home valuation request has been submitted successfully. 
                Paula will analyze your property and contact you within 24 hours with a detailed market analysis.
              </p>
              <div className="success-actions">
                <button 
                  className="btn btn--primary btn--lg"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData({
                      address: '', city: '', state: 'OK', zipCode: '', propertyType: '',
                      bedrooms: '', bathrooms: '', squareFeet: '', yearBuilt: '', lotSize: '',
                      condition: '', name: '', email: '', phone: '', timeframe: '', additionalInfo: ''
                    });
                  }}
                >
                  Submit Another Request
                </button>
                <a href="/contact" className="btn btn--outline btn--lg">
                  Contact Paula Directly
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="home-valuation-page">
      {/* Page Header */}
      <section className="page-header bg-primary text-white">
        <div className="container">
          <div className="page-header__content text-center">
            <h1>Free Home Valuation</h1>
            <p>
              Get an accurate estimate of your home's current market value from an experienced local REALTOR®
            </p>
            <div className="valuation-benefits">
              <div className="benefit">
                <i className="fas fa-chart-line" aria-hidden="true"></i>
                <span>Current Market Analysis</span>
              </div>
              <div className="benefit">
                <i className="fas fa-clock" aria-hidden="true"></i>
                <span>24-Hour Response</span>
              </div>
              <div className="benefit">
                <i className="fas fa-user-check" aria-hidden="true"></i>
                <span>Local Expert</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation Form */}
      <section className="valuation-form-section section">
        <div className="container">
          <div className="valuation-form-content">
            {/* Progress Indicator */}
            <div className="progress-indicator">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
              <div className="progress-steps">
                {[1, 2, 3].map(step => (
                  <div 
                    key={step}
                    className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                  >
                    <div className="step-number">
                      {currentStep > step ? (
                        <i className="fas fa-check" aria-hidden="true"></i>
                      ) : (
                        step
                      )}
                    </div>
                    <div className="step-label">
                      {step === 1 && 'Property Details'}
                      {step === 2 && 'Property Features'}
                      {step === 3 && 'Contact Information'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="valuation-form-card card">
              <div className="card__content">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Property Details */}
                  {currentStep === 1 && (
                    <div className="form-step">
                      <h2>Property Location</h2>
                      <p>Tell us about your property's location</p>

                      <div className="form__group">
                        <label htmlFor="address" className="form__label form__label--required">
                          Property Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form__input"
                          placeholder="123 Main Street"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form__group">
                          <label htmlFor="city" className="form__label form__label--required">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            className="form__input"
                            placeholder="Oklahoma City"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="form__group">
                          <label htmlFor="state" className="form__label">
                            State
                          </label>
                          <select
                            id="state"
                            name="state"
                            className="form__select"
                            value={formData.state}
                            onChange={handleInputChange}
                          >
                            <option value="OK">Oklahoma</option>
                            <option value="TX">Texas</option>
                            <option value="KS">Kansas</option>
                            <option value="AR">Arkansas</option>
                          </select>
                        </div>

                        <div className="form__group">
                          <label htmlFor="zipCode" className="form__label form__label--required">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            className="form__input"
                            placeholder="73120"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Property Features */}
                  {currentStep === 2 && (
                    <div className="form-step">
                      <h2>Property Features</h2>
                      <p>Help us understand your property's characteristics</p>

                      <div className="form__group">
                        <label htmlFor="propertyType" className="form__label form__label--required">
                          Property Type
                        </label>
                        <select
                          id="propertyType"
                          name="propertyType"
                          className="form__select"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Property Type</option>
                          <option value="Single Family">Single Family Home</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Condo">Condominium</option>
                          <option value="Multi Family">Multi-Family</option>
                          <option value="Vacant Land">Vacant Land</option>
                        </select>
                      </div>

                      <div className="form-row">
                        <div className="form__group">
                          <label htmlFor="bedrooms" className="form__label form__label--required">
                            Bedrooms
                          </label>
                          <select
                            id="bedrooms"
                            name="bedrooms"
                            className="form__select"
                            value={formData.bedrooms}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5+</option>
                          </select>
                        </div>

                        <div className="form__group">
                          <label htmlFor="bathrooms" className="form__label form__label--required">
                            Bathrooms
                          </label>
                          <select
                            id="bathrooms"
                            name="bathrooms"
                            className="form__select"
                            value={formData.bathrooms}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4+</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form__group">
                          <label htmlFor="squareFeet" className="form__label">
                            Square Feet
                          </label>
                          <input
                            type="number"
                            id="squareFeet"
                            name="squareFeet"
                            className="form__input"
                            placeholder="2000"
                            value={formData.squareFeet}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form__group">
                          <label htmlFor="yearBuilt" className="form__label">
                            Year Built
                          </label>
                          <input
                            type="number"
                            id="yearBuilt"
                            name="yearBuilt"
                            className="form__input"
                            placeholder="2010"
                            min="1800"
                            max={new Date().getFullYear()}
                            value={formData.yearBuilt}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form__group">
                          <label htmlFor="lotSize" className="form__label">
                            Lot Size (acres)
                          </label>
                          <input
                            type="number"
                            id="lotSize"
                            name="lotSize"
                            className="form__input"
                            placeholder="0.25"
                            step="0.01"
                            value={formData.lotSize}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form__group">
                          <label htmlFor="condition" className="form__label">
                            Property Condition
                          </label>
                          <select
                            id="condition"
                            name="condition"
                            className="form__select"
                            value={formData.condition}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Condition</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Needs Work">Needs Work</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact Information */}
                  {currentStep === 3 && (
                    <div className="form-step">
                      <h2>Contact Information</h2>
                      <p>How can Paula reach you with your home valuation?</p>

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
                            placeholder="John Smith"
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
                            placeholder="john@example.com"
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
                            placeholder="(405) 555-0123"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form__group">
                          <label htmlFor="timeframe" className="form__label">
                            Selling Timeframe
                          </label>
                          <select
                            id="timeframe"
                            name="timeframe"
                            className="form__select"
                            value={formData.timeframe}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Timeframe</option>
                            <option value="Immediately">Immediately</option>
                            <option value="1-3 months">1-3 months</option>
                            <option value="3-6 months">3-6 months</option>
                            <option value="6-12 months">6-12 months</option>
                            <option value="Just curious">Just curious</option>
                          </select>
                        </div>
                      </div>

                      <div className="form__group">
                        <label htmlFor="additionalInfo" className="form__label">
                          Additional Information
                        </label>
                        <textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          className="form__textarea"
                          rows="4"
                          placeholder="Any additional details about your property or specific questions..."
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* Form Navigation */}
                  <div className="form-navigation">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        className="btn btn--outline"
                        onClick={handlePrevStep}
                      >
                        <i className="fas fa-chevron-left" aria-hidden="true"></i>
                        Previous
                      </button>
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        className="btn btn--primary"
                        onClick={handleNextStep}
                        disabled={!isStepValid(currentStep)}
                      >
                        Next
                        <i className="fas fa-chevron-right" aria-hidden="true"></i>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn--primary"
                        disabled={!isStepValid(currentStep)}
                      >
                        Get My Home Value
                        <i className="fas fa-paper-plane" aria-hidden="true"></i>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Paula Section */}
      <section className="why-choose-section section bg-gray-50">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Choose Paula for Your Home Valuation?</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-bar text-primary" aria-hidden="true"></i>
              </div>
              <h3>Accurate Market Analysis</h3>
              <p>
                Comprehensive analysis using the latest market data and comparable sales 
                to provide you with the most accurate home valuation.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-home text-primary" aria-hidden="true"></i>
              </div>
              <h3>Local Market Expert</h3>
              <p>
                Deep knowledge of Oklahoma City neighborhoods, market trends, 
                and factors that affect property values in your area.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock text-primary" aria-hidden="true"></i>
              </div>
              <h3>Quick Response</h3>
              <p>
                Receive your detailed home valuation report within 24 hours, 
                complete with market insights and selling recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeValuation;
