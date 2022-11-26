import React, { useContext, useEffect } from "react";
import LocationContext from "../store/LocationContext";
import DataContext from "../store/DataContext";
import SearchDrawer from "./SearchDrawer";
import Spinner from "./Spinner";
import "./CurrentForecast.css";

const CurrentForecast = () => {
  const {
    locationQuery,
    locationError,
    locationLoading,
    isOpen,
    setIsOpen,
    count,
    setCount,
  } = useContext(LocationContext);
  const {
    data,
    setData,
    dataLoading,
    setDataLoading,
    setDataError,
    convertDate,
    getImgUrl,
  } = useContext(DataContext);
  const { date, location, currentTemp, condition } = data;
  const url = `https://backend-weatherapp.vercel.app/api/${locationQuery}`;

  useEffect(() => {
    if (!locationLoading) {
      setDataLoading(true);
      const fetchQuery = async () => {
        try {
          console.log("api call", url);
          const res = await fetch(url);
          console.log(res);
          const data = await res.json();
          setData({
            latitude: data.coord.lat,
            longitude: data.coord.lon,
            date: data.dt,
            location: data.name,
            currentTemp: Math.floor(data.main.feels_like),
            wind: data.wind,
            humidity: data.main.humidity,
            visibility: data.visibility,
            pressure: data.main.pressure,
            condition: data.weather[0],
          });
        } catch (err) {
          console.log(err);
          setDataError(true);
          setIsOpen(true);
        } finally {
          setDataLoading(false);
        }
      };

      const timer = setTimeout(() => {
        fetchQuery();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [locationLoading, url, setData, setDataLoading, setDataError, setIsOpen]);

  return (
    <React.Fragment>
      {!locationError && dataLoading && (
        <Spinner text="Getting Data..." width="100vw" />
      )}
      {!dataLoading && (
        <div className="wrapper">
          {isOpen ? (
            <SearchDrawer />
          ) : (
            <React.Fragment>
              <div className="background"></div>
              <div className="content">
                <div className="header">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className="header__btn"
                  >
                    Search for places
                  </button>
                  <button
                    onClick={() => {
                      setCount(count + 1);
                    }}
                    className="header__btn header__btn--round"
                  >
                    <span className="material-icons-round">gps_fixed</span>
                  </button>
                </div>

                <div className="status">
                  <img
                    src={
                      require(`../images/${getImgUrl(
                        condition.main,
                        condition.description
                      )}.png`).default
                    }
                    alt={condition.description}
                    className="status__img"
                  />

                  <h1 className="status__title">
                    <span className="status__title__text">{currentTemp}</span>ºC
                  </h1>
                  <p className="status__subtitle">{condition.main}</p>
                  <p className="status__text--color">
                    Today &ensp; • &ensp; {convertDate(date)}
                  </p>
                  <div className="status__location status__text--color">
                    <span className="material-icons">location_on</span>
                    <p className="status__location__text">{location}</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default CurrentForecast;
