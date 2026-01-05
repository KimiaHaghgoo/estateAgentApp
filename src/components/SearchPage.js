import React, { useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';
import FavouritesList from './FavouritesList';
import propertiesData from '../data/properties.json';
import 'react-widgets/styles.css';
import './SearchPage.css';

// Search container with drop zone functionality
function SearchContainer({ results, hasSearched, handleSearch, favourites, addToFavourites, removeFromFavourites }) {
  // Set up drop zone for removing favourites by dragging them out
  const [{ isOverRemove }, dropRemove] = useDrop(() => ({
    accept: 'favourite-item',
    drop: (item) => {
      // Remove the favourite when dragged to the main area
      removeFromFavourites(item.propertyId);
    },
    collect: (monitor) => ({
      isOverRemove: monitor.isOver(),
    }),
  }), [removeFromFavourites]);

  return (
    <div
      ref={dropRemove}
      className={`search-container ${isOverRemove ? 'removing-favourite' : ''}`}
    >
      {/* Search form section */}
      <div className="search-form-section">
        <h2>Search Properties</h2>
        <SearchForm onSearch={handleSearch} />
      </div>

      {/* Results section */}
      <div className="results-section">
        <h2>Results</h2>
        {hasSearched ? (
          results.length > 0 ? (
            <div className="results-info">
              <p>{results.length} {results.length === 1 ? 'property' : 'properties'} found</p>
            </div>
          ) : (
            <p className="no-results">No properties match your search criteria. Try adjusting your filters.</p>
          )
        ) : (
          <p className="no-results">Use the search form to find properties</p>
        )}

        <ResultsList
          properties={results}
          addToFavourites={addToFavourites}
          favourites={favourites}
        />
      </div>
    </div>
  );
}

// Main search page component that combines search form, results, and favourites
function SearchPage({ favourites, addToFavourites, removeFromFavourites, clearFavourites }) {
  // State for search results - show all properties initially
  const [results, setResults] = useState(propertiesData);
  const [hasSearched, setHasSearched] = useState(true);

  // Handle search form submission
  const handleSearch = (criteria) => {
    // Filter properties based on all criteria
    let filtered = propertiesData;

    // Filter by property type
    if (criteria.type && criteria.type !== 'any') {
      filtered = filtered.filter(prop => prop.type === criteria.type);
    }

    // Filter by listing type (sale/rent)
    if (criteria.listingType && criteria.listingType !== 'any') {
      filtered = filtered.filter(prop => prop.listingType === criteria.listingType);
    }

    // Filter by min price
    if (criteria.minPrice) {
      filtered = filtered.filter(prop => prop.price >= parseInt(criteria.minPrice));
    }

    // Filter by max price
    if (criteria.maxPrice) {
      filtered = filtered.filter(prop => prop.price <= parseInt(criteria.maxPrice));
    }

    // Filter by min bedrooms
    if (criteria.minBedrooms) {
      filtered = filtered.filter(prop => prop.bedrooms >= parseInt(criteria.minBedrooms));
    }

    // Filter by max bedrooms
    if (criteria.maxBedrooms) {
      filtered = filtered.filter(prop => prop.bedrooms <= parseInt(criteria.maxBedrooms));
    }

    // Filter by postcode area (first part before space)
    if (criteria.postcode && criteria.postcode.trim() !== '') {
      const searchPostcode = criteria.postcode.trim().toUpperCase();
      filtered = filtered.filter(prop =>
        prop.postcode.toUpperCase().startsWith(searchPostcode)
      );
    }

    // Filter by date added
    if (criteria.dateFrom) {
      const fromDate = new Date(criteria.dateFrom);
      filtered = filtered.filter(prop => {
        const propDate = new Date(prop.dateAdded);
        return propDate >= fromDate;
      });
    }

    // Filter by date range (if dateTo is provided)
    if (criteria.dateTo) {
      const toDate = new Date(criteria.dateTo);
      filtered = filtered.filter(prop => {
        const propDate = new Date(prop.dateAdded);
        return propDate <= toDate;
      });
    }

    setResults(filtered);
    setHasSearched(true);
  };

  return (
    // Wrap in DndProvider for drag and drop functionality
    <DndProvider backend={HTML5Backend}>
      <div className="search-page">
        <SearchContainer
          results={results}
          hasSearched={hasSearched}
          handleSearch={handleSearch}
          favourites={favourites}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
        />

        {/* Favourites sidebar */}
        <aside className="favourites-sidebar">
          <FavouritesList
            favourites={favourites}
            addToFavourites={addToFavourites}
            removeFromFavourites={removeFromFavourites}
            clearFavourites={clearFavourites}
          />
        </aside>
      </div>
    </DndProvider>
  );
}

export default SearchPage;
