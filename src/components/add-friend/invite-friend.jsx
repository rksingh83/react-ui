import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import { Post } from "../../service/service.setup";
const InviteUser = ({ show, hide }) => {
  const [email, setEmail] = useState("");

  const sendEmail = async (email) => {
    const res = await Post("/inviteUser", { email });
    if ((res.data.code = "200")) {
      alert("Send Email Successfully");
      hide(false);
    }
    hide(false);
  };
  return (
    <Modal size="md" show={show} onHide={() => hide(false)} animation={true}>
      <Modal.Header>
        <button
          className="btn-danger btn"
          variant="secondary"
          onClick={() => hide(false)}
        >
          Close
        </button>
        <button
          className="btn-info btn"
          variant="secondary"
          onClick={() => sendEmail(email)}
        >
          Send Invite Email
        </button>
      </Modal.Header>
      <Modal.Body>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-basic"
          label="User Email"
          fullWidth
          variant="outlined"
          mb={5}
          className="mb-2"
        />
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
export default InviteUser;
