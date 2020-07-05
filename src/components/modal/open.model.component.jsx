import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import Input from "../boostrapinput/input.component";
const OpenPop = ({
  handleClose,
  saveName,
  isShow,
  pageNo,
  des,
  dt,
  ...props
}) => {
  const data = { pageNo, des, dt, id: props.id };
  console.log(data);
  console.log(props);
  return (
    <Modal show={isShow} onHide={handleClose} animation={true}>
      <Modal.Header closebutton></Modal.Header>
      <Modal.Body>
        <Input
          placeholder="Enter your Page No"
          label="Page Number"
          value={pageNo}
          handleChange={(e) => props.setPageNo(e.target.value)}
          name="folder"
          type="input"
        ></Input>
        <Input
          placeholder="Enter your Description"
          label="Date"
          value={dt}
          handleChange={(e) => props.setDt(e.target.value)}
          name="dis"
          type="input"
        ></Input>
        <Input
          placeholder="Enter your Date"
          label="Description"
          value={des}
          handleChange={(e) => props.setDesc(e.target.value)}
          name="id"
          type="text"
        ></Input>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn-danger btn"
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="btn btn-success"
          variant="primary"
          onClick={() => props.updateImage(data)}
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default OpenPop;
