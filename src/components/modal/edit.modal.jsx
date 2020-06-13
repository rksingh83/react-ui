import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import Input from "../boostrapinput/input.component";
import ImageSlider from "../display-uploaded-images.component/image.slider";
const OpenEditPop = ({ isShow, onClose, ...progs }) => {
  const setValue = (e) => {
    e.target.value = e.target.value;
  };
  return (
    <Modal show={isShow} animation={true}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Input
          placeholder="Enter your Page No"
          label="Page Number"
          value={progs.pageNo}
          handleChange={(e) => progs.setPageNo(e.target.value)}
          name="folder"
          type="input"
        ></Input>
        <Input
          placeholder="Enter your Description"
          label="Description"
          value={progs.desc}
          handleChange={(e) => progs.setDesc(e.target.value)}
          name="dis"
          type="input"
        ></Input>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn-danger btn"
          variant="secondary"
          onClick={() => onClose(false)}
        >
          Close
        </button>
        <button
          className="btn btn-success"
          variant="primary"
          onClick={() => progs.saveHandler()}
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default OpenEditPop;
