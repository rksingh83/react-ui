import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import Input from "../boostrapinput/input.component";
const OpenPop = ({ handleClose, saveName, show, pageNo, des, date }) => {
  const [pageNumber, setPageNo] = useState(pageNo);
  const [description, setDescription] = useState(des);
  const [date, setDate] = useState(date);
  return (
    <Modal show={show} onHide={handleClose} animation={true}>
      <Modal.Header closebutton></Modal.Header>
      <Modal.Body>
        <Input
          placeholder="Enter your Page No"
          label="Page Number"
          value={pageNo}
          handleChange={() => setPageNo(e.target.value)}
          name="folder"
          type="input"
        ></Input>
        <Input
          placeholder="Enter your Description"
          label="Discreption"
          value={description}
          handleChange={() => setDescription(e.target.value)}
          name="dis"
          type="input"
        ></Input>
        <Input
          placeholder="Enter your Date"
          label="Discreption"
          value={date}
          handleChange={() => setDate(e.target.value)}
          name="id"
          type="text"
        ></Input>
      </Modal.Body>
      <Modal.Footer>
        <button
          class="btn-danger btn"
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="btn btn-success"
          variant="primary"
          onClick={saveName}
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default OpenPop ;