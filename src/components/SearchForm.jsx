import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Slider from 'rc-slider';
import { FaSearch } from 'react-icons/fa';
import { BsHouse } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-slider/assets/index.css';

const SearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    type: 'Any',
    minPrice: 0,
    maxPrice: 2000000,
    minBeds: 0,
    maxBeds: 10,
    postcode: '',
    dateAfter: null,
  });

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ ...filters, [name]: value });
  };

  const handleDateChange = (date) => {
    updateFilters({ ...filters, dateAfter: date });
  };

  const handleSliderChange = (value) => {
    updateFilters({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  return (
    <>
      <div className="brand-header">
        <BsHouse className="brand-logo" />
        <div className="brand-text">
            <h1>Estate<span>Agent</span></h1>
            <p className="brand-slogan">Your trusted partner in real estate</p>
        </div>
      </div>
      <div className="search-header">
        <FaSearch className="search-icon" />
        <h2>Search</h2>
      </div>

      <div className="search-form-horizontal">

        {/* Type*/}
        <div className="form-group">
          <label>Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="form-control"
          >
            <option value="Any">Any Property</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* Price */}
        <div className="form-group slider-container">
          <label>
            Price: £{filters.minPrice / 1000}k – £{filters.maxPrice / 1000}k
          </label>
          <Slider
            range
            min={0}
            max={1500000}
            step={50000}
            value={[filters.minPrice, filters.maxPrice]}
            onChange={handleSliderChange}
          />
        </div>

        {/*Bed Rooms */}
        <div className="form-group" >
          <label>Bed Rooms</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="number"
              name="minBeds"
              min="0"
              placeholder="Min"
              className="form-control"
              value={filters.minBeds}
              onChange={handleChange}
            />
            <input
              type="number"
              name="maxBeds"
              min="0"
              placeholder="Max"
              className="form-control"
              value={filters.maxBeds}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Added After</label>
          <DatePicker
            selected={filters.dateAfter}
            onChange={handleDateChange}
            className="form-control"
            placeholderText="Any time"
          />
        </div>

        {/* Postcode */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="postcode"
            value={filters.postcode}
            onChange={handleChange}
            className="form-control"
            placeholder="eg. CR0, BR1"
          />
        </div>

      </div>
    </>
  );
};

export default SearchForm;
