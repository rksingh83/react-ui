import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ContactList from "../contactlist/display.contactlist";
import { Get, Post } from "../../service/service.setup";
const ShareFolderModal = ({ show, hide ,selected }) => {
  const [contactList, setContactList] = useState([]);

  async function getContactRequest() {
    try {
      const contacts = await Get("showUserContactList");
      setContactList(contacts.data.data.profileList);
    } catch (error) {}
  }
  useEffect(() => {
    //getFriendList();
    getContactRequest();
  }, []);
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
      </Modal.Header>
      <Modal.Body>
      <ContactList hide ={hide} selected ={selected}  isShare ={true} profileList ={contactList}></ContactList>
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
export default ShareFolderModal;
