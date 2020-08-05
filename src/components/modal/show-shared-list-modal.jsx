import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Post, Get } from "../../service/service.setup";

import { sendOTPToEmail, EmailVerification } from "../../service/sharefiles";
const SharedListModal = ({ show, hide, list }) => {
  return (
    <Modal size="md" show={show} onHide={() => hide(false)} animation={true}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <ul className="list-group">
          {list.map((item, index) => (
            <li className="list-group-item li-contact-list" key={index}>
              <span> {item.fullname}</span>
              {item.fullaccess && <span>Full Access</span>}
            </li>
          ))}
        </ul>
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
export default SharedListModal;
