import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import SearchForm from '../../components/SearchForm/SearchForm';
import { properties, searchProperties } from '../../data/properties';

function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  // Initialize filters from URL params using useMemo to prevent recreation on every render
  const initialFilters = useMemo(() => ({
    location: searchParams.get('location') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    propertyType: searchParams.get('propertyType') || '',
    minSquareFeet: searchParams.get('minSquareFeet') || '',
    maxSquareFeet: searchParams.get('maxSquareFeet') || ''
  }), [searchParams]);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = searchProperties(initialFilters);
    
    // Apply sorting
    filtered = sortProperties(filtered, sortBy);
    
    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [searchParams, sortBy, initialFilters]);

  const handleSearch = (filters) => {
    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newSearchParams.append(key, value);
      }
    });
    setSearchParams(newSearchParams);
  };

  const sortProperties = (props, sortType) => {
    const sorted = [...props];
    
    switch (sortType) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'sqft-low':
        return sorted.sort((a, b) => a.squareFeet - b.squareFeet);
      case 'sqft-high':
        return sorted.sort((a, b) => b.squareFeet - a.squareFeet);
      case 'newest':
        return sorted.sort((a, b) => a.daysOnMarket - b.daysOnMarket);
      case 'oldest':
        return sorted.sort((a, b) => b.daysOnMarket - a.daysOnMarket);
      default:
        return sorted;
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="properties-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header__content">
            <h1>Properties for Sale</h1>
            <p>Discover your dream home in Oklahoma City and surrounding areas</p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section section--sm bg-gray-50">
        <div className="container">
          <SearchForm onSearch={handleSearch} initialFilters={initialFilters} />
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section section">
        <div className="container">
          {/* Results Header */}
          <div className="results-header">
            <div className="results-info">
              <h2>
                {filteredProperties.length} Properties Found
                {Object.values(initialFilters).some(value => value) && (
                  <span className="results-filtered"> (Filtered)</span>
                )}
              </h2>
              <p>
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length} results
              </p>
            </div>

            <div className="results-controls">
              {/* Sort Dropdown */}
              <div className="sort-control">
                <label htmlFor="sort" className="sr-only">Sort properties by</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="form__select"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="sqft-low">Size: Small to Large</option>
                  <option value="sqft-high">Size: Large to Small</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="view-toggle">
                <button
                  className={`btn btn--icon ${viewMode === 'grid' ? 'btn--primary' : 'btn--ghost'}`}
                  onClick={() => handleViewModeChange('grid')}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                >
                  <i className="fas fa-th" aria-hidden="true"></i>
                </button>
                <button
                  className={`btn btn--icon ${viewMode === 'list' ? 'btn--primary' : 'btn--ghost'}`}
                  onClick={() => handleViewModeChange('list')}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  <i className="fas fa-list" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Properties Grid/List */}
          {currentProperties.length > 0 ? (
            <div className={`properties-container ${viewMode === 'list' ? 'properties-list' : 'properties-grid'}`}>
              {currentProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  featured={property.featured}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results__content">
                <i className="fas fa-search no-results__icon" aria-hidden="true"></i>
                <h3>No Properties Found</h3>
                <p>
                  We couldn't find any properties matching your search criteria. 
                  Try adjusting your filters or search terms.
                </p>
                <button 
                  className="btn btn--primary"
                  onClick={() => handleSearch({})}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="pagination" aria-label="Properties pagination">
              <ul className="pagination__list">
                <li className="pagination__item">
                  <button
                    className="pagination__link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <i className="fas fa-chevron-left" aria-hidden="true"></i>
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  const isActive = page === currentPage;
                  
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <li key={page} className="pagination__item">
                        <button
                          className={`pagination__link ${isActive ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                          aria-label={`Page ${page}`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      </li>
                    );
                  }
                  
                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <li key={page} className="pagination__item">
                        <span className="pagination__ellipsis">...</span>
                      </li>
                    );
                  }
                  
                  return null;
                })}

                <li className="pagination__item">
                  <button
                    className="pagination__link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <i className="fas fa-chevron-right" aria-hidden="true"></i>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section bg-primary text-white">
        <div className="container">
          <div className="cta-section__content text-center">
            <h2>Need Help Finding the Perfect Home?</h2>
            <p>
              Let me help you navigate the Oklahoma City real estate market 
              and find a property that meets all your needs.
            </p>
            <div className="cta-section__actions">
              <a href="/contact" className="btn btn--secondary btn--lg">
                Schedule Consultation
              </a>
              <a href="tel:(405) 771-0707" className="btn btn--outline btn--lg">
                <i className="fas fa-phone" aria-hidden="true"></i>
                Call Paula
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Properties;
