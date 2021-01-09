import React, { useEffect, useState } from "react";
import { Post, Get } from "../../service/service.setup";
import { Row, Col, Image } from "react-bootstrap";
import Avatar from "../../assets/avatar.png";
import ContactList from "./ContactList";
const RightSharedPeopleList = ({ bookId }) => {
  const [shareList, setShareList] = useState([]);
  const [contactList, setContactList] = useState([]);
  
  useEffect(() => {
    getFolders(bookId);
  }, [bookId]);

  useEffect(() => {
    getContactRequest();
  }, []);
  async function getFolders(fileId, id = false) {
    try {
      const URI = id ? "getPageSharedList" : "getFileSharedList";
      const user = await Post(`/${URI}`, {
        fileId,
      });
      if (
        user.data.code == "200" &&
        user.data.message == "Page is not shared with anyone."
      ) {
        console.log([{ fullname: "Page is not shared with anyone" }]);
        setShareList([]);
      }
      //   setIsShowLoader(false);
      setShareList([...user.data.data.profile]);
      //displaySharedList(user.data.data.profile.splice(0, 4));
    } catch (error) {}
  }
  async function getContactRequest() {
    try {
      const contacts = await Get("showUserContactList");
      setContactList(contacts.data.data.profileList);
    } catch (error) {}
  }
  return (
    <>
      <Row style={{ maxHeight: "30rem" }}>
      <ContactList contactList ={shareList}   />
      </Row>
      <hr/>
      <Row>
       
      <ContactList contactList ={contactList}   />
      </Row>
    </>
  );
};

export default RightSharedPeopleList;
