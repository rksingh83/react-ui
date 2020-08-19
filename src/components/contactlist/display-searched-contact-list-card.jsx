import React from "react";

import { Get, Post } from "../../service/service.setup";
//import "./user-data.style.scss";
import { ReactComponent as Close } from "../../assets/close.svg";
import { ReactComponent as Share } from "../../assets/share.svg";
import { ReactComponent as AddUser } from "../../assets/add-user.svg";

const ContactsCard = ({
  profileLists,
  isShare,
  selected,
  hide,
  images,
  clearList,
  addFriend,
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
      <div className="col-md-12 contact-cards-top">
        <>
          {profileLists.length > 0 && (
            <button
              className="btn btn-danger ml-2"
              onClick={() => clearList([])}
            >
              Clear ALL
            </button>
          )}
          {profileLists.map((profileList, index) => (
            <div
              key={index}
              className={`card card-body  m-2 col-md-12
            ${profileList.alreadyFriend ? "border-success" : " "}
            ${profileList.requestAlreadySent ? "border-warning" : " "}
            ${
              !profileList.requestAlreadySent && !profileList.alreadyFriend
                ? "border-info"
                : " "
            }
             `}
            >
              <ul>
                <li className="contact-card-li">
                  <div className="contact-div">
                    <span className="label-card">Name</span>{" "}
                    <span>{profileList.fullname}</span>
                  </div>
                  <div>
                    <span className="label-card">UserName</span>{" "}
                    <span>{profileList.unique_user_id}</span>
                  </div>
                </li>
                <li className="contact-card-li">
                  <div className="contact-div">
                    <span className="label-card">Gender</span>{" "}
                    <span>{profileList.gender}</span>
                  </div>
                  <div>
                    <span className="label-card">DOB</span>{" "}
                    <span>{profileList.dob}</span>
                  </div>
                </li>
                <li className="contact-card-li">
                  <div>
                    <span className="label-card">Address</span>{" "}
                    <span>
                      {profileList.address},{profileList.city},
                      {profileList.country}
                    </span>
                  </div>
                </li>
                <li
                  style={{ justifyContent: "space-between" }}
                  className="contact-card-li mt-2"
                >
                  {profileList &&
                    !profileList.requestAlreadySent &&
                    !profileList.alreadyFriend && (
                      <div>
                        <button
                          onClick={() => addFriend(profileList.id)}
                          className="btn btn-success"
                        >
                          Add Friend
                        </button>
                      </div>
                    )}{" "}
                  {profileList.requestAlreadySent && (
                    <div>
                      <span className="badge p-2 badge-info">Requested</span>
                    </div>
                  )}
                  {profileList.alreadyFriend && (
                    <div>
                      <span className="badge p-2 badge-info">Friend</span>
                    </div>
                  )}
                  {profileList.requestAlreadySent && (
                    <div>
                      <button
                        onClick={() => removeContact(profileList.id)}
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {profileList.alreadyFriend && (
                    <div>
                      {" "}
                      <button
                        onClick={() => removeContact(profileList.id)}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>{" "}
                    </div>
                  )}
                </li>
              </ul>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default ContactsCard;
