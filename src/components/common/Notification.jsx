import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import {
  setNotification,
  setNotificationCount,
} from "../../redux/notifications/notification.actions";
import { connect } from "react-redux";
import {
  getNotifications,
  getAlertNotifications,
} from "../../service/notification";
const Notification = ({
  setNotifications,
  userNotifications,
  userNotificationCount,
  setNotificationCount,
}) => {
  useEffect(() => {
    getAllNotificationsMarkedRead();
    getAlertNotification();
    setNotificationCount(0);
  }, []);

  const getAllNotificationsMarkedRead = async () => {
    const response = await getNotifications();
    console.log(response);
  };
  const getAlertNotification = async () => {
    const response = await getAlertNotifications();
    console.log(response);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-4">
            <ul className="list-group">
              {" "}
              {userNotifications.map((notification) => (
                <li className="list-group-item"> {notification} </li>
              ))}
            </ul>{" "}
          </div>{" "}
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setNotifications: (notification) => dispatch(setNotification(notification)),
  setNotificationCount: (count) => dispatch(setNotificationCount(count)),
});
const mapStateToPros = ({
  notifications: { userNotifications },
  notificationCount: { userNotificationCount },
}) => ({
  userNotifications,
  userNotificationCount,
});
export default connect(mapStateToPros, mapDispatchToProps)(Notification);
