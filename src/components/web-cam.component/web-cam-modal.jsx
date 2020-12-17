import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import WebcamCapture from "./web-cam";
import "./webcam.style.scss";
import CustomLoader from "../loader/loader";
const WebCamModel = ({ show, hide, id }) => {
  const [startLoader, setStartLoader] = useState(false);
  return (
    <Modal size="lg" show={show} onHide={() => hide(false)} animation={true}>
      <Modal.Header>
        <button
          className="btn-danger btn"
          variant="secondary"
          onClick={() => hide(false)}
        >
          Close
        </button>
      </Modal.Header>
      <Modal.Body>
        {startLoader && <CustomLoader />}
        <WebcamCapture isLoading ={setStartLoader} id={id} />
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn-danger btn"
          variant="secondary"
          onClick={() => hide(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default WebCamModel;
