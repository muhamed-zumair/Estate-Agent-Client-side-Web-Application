import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Slider from 'rc-slider';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-slider/assets/index.css';

const SearchForm = ({ onSearch }) => {
  // Local state for the form inputs
  const [filters, setFilters] = useState({
    type: 'Any',
    minPrice: 0,
    maxPrice: 2000000,
    minBeds: 0,
    maxBeds: 10,
    postcode: '',
    dateAfter: null,
  });

  // Updates simple inputs (text, select, number)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Updates Date Widget
  const handleDateChange = (date) => {
    setFilters(prev => ({ ...prev, dateAfter: date }));
  };

  // Updates Slider Widget
  const handleSliderChange = (value) => {
      setFilters(prev => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters); // Send data up to Parent
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
        {/* Type Selector */}
        <div className="mb-4">
            <label className="block font-bold mb-1">Property Type</label>
            <select name="type" onChange={handleChange} className="w-full p-2 border">
                <option value="Any">Any</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
            </select>
        </div>

        {/* React Widget: Slider for Price */}
        <div className="mb-6">
            <label className="block font-bold mb-1">
                Price Range: £{filters.minPrice} - £{filters.maxPrice}
            </label>
            <Slider 
                range 
                min={0} 
                max={1500000} 
                step={50000}
                defaultValue={[0, 1500000]} 
                onChange={handleSliderChange} 
            />
        </div>

        {/* Postcode & Beds */}
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label className="block font-bold">Postcode</label>
                <input type="text" name="postcode" onChange={handleChange} className="w-full p-2 border" placeholder="e.g. BR1" />
            </div>
            <div>
                <label className="block font-bold">Min Beds</label>
                <input type="number" name="minBeds" onChange={handleChange} className="w-full p-2 border" min="0" />
            </div>
        </div>

        {/* React Widget: Date Picker */}
        <div className="mb-4">
            <label className="block font-bold">Added After</label>
            <DatePicker 
                selected={filters.dateAfter} 
                onChange={handleDateChange} 
                className="w-full p-2 border"
                placeholderText="Select Date"
            />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Search Properties
        </button>
    </form>
  );
};

export default SearchForm;