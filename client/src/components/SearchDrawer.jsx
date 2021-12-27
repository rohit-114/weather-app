import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import LocationContext from "../store/LocationContext";
import "./SearchDrawer.css";

const SearchDrawer = () => {
  const { setLocationQuery, setIsOpen } = useContext(LocationContext);
  const [city, setCity] = useState("");

  const clickHandler = () => {
    setLocationQuery(`q=${city}`);
    setIsOpen(false);
  };

  return ReactDOM.createPortal(
    <div className="search__container">
      <div className="close-btn">
        <button onClick={() => setIsOpen(false)}>
          <span className="material-icons-round">close</span>
        </button>
      </div>
      <div className="searchbar">
        <div className="searchbar__search-input">
          <span className="material-icons-round searchbar__search-icon">
            search
          </span>
          <input
            autoFocus
            placeholder="search location"
            value={city}
            onChange={(e) => {
              setCity(e.target.value.toLowerCase());
            }}
          />
        </div>
        <button className="searchbar__search-btn" onClick={clickHandler}>
          Search
        </button>
      </div>
    </div>,
    document.getElementById("search")
  );
};

export default SearchDrawer;
