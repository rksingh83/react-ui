import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ContactList from "../contactlist/display.contactlist";
import { Get, Post } from "../../service/service.setup";
import TextField from "@material-ui/core/TextField";
import SearchedContactList from "../contactlist/display-searched-contact-list";
import { addContact, searchContact } from "../../service/sharefiles";
const ShareFolderModal = ({ show, hide, selected, images }) => {
  const [contactList, setContactList] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [searchedContactList, setSearchedContactList] = useState("");

  async function getContactRequest() {
    try {
      const contacts = await Get("showUserContactList");
      setContactList(contacts.data.data.profileList);
    } catch (error) {}
  }
  const userSearchHandler = async () => {
    try {
      const user = await searchContact(searchUserId);
      console.log("USER", user.data.data.profile);
      setSearchedContactList(user.data.data.profile);
    } catch {
     // setSearchedContactList([]);
    }
  };
  const addContactHandler = async (id) => {
    const user = await addContact(id);
    if (user) {
      setSearchedContactList({
        ...searchedContactList,
        requestAlreadySent: true,
      });
    }
  };
  useEffect(() => {
    //getFriendList();
    getContactRequest();
  }, []);
  return (
    <Modal size="md" show={show} onHide={() => hide(false)} animation={true}>
      <Modal.Header>
        <button onClick={userSearchHandler} className="btn btn-success">
          Search
        </button>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li>
            <TextField
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
              id="outlined-basic"
              label="Enter UserName"
              fullWidth
              variant="outlined"
            />
          </li>{" "}
        </ul>
        {searchedContactList && (
          <SearchedContactList
            profileLists={searchedContactList}
            addFriend={addContactHandler}
            hide={hide}
            selected={selected}
            images={images}
            isShare={true}
          ></SearchedContactList>
        )}
        <ContactList
          hide={hide}
          selected={selected}
          images={images}
          isShare={true}
          profileList={contactList}
        ></ContactList>
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
