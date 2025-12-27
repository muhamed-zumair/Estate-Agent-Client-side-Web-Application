import React, { useState } from 'react';
import './App.css'; // Import CSS file
import propertyData from './data/properties.json'; // Import properties data from json file

function App() {
  // Store the properties in "state" so we can filter them later
  const [properties] = useState(propertyData.properties);

  return (
    <div className="app-container">
      <header>
        <h1>Estate Agents</h1>
      </header>

      <main>
        {/* The Grid Container */}
        <div className="property-grid">
          
          {/* Loop through the properties and create a card for each */}
          {properties.map(property => (
            <div key={property.id} className="property-card">
              
              {/* Image Section */}
              <div className="card-image">
                {/* using a placeholder if local image fails */}
                <img src={property.picture} alt={property.type} />
                <span className="price-tag">£{property.price.toLocaleString()}</span>
              </div>

              {/* Content Section */}
              <div className="card-content">
                <h3>{property.bedrooms} Bed {property.type}</h3>
                <p className="location">{property.location}</p>
                <p className="description">{property.description}</p>
                <button className="view-btn">View Details</button>
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}

export default App;