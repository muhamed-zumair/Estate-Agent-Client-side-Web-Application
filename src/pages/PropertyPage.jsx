import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import data from '../data/properties.json';
import PropertyGallery from '../components/PropertyGallery';

const PropertyPage = () => {
    const { id } = useParams();

    // Find the specific property from JSON data
    const property = data.properties.find(p => p.id === id);

    // If property not found 
    if (!property) return <div>Property not found</div>;

    const galleryImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.picture, property.picture, property.picture, property.picture, property.picture, property.picture];

    return (
        <div className="container mx-auto p-4">
            {/* Back Button */}
            <Link to="/" className="text-blue-600 mb-4 inline-block">&larr; Back to Search</Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left column Gallery */}
                <div>
                    <PropertyGallery images={galleryImages} />
                </div>

                {/* Right column Details & Tabs */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{property.location}</h1>
                    <h2 className="text-2xl text-blue-800 font-bold mb-4">£{property.price.toLocaleString()}</h2>
                    
                    <div className="mb-6">
                        <span className="bg-gray-200 px-3 py-1 rounded mr-2">{property.type}</span>
                        <span className="bg-gray-200 px-3 py-1 rounded mr-2">{property.bedrooms} Bedrooms</span>
                        <span className="bg-gray-200 px-3 py-1 rounded">{property.tenure}</span>
                    </div>

                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Floor Plan</Tab>
                            <Tab>Map</Tab>
                        </TabList>

                        {/* Tab 1: Description */}
                        <TabPanel>
                            <div className="p-4 bg-white border rounded">
                                <p className="leading-relaxed">{property.description}</p>
                            </div>
                        </TabPanel>

                        {/* Tab 2: Floor Plan */}
                        <TabPanel>
                            <div className="p-4 bg-white border rounded text-center">
                                {/* Placeholder for Floorplan */}
                                <div className="bg-gray-100 h-64 flex items-center justify-center">
                                    <p>Floor Plan Image Would Go Here</p>
                                </div>
                            </div>
                        </TabPanel>

                        {/* Tab 3: Google Map */}
                        <TabPanel>
                            <div className="p-4 bg-white border rounded">
                                {/* Embedding a Google Map iframe [cite: 45] */}
                                <iframe 
                                    width="100%" 
                                    height="300" 
                                    frameBorder="0" 
                                    style={{border:0}} 
                                    src={`https://www.google.com/maps?q=${property.location}&output=embed`}
                                    allowFullScreen
                                    title="Property Map"
                                ></iframe>
                            </div>
                        </TabPanel>
                    </Tabs>
                    
                    <button className="mt-6 w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition">
                        Add to Favorites (Heart Icon)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyPage;