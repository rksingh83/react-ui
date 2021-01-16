import React, { useEffect, useState } from "react";
import { Post, Get } from "../../service/service.setup";
import { Row, Col, Image } from "react-bootstrap";
import Avatar from "../../assets/avatar.png";
import ContactList from "./ContactList";

import UserGroupList from "./UserGroupList";
import ListTabs from "../add-friend/tab";
import UserContactList from "./UserContactList";
const RightSharedPeopleList = ({ bookId, isSharedFolder, pageId }) => {
  const [shareList, setShareList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [currentTab, setCurrentTab] = useState("CONTACTS");

  useEffect(() => {
    getFolders(bookId, pageId);
  }, [bookId, pageId]);
  async function removeContact(id) {
    if (!window.confirm("Are you sure you want to remove ?")) return;

    try {
      const contacts = await Post(`/removeContact`, { id });
      if (contacts.data.code == "200") {
        alert(contacts.data.message);
      }
      getFolders(bookId, pageId);
    } catch (error) {}
  }
  const shareHandler = (id) => {
    shareWith(id);
  };
  const giveUploadAccess = (id) => {
    shareWith(id);
  };
  async function shareWith({ id, user_id, isUpload }) {

    if(!isUpload){
    if (!window.confirm("Are you sure you want to Share Folder ?")) return;
    }else{
      if (!window.confirm("Are you sure you want to give full upload access ?")) return;
    }

    try {
      const request = {
        imageIds: [bookId],
        group_id: id,
        active: true,
        user_id,
      };
      if (isUpload) {
        request["upload_access"] = true;
      }
      const URL = "shareFile";
      const { data } = await Post(`/${URL}`, request);
      if (data.code == "200") {
        alert(data.message);
        if (user_id) getFolders(bookId, pageId);
      }
    } catch (error) {}
  }
  useEffect(() => {
    getContactRequest();
  }, [bookId, pageId]);
  async function getFolders(fileId, id = false) {
    try {
      const request = { fileId };
      if (id) request["id"] = id;
      const URI = id ? "getPageSharedList" : "getFileSharedList";
      const user = await Post(`/${URI}`, request);
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
      <Row
        style={{ maxHeight: "15rem", overflowY: "auto", overflowX: "hidden" }}
      >
        <ContactList
          message={`This ${
            pageId ? "page" : "book"
          } is not shared with any one`}
          contactList={shareList}
          cancel={true}
          removeContact={removeContact}
        />
      </Row>

      <Row>
        <ListTabs
          currentTab={currentTab}
          isHideShare={true}
          setCurrentTab={setCurrentTab}
        ></ListTabs>
      </Row>
      <Row
        style={{ maxHeight: "20rem", overflowY: "auto", overflowX: "hidden" }}
      >
        {currentTab === "GROUPS" && (
          <UserGroupList
            shareGroupHandler={shareHandler}
            groups={userGroups}
            isSharedFolder={isSharedFolder}
            giveUploadAccess={giveUploadAccess}

          />
        )}
        {currentTab === "CONTACTS" && (
          <UserContactList
            message="Your contact list is empty"
            contactList={contactList}
            shareHandler={shareHandler}
            isSharedFolder={isSharedFolder}
            giveUploadAccess={giveUploadAccess}
          />
        )}
      </Row>
    </>
  );
};

export default RightSharedPeopleList;
