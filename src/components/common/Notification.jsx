import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
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
  userNotificationCount,
  setNotificationCount,
  setFolderFlag,
  history
}) => {
  const [userNotifications, setUserNotification] = useState([]);
  useEffect(() => {
    getAllNotificationsMarkedRead();
    getAlertNotification();
    setNotificationCount(0);
  }, []);
  const reDirectTo = (type, id) => {
    switch (type) {
      case "Share Book":
        // code block
        history.push("/");
        setFolderFlag("SHARED");
       //  history.push("/");
        break;
      case  'Add friend':
        history.push("add-friend");
        break;
      default:
      // code block
    }
  };
  const getAllNotificationsMarkedRead = async () => {
    const response = await getNotifications();
    console.log(response);
  };
  const getAlertNotification = async () => {
    const response = await getAlertNotifications();
    setUserNotification(response.data.data.alertList);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-4">
            <ul className="list-group">
              {" "}
              {userNotifications.map((notification, index) => (
                <li
                  key={index}
                  className="list-group-item hand"
                  onClick={() => reDirectTo(notification.alert_type)}
                >
                  {" "}
                  {notification.description}{" "}
                </li>
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
  setFolderFlag: (flag) => dispatch(setFolderFlag(flag)),
});
const mapStateToPros = ({
  notifications: { userNotifications },
  notificationCount: { userNotificationCount },
}) => ({
  userNotifications,
  userNotificationCount,
});
export default connect(mapStateToPros, mapDispatchToProps)(Notification);
