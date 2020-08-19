import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import MaterialInput from "../forminput/materialInput";
import { CreateGroup } from "../../service/group-service";
const CreateGroupModal = ({ show, hide, getAllGroups }) => {
  const [groupName, setGroupName] = useState("");
  const [groupDes, setGroupDes] = useState("");
  const createGroupHandler = async () => {
    if (groupDes == "" || groupName == "") {
      alert("Pease enter call required filed");
      return false;
    }
    const res = await CreateGroup(groupName, groupDes);
    if (res.data.code == "200") {
      alert(res.data.message);
      setGroupDes("");
      setGroupName("");
      hide(false);
      getAllGroups();
    }
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
          className="btn-danger btn"
          variant="secondary"
          onClick={createGroupHandler}
        >
          Save
        </button>
      </Modal.Header>
      <Modal.Body>
        <TextField
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          id="outlined-basic"
          label="Group Name"
          fullWidth
          variant="outlined"
          mb={5}
          className="mb-2"
        />
        <TextField
          value={groupDes}
          onChange={(e) => setGroupDes(e.target.value)}
          id="outlined-basic"
          label="Description"
          fullWidth
          variant="outlined"
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
