import React from "react";
import "./Spinner.css";

const Spinner = (props) => {
  return (
    <div className="spinner" style={{ width: props.width }}>
      <p>{props.text}</p>
      <div></div>
    </div>
  );
};

export default Spinner;
