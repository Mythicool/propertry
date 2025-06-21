import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SearchForm({ onSearch, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    minSquareFeet: '',
    maxSquareFeet: '',
    ...initialFilters
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: '',
      minSquareFeet: '',
      maxSquareFeet: ''
    });
    onSearch({});
  };

  const priceOptions = [
    { value: '', label: 'Any Price' },
    { value: '50000', label: '$50,000' },
    { value: '100000', label: '$100,000' },
    { value: '150000', label: '$150,000' },
    { value: '200000', label: '$200,000' },
    { value: '250000', label: '$250,000' },
    { value: '300000', label: '$300,000' },
    { value: '400000', label: '$400,000' },
    { value: '500000', label: '$500,000' },
    { value: '750000', label: '$750,000' },
    { value: '1000000', label: '$1,000,000' }
  ];

  const bedroomOptions = [
    { value: '', label: 'Any Beds' },
    { value: '1', label: '1+ Beds' },
    { value: '2', label: '2+ Beds' },
    { value: '3', label: '3+ Beds' },
    { value: '4', label: '4+ Beds' },
    { value: '5', label: '5+ Beds' }
  ];

  const bathroomOptions = [
    { value: '', label: 'Any Baths' },
    { value: '1', label: '1+ Baths' },
    { value: '2', label: '2+ Baths' },
    { value: '3', label: '3+ Baths' },
    { value: '4', label: '4+ Baths' }
  ];

  const propertyTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Vacant Land', label: 'Vacant Land' },
    { value: 'Multi Family', label: 'Multi Family' }
  ];

  return (
    <motion.form
      className="search-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="search-form__basic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="form__group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="location" className="form__label sr-only">
            Location
          </label>
          <div className="form__input-group form--search">
            <motion.input
              type="text"
              id="location"
              name="location"
              className="form__input"
              placeholder="Enter city, neighborhood, or ZIP code"
              value={filters.location}
              onChange={handleInputChange}
              whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(44, 90, 160, 0.1)" }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>

        <div className="form__group">
          <label htmlFor="minPrice" className="form__label sr-only">
            Minimum Price
          </label>
          <select
            id="minPrice"
            name="minPrice"
            className="form__select"
            value={filters.minPrice}
            onChange={handleInputChange}
          >
            <option value="">Min Price</option>
            {priceOptions.slice(1).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form__group">
          <label htmlFor="maxPrice" className="form__label sr-only">
            Maximum Price
          </label>
          <select
            id="maxPrice"
            name="maxPrice"
            className="form__select"
            value={filters.maxPrice}
            onChange={handleInputChange}
          >
            <option value="">Max Price</option>
            {priceOptions.slice(1).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form__group">
          <label htmlFor="bedrooms" className="form__label sr-only">
            Bedrooms
          </label>
          <select
            id="bedrooms"
            name="bedrooms"
            className="form__select"
            value={filters.bedrooms}
            onChange={handleInputChange}
          >
            {bedroomOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form__group">
          <label htmlFor="bathrooms" className="form__label sr-only">
            Bathrooms
          </label>
          <select
            id="bathrooms"
            name="bathrooms"
            className="form__select"
            value={filters.bathrooms}
            onChange={handleInputChange}
          >
            {bathroomOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form__group">
          <label htmlFor="propertyType" className="form__label sr-only">
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            className="form__select"
            value={filters.propertyType}
            onChange={handleInputChange}
          >
            {propertyTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <motion.div
          className="form__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button
            type="submit"
            className="btn btn--primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <i className="fas fa-search" aria-hidden="true"></i>
            Search
          </motion.button>
          <motion.button
            type="button"
            className="btn btn--outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            aria-expanded={showAdvanced}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.i
              className={`fas fa-chevron-${showAdvanced ? 'up' : 'down'}`}
              aria-hidden="true"
              animate={{ rotate: showAdvanced ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            ></motion.i>
            {showAdvanced ? 'Less' : 'More'} Options
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            className="search-form__advanced"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.h3
              className="search-form__title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Advanced Search
            </motion.h3>

            <motion.div
              className="search-form__grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <motion.div
                className="form__group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label htmlFor="minSquareFeet" className="form__label">
                  Min Square Feet
                </label>
                <motion.input
                  type="number"
                  id="minSquareFeet"
                  name="minSquareFeet"
                  className="form__input"
                  placeholder="0"
                  min="0"
                  step="100"
                  value={filters.minSquareFeet}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(44, 90, 160, 0.1)" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.div
                className="form__group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label htmlFor="maxSquareFeet" className="form__label">
                  Max Square Feet
                </label>
                <motion.input
                  type="number"
                  id="maxSquareFeet"
                  name="maxSquareFeet"
                  className="form__input"
                  placeholder="Any"
                  min="0"
                  step="100"
                  value={filters.maxSquareFeet}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(44, 90, 160, 0.1)" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="form__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <motion.button
                type="button"
                className="btn btn--ghost"
                onClick={handleReset}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Reset All Filters
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

export default SearchForm;
