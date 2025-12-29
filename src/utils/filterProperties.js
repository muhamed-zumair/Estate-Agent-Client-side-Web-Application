const getMonthIndex = (monthStr) => {
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return months.indexOf(monthStr);
  };
  
  export const filterProperties = (properties, filters) => {
    return properties.filter(prop => {
      //Type Filter
      if (filters.type && filters.type !== "Any" && prop.type !== filters.type) {
        return false;
      }
  
      //Price Filter (Min and Max)
      if (filters.minPrice && prop.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && prop.price > parseInt(filters.maxPrice)) return false;
  
      //Bedroom Filter
      if (filters.minBeds && prop.bedrooms < parseInt(filters.minBeds)) return false;
      if (filters.maxBeds && prop.bedrooms > parseInt(filters.maxBeds)) return false;
  
      //Postcode Filter 
      if (filters.postcode) {
          if (!prop.location.toLowerCase().includes(filters.postcode.toLowerCase())) {
              return false;
          }
      }
  
      // Date Filter
      const propDate = new Date(prop.added.year, getMonthIndex(prop.added.month), prop.added.day);
      
      if (filters.dateAfter && propDate < new Date(filters.dateAfter)) {
          return false;
      }
  
      return true; 
    });
  };