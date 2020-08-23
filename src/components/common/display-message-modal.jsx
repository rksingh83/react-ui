import React from "react";
import Alert from 'react-bootstrap/Alert'

const ShowMessages = ({ show, hide, message }) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    padding: "11px",
    margin: "10px",
    justifyContent: "space-around",
  };
  const textStyle = {
    fontSize: "16px",
    padding: "10px 10px",
    fontWeight: "550",
    color: "#757575",
  };
  const btnStyle = {};
  return (
     <Alert  show={show}  variant="danger" onClose={() => hide(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <div style={style}>
        <span style={textStyle}>{message}</span>
        <button
          style={btnStyle}
          onClick={() => hide(false)}
          className="btn btn-primary w-25"
        >
          Ok
        </button>
      </div>
    </Alert>
  );
};

export default ShowMessages;
