import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import data from '../data/properties.json';
import { filterProperties } from '../utils/filterLogic';
import { Link } from 'react-router-dom';

const SearchPage = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProps, setFilteredProps] = useState([]);

    //Load data when component mounts
    useEffect(() => {
        setProperties(data.properties);
        setFilteredProps(data.properties); // Initially show all
    }, []);

    //Handle Search Event
    const handleSearch = (criteria) => {
        const results = filterProperties(properties, criteria);
        setFilteredProps(results);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Find Your Dream Home</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                    <SearchForm onSearch={handleSearch} />
                </div>

                <div className="w-full md:w-2/3">
                    <div className="grid grid-cols-1 gap-6">
                        {filteredProps.length === 0 ? (
                            <p>No properties found.</p>
                        ) : (
                            filteredProps.map(prop => (
                                <div key={prop.id} className="border rounded shadow hover:shadow-lg transition">
                                    <img src={prop.picture} alt={prop.type} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold">£{prop.price.toLocaleString()}</h3>
                                        <p className="text-gray-600">{prop.type} - {prop.bedrooms} Bedrooms</p>
                                        <p className="text-sm text-gray-500 mb-2">{prop.location}</p>
                                        <Link to={`/property/${prop.id}`} className="text-blue-600 font-bold hover:underline">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;