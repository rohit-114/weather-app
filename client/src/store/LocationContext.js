import { createContext, useState, useEffect } from "react";

const LocationContext = createContext();

export const LocationContextProvider = (props) => {
  const [locationLoading, setLocationLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState(null);
  const [count, setCount] = useState(0);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocationQuery(
          `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        );
        setLocationLoading(false);
      },
      function (error) {
        setLocationError(true);
        // setLocationLoading(false);
      }
    );
  }, [count]);

  return (
    <LocationContext.Provider
      value={{
        locationError,
        isOpen,
        setIsOpen,
        count,
        setCount,
        locationQuery,
        setLocationQuery,
        locationLoading,
        setLocationLoading,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
