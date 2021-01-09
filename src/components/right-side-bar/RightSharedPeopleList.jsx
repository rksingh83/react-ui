import React, { useEffect, useState } from "react";
import { Post, Get } from "../../service/service.setup";
import { Row, Col, Image } from "react-bootstrap";
import Avatar from "../../assets/avatar.png";
import ContactList from "./ContactList";

import UserGroupList from "./UserGroupList";
import ListTabs from "../add-friend/tab";
const RightSharedPeopleList = ({ bookId, isSharedFolder }) => {
  const [shareList, setShareList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [currentTab, setCurrentTab] = useState("CONTACTS");

  useEffect(() => {
    getFolders(bookId);
  }, [bookId]);
  async function removeContact(id) {
    if (!window.confirm("Are you sure you want to remove ?")) return;

    try {
      const contacts = await Post(`/removeContact`, { id });
      if (contacts.data.code == "200") {
        alert(contacts.data.message);
      }
      getFolders(bookId);
    } catch (error) {}
  }
  const shareHandler = (id) => {
    shareWith(id);
  };
  async function shareWith({ id, user_id }) {
    if (!window.confirm("Are you sure you want to Share Folder ?")) return;

    try {
      const request = {
        imageIds: [bookId],
        group_id: id,
        active: true,
        user_id,
      };
      const URL = "shareFile";
      const { data } = await Post(`/${URL}`, request);
      if (data.code == "200") {
        alert(data.message);
        if (user_id) getFolders(bookId);
      }
    } catch (error) {}
  }
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
        setShareList([]);
      }
      if (
        user.data.code == "200" &&
        user.data.message == "Book is not shared with anyone."
      ) {
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
      setUserGroups(contacts.data.data.userGroup);
    } catch (error) {}
  }
  return (
    <>
      <Row style={{ maxHeight: "30rem", overflowY: "auto" }}>
        <ContactList
          message="This book is not shared with any one"
          contactList={shareList}
          cancel={true}
          removeContact ={removeContact}
        />
      </Row>
      <hr />
      <Row>
        <ListTabs
          currentTab={currentTab}
          isHideShare={true}
          setCurrentTab={setCurrentTab}
        ></ListTabs>
      </Row>
      <Row style={{ maxHeight: "30rem", overflowY: "auto" }}>
        {currentTab === "GROUPS" && (
          <UserGroupList
            shareGroupHandler={shareHandler}
            groups={userGroups}
            isSharedFolder={isSharedFolder}
          />
        )}
        {currentTab === "CONTACTS" && (
          <ContactList
            message="Your contact list is empty"
            contactList={contactList}
            shareHandler={shareHandler}
          />
        )}
      </Row>
    </>
  );
};

export default RightSharedPeopleList;
