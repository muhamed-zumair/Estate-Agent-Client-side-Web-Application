import React, { useState, useEffect } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { getFavourites, removeFavourite, clearFavourites, addFavourite } from '../utils/favouritesManager';
import '../styles/main.css'; 
import { FaTrash, FaTimes, FaHeart  } from 'react-icons/fa'; 

//Draggable Item Component
const DraggableFavItem = ({ property, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FAVOURITE_ITEM',
    item: { id: property.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag} 
      className={`fav-item ${isDragging ? 'dragging' : ''}`}
    >
        <div className="fav-item-details">
         <span className="fav-item-price">
          £ {property.price}
         </span>
        
         <span className="fav-item-address" title={property.location}>
          {property.location}
         </span>
      </div>
      <button 
        onClick={() => onRemove(property.id)} 
        className="btn-remove"
        aria-label="Remove item"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <FaTimes />
      </button>
    </div>
  );
};

// Clear Button Component
const TrashButton = ({ onClear, onDropRemove, isEmpty }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'FAVOURITE_ITEM',
    drop: (item) => onDropRemove(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;

  return (
    <button 
      ref={drop}
      onClick={onClear} 
      disabled={isEmpty} 
      className={`btn-clear ${isActive ? 'drag-active' : ''} ${isEmpty ? 'disabled' : ''}`}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
    >
      {isActive ? (
        <>
          <FaTrash /> <span>Drop to Remove</span>
        </>
      ) : (
        'Clear All'
      )}
    </button>
  );
};

const FavouritesPanel = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    setFavourites(getFavourites());
    const handleStorageChange = () => setFavourites(getFavourites());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => {
      const updated = addFavourite(item.property);
      setFavourites([...updated]);
      window.dispatchEvent(new Event("storage"));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleRemove = (id) => {
    setFavourites([...removeFavourite(id)]);
    window.dispatchEvent(new Event("storage")); 
  };

  const handleClear = () => {
    if (favourites.length === 0) return;
    setFavourites([...clearFavourites()]);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div ref={drop} className={`favourites-sidebar ${isOver ? 'drag-over' : ''}`}>
      <h3 className="sidebar-title">
      <FaHeart style={{ color: "red", marginRight: "8px" }} />
        Favourites</h3>
      
      {favourites.length === 0 && (
        <p className="empty-msg"> Drag properties here to save.</p>
      )}

      <div className="fav-list">
        {favourites.map(p => (
          <DraggableFavItem 
            key={p.id} 
            property={p} 
            onRemove={handleRemove} 
          />
        ))}
      </div>

      <div className="trash-container">
        <TrashButton 
          onClear={handleClear} 
          onDropRemove={handleRemove}
          isEmpty={favourites.length === 0}
        />
      </div>
    </div>
  );
};

export default FavouritesPanel;