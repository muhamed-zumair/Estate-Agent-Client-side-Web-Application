import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import FavouritesPanel from '../components/FavouritesPanel';
import data from '../data/properties.json';
import { filterProperties } from '../utils/filterProperties';
import { addFavourite, getFavourites, removeFavourite } from '../utils/favouritesManager';

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProps, setFilteredProps] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    setProperties(data.properties);
    setFilteredProps(data.properties);
    setFavourites(getFavourites());

    const handleStorageChange = () => setFavourites(getFavourites());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSearch = (criteria) => {
    const results = filterProperties(properties, criteria);
    setFilteredProps(results);
  };

  const handleFavouriteChange = (property) => {
    const isFav = favourites.some(f => f.id === property.id); 
    if (isFav) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
    
    setFavourites(getFavourites());
    window.dispatchEvent(new Event("storage")); 
  };

  return (
    <main className="search-page">
      <section className="search-bar-container">
          <SearchForm onSearch={handleSearch} />
      </section>

      <div className="main-content-grid">
        
        <section className="property-list-section">
          {filteredProps.length === 0 ? (
            <p className="no-results">No properties found matching your criteria.</p>
          ) : (
            <div className="property-list">
              {filteredProps.map(prop => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isFavourite={favourites.some(f => f.id === prop.id)}
                  onFavourite={() => handleFavouriteChange(prop)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Favorite panel */}
        <aside className="favourites-wrapper">
          <FavouritesPanel />
        </aside>

      </div>
    </main>
  );
};

export default SearchPage;