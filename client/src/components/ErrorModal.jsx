import React, { useContext } from "react";
import ReactDOM from "react-dom";
import DataContext from "../store/DataContext";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  const { dataError, setDataError } = useContext(DataContext);

  return (
    <React.Fragment>
      {props.error &&
        ReactDOM.createPortal(
          <div className="error">You're offline 😔</div>,
          document.getElementById("error")
        )}
      {props.location &&
        ReactDOM.createPortal(
          <div className="error">Please allow location 😔</div>,
          document.getElementById("error")
        )}
      {props.data &&
        dataError &&
        ReactDOM.createPortal(
          <div className="backdrop" onClick={() => setDataError(false)}>
            <div className="modal">
              <button onClick={() => setDataError(false)}>
                <span className="material-icons-round">close</span>
              </button>
              <p>Something went wrong! 😔 Please try again.</p>
            </div>
          </div>,
          document.getElementById("error")
        )}
    </React.Fragment>
  );
};

export default ErrorModal;
