import React, { useState } from 'react';

// This component handles the Rubric requirement: "Property Page - Gallery" (5%)
const PropertyGallery = ({ images }) => {
    // State to keep track of which image is currently big
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="gallery-container">
            {/* 1. Main Large Image */}
            <div className="main-image-wrapper mb-4">
                <img 
                    src={mainImage} 
                    alt="Property Main" 
                    className="w-full h-96 object-cover rounded shadow-lg" 
                />
            </div>

            {/* 2. Thumbnail Grid */}
            <div className="thumbnail-grid grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                    <img 
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        // Check if this is the active image to add a border style
                        className={`w-full h-20 object-cover cursor-pointer rounded hover:opacity-80 transition ${mainImage === img ? 'border-2 border-blue-600' : ''}`}
                        onClick={() => setMainImage(img)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PropertyGallery;