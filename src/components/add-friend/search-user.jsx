import React from "react";
import FriendList from "./display-friends";
import Input from "../boostrapinput/input.component";
import { getCardCount as getPageCount } from "../common/pagination.config";
import ContactsCard from "../contactlist/display-searched-contact-list-card";
const Users = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <FriendList
            friendList={props.friendList}
            rejectFriend={props.rejectFriend}
            acceptFriend={props.acceptFriend}
          />
        </div>
        <div className="col-md-3 mt-4">
          <Input
            type="text"
            onChange={(e) => props.setUser(e.target.value)}
            placeholder="Search by email or user id"
            required={true}
          ></Input>
        </div>
        <div className="col-md-2 mt-3">
          <button
            onClick={props.searchUserHandler}
            id="searchButton"
            type="button"
            className="btn btn-success"
          >
            Search
          </button>
        </div>
      </div>
    
        <ContactsCard
          addFriend={props.addUserHandler}
          profileLists={props.userProfile}
          userCount={getPageCount(props.AllUserProfile)}
          addFriend={props.addUserHandler}
          clearList={props.setUserProfile}
          currentIndex={props.AllUserPaginationIndex}
          paginate={props.paginate}
          userProfileNextPrev={props.userProfileNextPrev}
        />

    </>
  );
};

export default Users;
