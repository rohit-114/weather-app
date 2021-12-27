import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LocationContextProvider } from "./store/LocationContext";
import { DataContextProvider } from "./store/DataContext";

ReactDOM.render(
  <React.StrictMode>
    <LocationContextProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </LocationContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
