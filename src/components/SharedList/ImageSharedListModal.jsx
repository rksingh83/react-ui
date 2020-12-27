import React from "react";
import { Modal, Button } from "react-bootstrap";
const ImageSharedListModal = ({ show, closeModal, children }) => {
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button className ="btn" variant="danger" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageSharedListModal;
