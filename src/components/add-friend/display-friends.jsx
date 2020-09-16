import React from "react";
import { ReactComponent as Yes } from "../../assets/yes.svg";
import { ReactComponent as Close } from "../../assets/close.svg";

const FriendList = ({ friendList, acceptFriend, rejectFriend }) => (
  <>
    <h5>Friend list</h5>
    <ul className="list-group">
      {friendList.map((item, index) => (
        <li className="list-group-item" key={index}>
          <span> {item.fullname}</span>
          <span style={{ paddingLeft: "50px" }}>
            <Yes onClick={() => acceptFriend(item.id)}></Yes>{" "}
            <Close onClick={() => rejectFriend(item.id)}></Close>{" "}
          </span>
        </li>
      ))}
      {friendList.length == 0 && (
        <li className="list-group-item">No Contact Request.</li>
      )}
    </ul>
  </>
);
export default FriendList ;
