import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import data from '../data/properties.json';
import PropertyGallery from '../components/PropertyGallery';
import { addFavourite } from '../utils/favouritesManager';
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = () => {
    const { id } = useParams();
    const property = data.properties.find(p => p.id === id);

    if (!property) {
      return <div className="container">Property not found</div>;
    }

    const galleryImages = property.images && property.images.length > 0 
    ? [property.picture, ...property.images] 
    : [property.picture];

    const handleAddToFav = () => {
        addFavourite(property);
        alert("Property added to favourites!");
    };

    const floorPlanSrc = `images/${id}/${id}-fp.jpg`;

    return (
        <div className="container">
            <Link to="/" className="btn-details" style={{display:'inline-block', marginBottom:'20px'}}>
            <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Search
            </Link>

            <div className="property-detail-container">
                {/* Gallery */}
                <div className="property-gallery-section">
                    <PropertyGallery images={galleryImages} />
                </div>

                {/* Info & Tabs */}
                <div className="property-info-section">
                    <h1 className="prop-title">{property.location}</h1>
                    <h2 className="prop-price">£{property.price.toLocaleString()}</h2>
                    
                    <div className="prop-tags" style={{marginBottom: '20px'}}>
                        <span>{property.type}</span>
                        <span>{property.bedrooms} Bedrooms</span>
                        <span>{property.tenure}</span>
                    </div>

                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Floor Plan</Tab>
                            <Tab>Map</Tab>
                        </TabList>

                        <TabPanel>
                          <div className="tab-content">
                            <p className="description-text">{property.description}</p>
                          </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="tab-content floorplan-wrapper">
                              <img
                                src={floorPlanSrc}
                                alt="Floor Plan"
                                className="floorplan-image"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            </div>
                        </TabPanel>      

                        <TabPanel>
                            <div style={{padding: '15px', background: 'white', border: '1px solid #ddd'}}>
                                <iframe 
                                    width="100%" 
                                    height="300" 
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                    title="Property Map"
                                ></iframe>
                            </div>
                        </TabPanel>
                    </Tabs>
                    
                    <button 
                        onClick={handleAddToFav}
                        className="btn btn-primary" 
                        style={{marginTop: '20px', background: '#27ae60'}}
                    >
                        Add to Favourites
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyPage;