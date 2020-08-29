import React from "react";
import Popup from "reactjs-popup";
import Modal from "react-bootstrap/Modal";

const ShowMessages = ({ show, hide, message }) => {
  
  return (
    <Modal size="md" show={show} animation={true}>
      <Modal.Header></Modal.Header>
      <Modal.Body className="text-center"><div className ="message">{message}</div></Modal.Body>
      <Modal.Footer>
        <button
          className="btn-danger btn"
          variant="secondary"
          onClick={hide}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowMessages;
