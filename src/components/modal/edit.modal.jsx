import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import LoadLookup from "../pending-data/display-page-lookup";
const OpenEditPop = ({
  isShow,
  onClose,
  imageId,
  currentLookup,
  folderId,
  history,
  removeSavedImageId,
}) => {
  const setValue = (e) => {
    e.target.value = e.target.value;
  };
  return (
    <Modal size="lg" show={isShow} animation={true}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <LoadLookup
          data={currentLookup}
          currentImageId={imageId}
          history={history}
          pendingFolderId={folderId}
          removeImageId={removeSavedImageId}
        ></LoadLookup>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn-danger btn"
          variant="secondary"
          onClick={() => onClose(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default OpenEditPop;
