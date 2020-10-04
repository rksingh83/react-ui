import React, {
  useEffect,
  useState
} from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import {
  setNotification
} from "../../redux/notifications/notification.actions";
import {
  connect
} from "react-redux";
const Notification = ({
  setNotifications,
  userNotifications,
}) => {
  useEffect(() => {
    connect();
  }, []);


  return (

    <>
  <div className  ="container">
    <div className ="row">
      <div className ="col-md-12 my-4">
      <ul className="list-group">
        {userNotifications.map((notification)=>(
        <li className="list-group-item">{notification}</li>
        ))}
 
  </ul>
      </div>
    </div>

  </div>

    </>
  );
};

//</h2>export default Notification;

const mapDispatchToProps = (dispatch) => ({
  setNotifications: (notification) => dispatch(setNotification(notification)),
});
const mapStateToPros = ({
  notifications: {
    userNotifications
  },
}) => ({

  userNotifications
});
export default connect(mapStateToPros, mapDispatchToProps)(Notification);