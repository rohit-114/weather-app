import React from "react";
import "./WeatherCard.css";

const WeatherCard = (props) => {
  return (
    <div className="card">
      <h5 className="card__title">{props.date}</h5>

      <img
        src={require(`../images/${props.img}.png`).default}
        alt={props.alt}
        className="card__img"
      />

      <div className="card__temp">
        <p className="card__temp__max">{props.max}°C</p>
        <p className="card__temp__min">{props.min}°C</p>
      </div>
    </div>
  );
};

export default WeatherCard;
