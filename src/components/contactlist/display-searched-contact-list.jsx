import React from "react";

import { Get, Post } from "../../service/service.setup";
//import "./user-data.style.scss";
import { ReactComponent as Close } from "../../assets/close.svg";
import { ReactComponent as Share } from "../../assets/share.svg";
import { ReactComponent as AddUser } from "../../assets/add-user.svg";
import Paginate from "../common/paginate";
const SearchedContactList = ({
  profileLists,
  isShare,
  selected,
  hide,
  images,
  addFriend,
  ...props
}) => {
  //http://localhost:9082/shareFile
  // console.log(profileList);
  async function shareWith(id) {
    if (!window.confirm("Are You sure you want to Share Folder ?")) return;

    try {
      const folderIds = [];
      const imagesIds = [];
      let imagesRequest = {};
      for (let key in selected) {
        if (selected[key]) folderIds.push(key);
      }
      if (images && images.id) {
        images.updateImages.forEach((item) => imagesIds.push(item.id));
        imagesRequest = {
          imageIds: imagesIds,
          user_id: id,
          file_id: images.id,
          active: false,
        };
      }

      const request = { imageIds: folderIds, user_id: id, active: false };

      const requestData = images && images.id ? imagesRequest : request;
      const URL = images && images.id ? "sharePage" : "shareFile";
      const contacts = await Post(`/${URL}`, requestData);
      if (contacts.data.code == "200") {
        alert(contacts.data.message);
      }
      hide(false);
    } catch (error) {}
  }
  async function removeContact(id) {
    if (!window.confirm("Are You sure you want to remove ?")) return;

    try {
      const contacts = await Post(`/removeContact`, { id });
      if (contacts.data.code == "200") {
        alert(contacts.data.message);
      }
      window.location.reload();
    } catch (error) {}
  }

  return (
    <div className="row">
      <div className="col">
        <ul className="list-group">
          {profileLists.map((profileList, index) => (
            <li className="list-group-item li-contact-list" key={index}>
              <span> {profileList.fullname}</span>
              <span>
                {profileList &&
                  !profileList.requestAlreadySent &&
                  !profileList.alreadyFriend && (
                    <AddUser
                      onClick={() => addFriend(profileList.id)}
                    ></AddUser>
                  )}
                {profileList.requestAlreadySent && (
                  <h5 style={{ display: "inline" }}>Requested</h5>
                )}
                {profileList && profileList.requestAlreadySent && isShare && (
                  <Share onClick={() => shareWith(profileList.id)}></Share>
                )}
                {profileList && profileList.alreadyFriend && isShare && (
                  <Share onClick={() => shareWith(profileList.id)}></Share>
                )}
                {profileList.requestAlreadySent && (
                  <Close onClick={() => removeContact(profileList.id)}></Close>
                )}

                {profileList.alreadyFriend && (
                  <Close onClick={() => removeContact(profileList.id)}></Close>
                )}
              </span>
            </li>
          ))}
        </ul>
        {profileLists.length > 0 && (
          <Paginate
            setCurrentSelected={props.setCurrentItems}
            active={props.currentPaginationCount}
            count={props.totalCount}
            NextPrev={props.nextPrev}
          />
        )}
      </div>
    </div>
  );
};

export default SearchedContactList;
