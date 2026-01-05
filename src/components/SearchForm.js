import React, { useState } from 'react';
import { DropdownList, NumberPicker, Combobox } from 'react-widgets';
import './SearchForm.css';
import { DatePicker } from "react-widgets";

// Search form component using React Widgets for enhanced UI
function SearchForm({ onSearch }) {
  // Form state for all search criteria
  const [formData, setFormData] = useState({
    type: 'any',
    listingType: 'any',
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    dateFrom: null,
    dateTo: null,
    postcode: ''
  });

  // Property type options for dropdown
  const propertyTypes = ['any', 'house', 'flat'];

  // Listing type options for dropdown
  const listingTypes = ['any', 'sale', 'rent'];
  const postcodeAreas = ['BR5', 'BR6', 'SW19', 'E14', 'BR1', 'NW1'];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass search criteria to parent component
    onSearch(formData);
  };

  // Reset form to initial state
  const handleReset = () => {
    setFormData({
      type: 'any',
      listingType: 'any',
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      maxBedrooms: null,
      dateFrom: '',
      dateTo: '',
      postcode: ''
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* Property Type Dropdown */}
      <div className="form-group">
        <label htmlFor="property-type">Property Type</label>
        <DropdownList
          id="property-type"
          data={propertyTypes}
          value={formData.type}
          onChange={(value) => setFormData({ ...formData, type: value })}
          placeholder="Select property type"
        />
      </div>

      {/* Listing Type Dropdown (Sale/Rent) */}
      <div className="form-group">
        <label htmlFor="listing-type">Listing Type</label>
        <DropdownList
          id="listing-type"
          data={listingTypes}
          value={formData.listingType}
          onChange={(value) => setFormData({ ...formData, listingType: value })}
          placeholder="Select listing type"
        />
      </div>

      {/* Price Range */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="min-price">Min Price (£)</label>
          <NumberPicker
            id="min-price"
            value={formData.minPrice}
            onChange={(value) => setFormData({ ...formData, minPrice: value })}
            min={0}
            step={10000}
            format={{ style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }}
            placeholder="Min price"
          />
        </div>

        <div className="form-group">
          <label htmlFor="max-price">Max Price (£)</label>
          <NumberPicker
            id="max-price"
            value={formData.maxPrice}
            onChange={(value) => setFormData({ ...formData, maxPrice: value })}
            min={0}
            step={10000}
            format={{ style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }}
            placeholder="Max price"
          />
        </div>
      </div>

      {/* Bedroom Range */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="min-bedrooms">Min Bedrooms</label>
          <NumberPicker
            id="min-bedrooms"
            value={formData.minBedrooms}
            onChange={(value) => setFormData({ ...formData, minBedrooms: value })}
            min={0}
            max={10}
            placeholder="Min beds"
          />
        </div>

        <div className="form-group">
          <label htmlFor="max-bedrooms">Max Bedrooms</label>
          <NumberPicker
            id="max-bedrooms"
            value={formData.maxBedrooms}
            onChange={(value) => setFormData({ ...formData, maxBedrooms: value })}
            min={0}
            max={10}
            placeholder="Max beds"
          />
        </div>
      </div>


      {/* Date Range - Using React Widgets DatePicker */}
      <div className="form-row">
        <div className="form-group">
          <label>Date Added From</label>
          <DatePicker
            value={formData.dateFrom}
            onChange={(value) => {
              console.log("Date From selected:", value);
              setFormData({ ...formData, dateFrom: value });
            }}
            max={new Date()}
            placeholder="From date"
            className="date-input"
          />
        </div>

        <div className="form-group">
          <label>Date Added To</label>
          <DatePicker
            value={formData.dateTo}
            onChange={(value) => {
              console.log("Date To selected:", value);
              setFormData({ ...formData, dateTo: value });
            }}
            max={new Date()}
            placeholder="To date"
            className="date-input"
          />
        </div>
      </div>


      {/* Postcode Area */}
      <div className="form-group">
        <label htmlFor="postcode">Postcode Area</label>
<<<<<<< HEAD

=======
>>>>>>> 3b0d3c6 (Improve search and reset button styles)
        <Combobox
          id="postcode"
          data={postcodeAreas}
          value={formData.postcode}
          onChange={(value) =>
            setFormData({
              ...formData,
<<<<<<< HEAD
              postcode: (value || '').toString().toUpperCase().trim(),
=======
              postcode: (value || '').toString().toUpperCase().trim()
>>>>>>> 3b0d3c6 (Improve search and reset button styles)
            })
          }
          onCreate={(value) =>
            setFormData({
              ...formData,
<<<<<<< HEAD
              postcode: (value || '').toString().toUpperCase().trim(),
=======
              postcode: (value || '').toString().toUpperCase().trim()
>>>>>>> 3b0d3c6 (Improve search and reset button styles)
            })
          }
          allowCreate
          placeholder="e.g. BR1, NW1, SW19"
          className="postcode-input"
        />
<<<<<<< HEAD

        <small>Enter first part of postcode (e.g., BR1, NW1)</small>
=======
        <small>Enter first part of postcode (e.g. BR1, NW1)</small>
>>>>>>> 3b0d3c6 (Improve search and reset button styles)
      </div>

      {/* Buttons */}
      <div className="form-actions">
<<<<<<< HEAD
        <button type="submit" className="search-button">
=======
        <button type="submit" className="btn-search">
>>>>>>> 3b0d3c6 (Improve search and reset button styles)
          Search Properties
        </button>

        <button
          type="button"
<<<<<<< HEAD
          className="reset-button"
=======
          className="btn-reset"
>>>>>>> 3b0d3c6 (Improve search and reset button styles)
          data-testid="reset-button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

<<<<<<< HEAD

=======
>>>>>>> 3b0d3c6 (Improve search and reset button styles)
    </form>
  );
}

export default SearchForm;
        