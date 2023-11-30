import React, { useState, useContext, createContext } from 'react'

const LocationContext = createContext();

export const useLocation = () => {
  return useContext(LocationContext);
}

export const LocationProvider = ({ children }) => {
    const [searchLocation, setSearchLocation] = useState("");
    const [clearSearch, setClearSearch] = useState(false);

    // clear the Searchbar
    const clearSearchbar = () => {
        setClearSearch(true);
    };

    const contextValue ={
      searchLocation,
      setSearchLocation,
      clearSearch,
      setClearSearch,
      clearSearchbar,
    }
    return (
    <LocationContext.Provider value={contextValue}>
        {children}
    </LocationContext.Provider>
  )
}
