import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
import SideBar from "../apply-coupon/sidebar.conponent";
import DisplayNotification from "./DisplayNotification";
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
  history,
}) => {
  const [userNotifications, setUserNotification] = useState([]);
  useEffect(() => {
    refresh();
    getAllNotificationsMarkedRead();
    getAlertNotification();
    setNotificationCount(0);
  }, [userNotificationCount]);

  const getAllNotificationsMarkedRead = async () => {
    const response = await getNotifications();

  };
  const getAlertNotification = async () => {
    const response = await getAlertNotifications();
    setUserNotification(response.data.data.alertList);
  };
  const refresh = () => {
    // window.location.reload();
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <nav
            style={{ minHeight: "3rem" }}
            className="navbar navbar-expand-lg navbar-light sec-header-bg"
          ></nav>
        </div>
      </div>
      <div className="row m-0">
        <SideBar />
        <div className="col-md-10" style ={{display:'flex',justifyContent:'center'}}>
          <DisplayNotification
            history={history}
            userNotifications={userNotifications}
            setFolderFlag ={setFolderFlag}
          />
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
