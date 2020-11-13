import React, { useEffect, useState } from "react";

import { Get, Post } from "../../service/service.setup";
import "./add-friend.style.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";

import { Link } from "react-router-dom";
import Input from "../boostrapinput/input.component";
import ContactList from "../contactlist/display.contactlist";

import CreateGroupModal from "./create-group-modal";
import { GetAllGroups, EditGroup } from "../../service/group-service";
import DisplayGroupList from "./display-group";
import { setContacts } from "../../redux/contacts/contacts.actions";
import { connect } from "react-redux";
import InviteUser from "./invite-friend";
import CustomLoader from "../loader/loader";
import ShowMessages from "../common/display-message-modal";
import LeftSideBar from "./left-sidebar";
import { BackButton } from "../common/pNGButtons";
import Users from "./search-user";
import {
  getCardStartIndex as getStartIndex,
  getCardCount as getPageCount,
  DISPLAY_CARD_COUNT as PAGE_OFF_SET,
} from "../common/pagination.config";
const AddFriend = ({ history, setContacts, contacts, match }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState([]);
  const [AllUserProfile, setAllUserProfile] = useState([]);
  const [AllUserPaginationIndex, setAllUserPaginationIndex] = useState(1);
  const [friendList, setFriendList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({});
  let Screen = match.params.screen ? match.params.screen : "USERS";
  const [currentList, setCurrentList] = useState(Screen);
  const [allGroups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupDes, setGroupDes] = useState("");
  const [groupId, setGroupId] = useState(0);
  const [inviteContactModal, openInviteContactModal] = useState(false);
  // Loader and Alert
  const [showPopUp, setShowPop] = useState(false);
  const [responseMgs, setResponseMgs] = useState("");
  const [isShowLoader, setShowLoader] = useState(false);
  const LeftSidebarConfig = [
    { key: "USERS", value: "Add Users" },
    { key: "GROUPS", value: "Groups" },
    { key: "CONTACTS", value: "Contacts" },
  ];

  const crossStyle = {
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
        if (!window.confirm("Are you sure you want to remove ?")) return;
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
      setShowLoader(true);
      const userFind = await Post("/searchUser", { unique_user_id: user });

      if (userFind.data.code == "203") {
        setUser("");
        setResponseMgs(userFind.data.message);
        setShowPop(true);
        setUserProfile([]);
        setShowLoader(false);
        return;
      }
      setUserProfile(userFind.data.data.profile);
      setAllUserProfile([...userFind.data.data.profile]);
      setUserProfile(userFind.data.data.profile.splice(0, PAGE_OFF_SET));
      setShowLoader(false);
    } catch (e) {
      alert("Something went wrong try latter");
      history.goBack();
    }
  };

  const addUserHandler = async (id, e) => {
    try {
      if (e.innerText == "Cancel") {
        removeContact(id);
        return true;
      }
      const userFind = await Post("/addUser", { id: id });

      if (userFind.data.code == "200") {
        alert(userFind.data.message);
        //  window.location.reload();
        e.innerText = "Cancel";
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
      window.location.reload();
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
    if (!window.confirm("Are you sure you want to remove ?")) return;

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

  // search contact pagination
  const paginate = (number) => {
    const allBooks = [...AllUserProfile];
    setUserProfile(allBooks.splice(getStartIndex(number), PAGE_OFF_SET));
    setAllUserPaginationIndex(number);
  };

  const userProfileNextPrev = (type) => {
    if (type === "NEXT") {
      if (AllUserPaginationIndex == getPageCount(AllUserProfile)) return;
      paginate(AllUserPaginationIndex + 1);
    } else {
      if (AllUserPaginationIndex == 1) return;
      paginate(AllUserPaginationIndex - 1);
    }
  };

  return (
    <>
      <div className="row">
        <ShowMessages
          hide={() => setShowPop(false)}
          message={responseMgs}
          show={showPopUp}
        />
        {isShowLoader && <CustomLoader />}
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
                {currentList == "GROUPS" && (
                  <li className="nav-item">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="btn btn-success mr-4"
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
                )}
                <li className="nav-item">
                  <button
                    onClick={() => openInviteContactModal(true)}
                    className="btn btn-success mr-4"
                  >
                    Invite User
                  </button>
                  <InviteUser
                    show={inviteContactModal}
                    hide={openInviteContactModal}
                  />
                </li>

                <li className="nav-item">
                  <Cross
                    onClick={() => history.goBack()}
                    style={crossStyle}
                  ></Cross>
                </li>
                <li className="nav-item">
                  <BackButton
                    className="btn btn-success"
                    handler={history.goBack}
                  ></BackButton>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="row m-0">
        <LeftSideBar
          menus={LeftSidebarConfig}
          currentMenu={currentList}
          setMenu={setCurrentList}
        />
        <div className="col-md-9">
          {currentList == "USERS" && (
            <Users
              friendList={friendList}
              rejectFriend={rejectFriend}
              acceptFriend={acceptFriend}
              setUser={setUser}
              searchUserHandler={searchUserHandler}
              addFriend={addUserHandler}
              userProfile={userProfile}
              addUserHandler={addUserHandler}
              setUserProfile={setUserProfile}
              AllUserPaginationIndex={AllUserPaginationIndex}
              paginate={paginate}
              userProfileNextPrev={userProfileNextPrev}
              AllUserProfile={AllUserProfile}
            />
          )}
          <div className="row mt-4" style={{ justifyContent: "center" }}>
            <div className="col-md-8">
              {currentList == "GROUPS" && (
                <DisplayGroupList
                  update={editGroupHandler}
                  groups={allGroups}
                  updateHandler={updateHandler}
                  profileLists={contactList}
                />
              )}
              {currentList == "CONTACTS" && (
                <ContactList profileList={contactList} />
              )}
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
