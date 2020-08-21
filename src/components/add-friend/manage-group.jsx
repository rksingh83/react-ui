import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import MaterialInput from "../forminput/materialInput";
import { GetGroupMember } from "../../service/group-service";
import DisplayContact from "./add-contact-group";
const AddContactToGroup = ({
  profileLists,
  show,
  hide,
  groupId,
  addMember,
  saveGroup,
}) => {
  const [currentGroupMembers, setCurrentGroupMember] = useState([]);
  useEffect(() => {
    getGroups(groupId);
  }, [groupId]);
  const getGroups = async (id) => {
    const list = await GetGroupMember(id);
    console.log(list);
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
          onClick={() => saveGroup(groupId)}
        >
          Save
        </button>
      </Modal.Header>
      <Modal.Body>
        <>
          <DisplayContact
            addMember={addMember}
            profileLists={profileLists}
            groupId={groupId}
          ></DisplayContact>
          <h4 className="m-2">Member</h4>
          <DisplayContact profileLists={currentGroupMembers}></DisplayContact>
        </>
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
export default AddContactToGroup;
