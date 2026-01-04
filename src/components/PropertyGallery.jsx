import React, { useState } from 'react';

const PropertyGallery = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="gallery-container">
            <div className="main-image-wrapper">
                <img 
                    src={mainImage} 
                    alt="Property Main" 
                    className="main-image"
                />
            </div>

            <div className="thumbnail-grid">
                {images.map((img, index) => (
                    <img 
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                        onClick={() => setMainImage(img)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PropertyGallery;