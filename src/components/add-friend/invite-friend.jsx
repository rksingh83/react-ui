import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
const CreateGroupModal = ({ show, hide }) => {
  const [email, setEmail] = useState("");

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
          onClick={createGroupHandler}
        >
          Send Request
        </button>
      </Modal.Header>
      <Modal.Body>
        <TextField
          value={email}
          onChange={(e) => setName(e.target.value)}
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
export default CreateGroupModal;
