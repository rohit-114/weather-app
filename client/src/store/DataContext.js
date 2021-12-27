import React, { createContext, useState } from "react";

const DataContext = createContext();

export const DataContextProvider = (props) => {
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [data, setData] = useState({
    latitude: null,
    longitude: null,
    date: null,
    location: null,
    currentTemp: null,
    wind: null,
    humidity: null,
    visibility: null,
    pressure: null,
    condition: null,
  });

  const convertDate = (unixDate) => {
    const date = new Date(unixDate * 1000);
    const options = { weekday: "short", month: "short", day: "numeric" };

    return date.toLocaleDateString("en-US", options);
  };

  const getImgUrl = (main, desc) => {
    switch (main) {
      case "Clear":
        return "Clear";

      case "Thunderstorm":
        return "Thunderstorm";

      case "Snow":
        if (desc.includes("sleet")) {
          return "Sleet";
        } else {
          return "Snow";
        }

      case "Clouds":
        if (desc.includes("few") || desc.includes("scattered")) {
          return "LightCloud";
        } else {
          return "HeavyCloud";
        }

      case "Drizzle":
        if (desc.includes("light")) {
          return "LightRain";
        } else {
          return "Shower";
        }

      case "Rain":
        if (desc.includes("heavy") || desc.includes("extreme")) {
          return "HeavyRain";
        } else if (desc.includes("light") || desc.includes("moderate")) {
          return "LightRain";
        } else if (desc.includes("freezing")) {
          return "Hail";
        } else {
          return "Shower";
        }

      default:
        return "Clear";
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        dataError,
        setDataError,
        dataLoading,
        setDataLoading,
        getImgUrl,
        convertDate,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
