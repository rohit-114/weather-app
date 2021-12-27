import React from "react";
import "./HighlightCard.css";

const HighlightCard = (props) => {
  return (
    <div className="highlight__card">
      <h5 className="highlight__card__title">{props.title}</h5>
      <p className="highlight__card__text">
        <span className="highlight__card__text--bold">{props.value}</span>
        {props.unit}
      </p>
      {props.icon && (
        <div className="highlight__card__icon">
          <span
            className="material-icons-round highlight__card__icon--round"
            style={{ transform: `rotate(${props.deg}deg)` }}
          >
            navigation
          </span>
          <p>WSW</p>
        </div>
      )}
      {props.progress && (
        <div>
          <div className="progressbar-text">
            <p>0</p>
            <p>50</p>
            <p>100</p>
          </div>
          <div className="progressbar">
            <div style={{ width: `${props.value}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightCard;
