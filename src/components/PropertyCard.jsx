import React from 'react';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import { FaBed, FaHeart, FaRegHeart} from 'react-icons/fa';


const PropertyCard = ({ property, onFavourite, isFavourite }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { property },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  const dateString = `${property.added.month} ${property.added.day}, ${property.added.year}`;

  return (
    <article
      ref={drag}
      className={`property-card-wide ${isDragging ? 'dragging' : ''}`}
    >
      {/* Left: Image */}
      <div className="card-image-wrapper-wide">
        <img src={property.picture} alt={property.type} />
        <span className="card-tag">{property.type}</span>
      </div>

      {/* Right: Content */}
      <div className="card-content-wide">
        <div>
          <div className="card-header">
             <h3 className="card-price">£{property.price.toLocaleString()}</h3>
             <button onClick={onFavourite} className="btn btn-fav"
                title={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
             >
               {isFavourite ? (
                <FaHeart style={{ color: "#e74c3c" }} /> 
              ) : (
                <FaRegHeart /> 
              )} 
            </button>
          </div>
          
          <p className="card-address">{property.location}</p>
          
          <div className="card-specs">
             <span><FaBed /> {property.bedrooms} Beds</span>
          </div>

          <p className="card-description">
            {property.description}
          </p>
        </div>

        <div className="card-actions-bar">
            <span className="card-added-date">
              Added: {dateString}
            </span>
            <Link to={`/property/${property.id}`} className="btn btn-primary">
              View Details
            </Link>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;