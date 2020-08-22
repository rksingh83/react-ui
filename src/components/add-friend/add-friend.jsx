import React, { useEffect, useState } from "react";

import { Get, Post } from "../../service/service.setup";
import "./add-friend.style.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { ReactComponent as Yes } from "../../assets/yes.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
import { Link } from "react-router-dom";
import Input from "../boostrapinput/input.component";
import UserData from "../profile/display.user.data";
import ContactList from "../contactlist/display.contactlist";
import SearchedContactList from "../contactlist/display-searched-contact-list";
import ContactsCard from "../contactlist/display-searched-contact-list-card";
import CreateGroupModal from "./create-group-modal";
import { GetAllGroups, EditGroup } from "../../service/group-service";
import ListTabs from "./tab";
import DisplayGroupList from "./display-group";
import { setContacts } from "../../redux/contacts/contacts.actions";
import { connect } from "react-redux";
const AddFriend = ({ history, setContacts, contacts }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({});
  const [currentList, setCurrentList] = useState("CONTACTS");
  const [allGroups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupDes, setGroupDes] = useState("");
  const [groupId, setGroupId] = useState(0);
  const [inviteContactModal, openInviteContactModal] = useState(false);
  const styleImage = {
    width: "100%",
    height: "100%",
    marginTop: "10px",
  };
  const crossStyle = {
    width: "4rem",
    height: "2rem",
  };
  const pencilStyle = {
    width: "4rem",
    height: "2rem",
  };
  const getAllGroups = async () => {
    try {
      const res = await GetAllGroups();
      if (res.data.code == "200") {
        setGroups(res.data.data.userGroup);
      }
    } catch (e) {}
  };
  // edit group
  const editGroupHandler = async (data) => {
    try {
      if (data.deleted) {
        if (!window.confirm("Are You sure you want to remove ?")) return;
      }
      const res = await EditGroup(data);
      if (res.data.code == "200") {
        alert(res.data.message);
        getAllGroups();
      }
    } catch (e) {
      alert("Something went wrong try latter");
    }
  };
  const updateHandler = (id) => {
    const group = allGroups.filter((item) => item.groupID == id);
    setCurrentGroup(group[0]);
    setGroupName(group[0].groupName);
    setGroupDes(group[0].groupDescription);
    setGroupId(id);
    setOpenModal(true);
  };
  const onClose = () => {
    setOpenModal(false);
    setGroupName("");
    setGroupDes("");
    setGroupId(0);
  };
  const searchUserHandler = async () => {
    try {
      if (!user) {
        alert("Please enter Email or User Id");
        return;
      }
      const userFind = await Post("/searchUser", { unique_user_id: user });
      console.log(userFind.data);
      if (userFind.data.code == "203") {
        setUser("");
        alert(userFind.data.message);
        setUserProfile([]);

        return;
      }
      setUserProfile(userFind.data.data.profile);
    } catch (e) {
      alert("Something went wrong try latter");
      history.goBack();
    }
  };

  const addUserHandler = async (id) => {
    try {
      const userFind = await Post("/addUser", { id: id });
      console.log(userFind);
      if (userFind.data.code == "200") {
        alert(userFind.data.message);
        window.location.reload();
        return;
      }
      //setUserProfile(userFind.data.data.profile);
    } catch (e) {
      alert("Something went wrong try latter");
      history.goBack();
    }
  };
  async function getFriendList() {
    try {
      const list = await Get("showUserFriendRequestList");
      //setProfile(list);
      setFriendList(list.data.data.profileList);
    } catch (error) {}
  }
  async function getContactRequest() {
    try {
      const contacts = await Get("showUserContactList");
      setContactList(contacts.data.data.profileList);
    } catch (error) {}
  }
  async function acceptFriend(id) {
    try {
      const list = await Post("/acceptUserAddRequest", { id });
      alert(list.data.message);
    } catch (error) {}
  }
  async function rejectFriend(id) {
    try {
      const list = await Post("/rejectUserAddRequest", { id });
      alert(list.data.message);
    } catch (error) {}
  }
  useEffect(() => {
    getFriendList();
    getContactRequest();
    getAllGroups();
  }, []);
  async function removeContact(exist = undefined) {
    if (!window.confirm("Are You sure you want to remove ?")) return;

    try {
      const URL = exist ? "cancelUserAddRequest" : "removeContact";
      const contacts = await Post(`/${URL}`, {
        id: userProfile.id,
      });
      if (contacts.data.code == "200") {
        alert(contacts.data.message);
      }
      window.location.reload();
    } catch (error) {}
  }
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <nav className="navbar navbar-expand-lg navbar-light sec-header-bg">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto text-white">
                <li className="nav-item">
                  <button
                    onClick={() => setOpenModal(true)}
                    className="btn btn-success"
                  >
                    Create New Group
                  </button>
                  <CreateGroupModal
                    getAllGroups={getAllGroups}
                    hide={onClose}
                    show={openModal}
                    groupName={groupName}
                    groupDes={groupDes}
                    setDes={setGroupDes}
                    setName={setGroupName}
                    groupId={groupId}
                  />
                </li>
                <li className="nav-item">
                  <Cross
                    onClick={() => history.goBack()}
                    style={crossStyle}
                  ></Cross>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-success"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className=" custom-pad-li d-none d-sm-block col-md-2 p-0">
          <Link className="logo-container" to="/">
            <ul className=" ul-pad list-group left-side-bar">
              <li className="custom-pad-li list-group-item active">Home</li>
            </ul>
          </Link>
        </div>
        <div className="col-md-9 col-xs-12 col-sm-12">
          <div className="row">
            <div className="col-md-4  ml-3 mt-4">
              <Input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                placeholder="Search by email or user id"
              ></Input>
            </div>
            <div className="col-md-2 mt-4">
              <button
                onClick={searchUserHandler}
                id="searchButton"
                type="button"
                className="btn btn-success"
              >
                Search
              </button>
            </div>
            <div className="col-md-5 mt-4">
              <ListTabs
                setCurrentTab={setCurrentList}
                currentTab={currentList}
              />
              {currentList == "CONTACTS" && (
                <ContactList profileList={contactList} />
              )}
              {currentList == "GROUPS" && (
                <DisplayGroupList
                  update={editGroupHandler}
                  groups={allGroups}
                  updateHandler={updateHandler}
                  profileLists={contactList}
                />
              )}
            </div>
          </div>
          <div className="col-md-6">
            <ContactsCard
              addFriend={addUserHandler}
              profileLists={userProfile}
              addFriend={addUserHandler}
              clearList={setUserProfile}
            />
          </div>
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12 ml-3">
              <h5>Friend list</h5>
              <ul class="list-group">
                {friendList.map((item, index) => (
                  <li class="list-group-item" key={index}>
                    <span> {item.fullname}</span>
                    <span style={{ paddingLeft: "50px" }}>
                      <Yes onClick={() => acceptFriend(item.id)}></Yes>{" "}
                      <Close onClick={() => rejectFriend(item.id)}></Close>{" "}
                    </span>
                  </li>
                ))}
                {friendList.length == 0 && (
                  <li class="list-group-item">There is no friend request</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
//export default AddFriend;

const mapDispatchToProps = (dispatch) => ({
  setContacts: (contacts) => dispatch(setContacts(contacts)),
});

const mapStateToPros = ({ contacts: { contacts } }) => ({
  contacts,
});
export default connect(mapStateToPros, mapDispatchToProps)(AddFriend);
