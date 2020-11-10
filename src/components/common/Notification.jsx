import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
import SideBar from "../apply-coupon/sidebar.conponent";
import DisplayNotification from "./DisplayNotification";
import Paginate from "../common/paginate";
import {
  getNotificationsIndex as getStartIndex,
  getNotificationCount as getPageCount,
  NOTIFICATION_OFF_SET as PAGE_OFF_SET
} from "../common/pagination.config";
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
  const [displayUserNotifications, setDisplayUserNotification] = useState([]);
  const [currentPagination, setCurrentPagination] = useState(1);
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
    const tempGroup = [...response.data.data.alertList];
    setDisplayUserNotification(tempGroup.splice(0, PAGE_OFF_SET));
  };
  const refresh = () => {
    // window.location.reload();
  };
  const paginate = (number) => {
    const allNotifications = [...userNotifications];
    setDisplayUserNotification(
      allNotifications.splice(getStartIndex(number), PAGE_OFF_SET)
    );
    setCurrentPagination(number);
  };

  const groupNextPrev = (type) => {
    if (type === "NEXT") {
      if (currentPagination == getPageCount(userNotifications)) return;
      paginate(currentPagination + 1);
    } else {
      if (currentPagination == 1) return;
      paginate(currentPagination - 1);
    }
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
        <div
          className="col-md-10"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DisplayNotification
            history={history}
            userNotifications={displayUserNotifications}
            setFolderFlag={setFolderFlag}
          />
          <Paginate
            setCurrentSelected={paginate}
            active={currentPagination}
            count={getPageCount(userNotifications)}
            NextPrev={groupNextPrev}
          />
        </div>
        <div className="row">
          <div className="col-md-10"></div>
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
