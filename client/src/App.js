import React, { useContext } from "react";
import CurrentForecast from "./components/CurrentForecast";
import WeatherDetails from "./components/WeatherDetails";
import ErrorModal from "./components/ErrorModal";
import LocationContext from "./store/LocationContext";
import DataContext from "./store/DataContext";
import Spinner from "./components/Spinner";
import "./App.css";

const App = () => {
  const { locationError, locationLoading } = useContext(LocationContext);
  const { dataError } = useContext(DataContext);

  return navigator.onLine ? (
    <React.Fragment>
      {locationError && <ErrorModal location={true} />}
      {dataError && <ErrorModal data={true} />}
      {!locationError && locationLoading ? (
        <Spinner text="Getting Location..." width="100vw" />
      ) : (
        <React.Fragment>
          <CurrentForecast />
          <WeatherDetails />
        </React.Fragment>
      )}
    </React.Fragment>
  ) : (
    <ErrorModal error={true} />
  );
};

export default App;
