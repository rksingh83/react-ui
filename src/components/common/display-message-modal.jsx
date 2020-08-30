import React from "react";
import Popup from "reactjs-popup";
import Modal from "react-bootstrap/Modal";

const ShowMessages = ({ show, hide, message }) => {
  return (
    <Modal size="md" show={show} animation={true}>
      <Modal.Body className="text-center message-body ">
        <div className="message">{message}</div>
        <button
          className="btn-info btn ok-button "
          variant="secondary"
          onClick={hide}
        >
          OK
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default ShowMessages;
