import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import { CancelButton } from "../common/pNGButtons";
import { CreateGroup, EditGroup } from "../../service/group-service";
const CreateGroupModal = ({
  show,
  hide,
  getAllGroups,
  groupName,
  groupDes,
  setDes,
  setName,
  groupId,
}) => {
  const createGroupHandler = async () => {
    if (groupDes == "" || groupName == "") {
      alert("Please Enter Group Name and Description both!!");
      return false;
    }
    let res = {};
    if (groupId > 0) {
      res = await EditGroup({
        group_description: groupDes,
        group_name: groupName,
        id: groupId,
        deleted: false,
      });
    } else {
      res = await CreateGroup(groupName, groupDes);
    }
    if (res.data.code == "200") {
      alert(res.data.message);

      hide();
      getAllGroups();
    }
  };
  const closeHandler = () => {
    hide(false);
  };
  return (
    <Modal size="md" show={show} onHide={() => hide(false)} animation={true}>
      <Modal.Header>
        <CancelButton handler={closeHandler}></CancelButton>
        <button
          className="btn-info btn"
          variant="secondary"
          onClick={createGroupHandler}
        >
          Save
        </button>
      </Modal.Header>
      <Modal.Body>
        <TextField
          value={groupName}
          onChange={(e) => setName(e.target.value)}
          id="outlined-basic"
          label="Group Name"
          fullWidth
          variant="outlined"
          mb={5}
          className="mb-2"
        />
        <TextField
          value={groupDes}
          onChange={(e) => setDes(e.target.value)}
          id="outlined-basic"
          label="Description"
          fullWidth
          variant="outlined"
        />
      </Modal.Body>
      <Modal.Footer>
        <CancelButton handler={closeHandler}></CancelButton>
      </Modal.Footer>
    </Modal>
  );
};
export default CreateGroupModal;
