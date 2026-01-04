const STORAGE_KEY = "favouriteProperties";

// Get all favourite properties from localStorage
export const getFavourites = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// Add a property to favourites avoid duplicates
export const addFavourite = (property) => {
  const favourites = getFavourites();

  const exists = favourites.find(p => p.id === property.id);
  if (!exists) {
    favourites.push(property);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }

  return favourites;
};

// Remove a property by ID
export const removeFavourite = (id) => {
  const updated = getFavourites().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

//Clear all favourites
export const clearFavourites = () => {
  localStorage.removeItem(STORAGE_KEY);
  return [];
};
