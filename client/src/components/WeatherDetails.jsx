import React, { useState, useEffect, useContext } from "react";
import WeatherCard from "./WeatherCard";
import HighlightCard from "./HighlightCard";
import DataContext from "../store/DataContext";
import Spinner from "./Spinner";
import "./WeatherDetails.css";

const WeatherDetails = () => {
  const { data, dataLoading, dataError, setDataError, convertDate, getImgUrl } =
    useContext(DataContext);
  const { latitude, longitude, wind, humidity, visibility, pressure } = data;
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `https://backend-weatherapp.vercel.app/api/${latitude}/${longitude}`;

  useEffect(() => {
    if (!dataLoading) {
      setLoading(true);
      const fetchDayData = async () => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          setDailyData(data.daily.slice(1, 6));
          setLoading(false);
        } catch (err) {
          console.log(err);
          setDataError(true);
        }
      };

      const timer = setTimeout(() => {
        fetchDayData();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [url, dataLoading, setDataError]);

  return (
    <React.Fragment>
      {!dataError && !dataLoading && loading && (
        <Spinner text="Getting Data..." />
      )}
      {!loading && (
        <div className="container">
          <div className="cardlist">
            {dailyData.map((current, index) => {
              let { dt, temp, weather } = current;
              const imgUrl = getImgUrl(weather[0].main, weather[0].description);
              let key = dt;
              dt = index === 0 ? "Tomorrow" : convertDate(dt);
              const maxTemp = Math.floor(temp.max);
              const minTemp = Math.floor(temp.min);

              return (
                <WeatherCard
                  key={key}
                  date={dt}
                  img={imgUrl}
                  alt={weather[0].description}
                  max={maxTemp}
                  min={minTemp}
                />
              );
            })}
          </div>
          <div className="highlight-cardlist">
            <h3 className="highlights">Today's Highlights</h3>
            <HighlightCard
              title="Wind status"
              value={Math.floor(wind.speed * 3600)}
              unit=" mph"
              deg={wind.deg}
              icon
            />
            <HighlightCard
              title="Humidity"
              value={humidity}
              unit=" %"
              progress
            />
            <HighlightCard title="Visibility" value={visibility} unit=" m" />
            <HighlightCard title="Air Pressure" value={pressure} unit=" mb" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default WeatherDetails;
