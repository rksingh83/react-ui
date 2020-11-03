import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactComponent as Logout } from "../../assets/exit.svg";
import "./header.style.scss";
import "bootstrap/js/src/collapse.js";
import { connect } from "react-redux";
import { getUserId } from "../../service/notification";
import { ToastContainer, toast } from "react-toastify";
import {
  setNotification,
  setNotificationCount,
} from "../../redux/notifications/notification.actions";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { BASE_URL } from "../../service/service.setup";
const Header = ({
  currentUser,
  hidden,
  setNotifications,
  userNotifications,
  userNotificationCount,
  setNotificationCount,
}) => {
  const imgStyle = { width: "27px" };
  const [flashMessage, setFashMessage] = useState(false);
  const ROLE =     currentUser && currentUser.authentication.role
  
  useEffect(() => {
    if (currentUser) connect(userNotificationCount);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setFashMessage(false);
    }, 20000);
    return () => clearInterval(interval);
  }, []);
  function connect(count) {
    var socket = SockJS(`${BASE_URL}/tutorialspoint-websocket`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      // setConnected(true);
      stompClient.subscribe("/topic/greetings", function (greeting) {
        let currentNotification = [
          ...userNotifications,
          JSON.parse(greeting.body).description,
        ];

        const data = JSON.parse(greeting.body);
        if (data.description && data.user_id == currentUser.authentication.id) {
          updateStateCount(data.total_unread_notification);
          setFashMessage(data.description);
          // toast.error(data.description);
        }
        setNotifications(currentNotification);
      });
    });
  }
  const updateStateCount = (count) => {
    const currentCountState = parseInt(count);

    setNotificationCount(count);
  };
  return (
    <>
      {flashMessage && (
        <div className="flash-message">
          <span className="p-3">{flashMessage} </span>
          <span className="cross-btn">
            <i onClick={() => setFashMessage(false)} class="fas fa-times"></i>
          </span>
        </div>
      )}
      <nav className="navbar navbar-expand-lg navbar-light custom-bg">
        <Link className="logo-container navbar-brand" to="/">
          <img style={imgStyle} src={require("../../assets/logo.png")}></img>

          <span className="home">My Digi Network</span>
        </Link>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto text-white">
         {ROLE !="labeller" && <li className="nav-item">
              <Link className="option nav-link text-white" to="/">
                Home
              </Link>
            </li>
         }
            {currentUser && ROLE !="labeller" &&(
              <li className="nav-item">
                <Link
                  className="option nav-link text-white"
                  to="/add-friend/USERS"
                >
                  Contacts
                </Link>
              </li>
            )}
            {currentUser ? (
              ""
            ) : (
              <li className="nav-item">
                <Link className="option nav-link text-white" to="/login">
                  Login
                </Link>
              </li>
            )}
            {currentUser ? (
              ""
            ) : (
              <li className="nav-item">
                <Link className="option nav-link text-white" to="/signup">
                  Signup
                </Link>
              </li>
            )}
            {currentUser && ROLE !="labeller" &&(
              <li className="nav-item">
                <Link className="option nav-link text-white" to="/profile">
                  Profile
                </Link>
              </li>
            )}
            {currentUser && ROLE !="labeller" && (
              <li className="nav-item">
                <Link className="option nav-link text-white" to="/coupon">
                  Coupon
                </Link>
              </li>
            )}
            {/* <li className="nav-item">
            <a
              className="option nav-link text-white"
              href="./app-debug.apk"
              download
            >
              Download Android APK
            </a>
          </li> */}
            <li className="nav-item">
              <Link className="option nav-link text-white" to="contact-us">
                Help
              </Link>
            </li>
            <li className="nav-item">
              <Link className="option nav-link text-white" to="tnc">
                Terms And Condition
              </Link>
            </li>
            {currentUser && (
              <li className="nav-item">
                <Link className="option nav-link text-white" to="/notification">
                  <i className="fas fa-bell " style={{ fontSize: "25px" }}></i>
                  <span className="badge badge-danger mb-2">
                    {userNotificationCount}
                  </span>
                </Link>
              </li>
            )}
            {currentUser ? (
              <li className="nav-item">
                <Link className="option nav-link text-white" to="/logout">
                  <Logout style={{ height: "28px" }} />
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setNotifications: (notification) => dispatch(setNotification(notification)),
  setNotificationCount: (count) => dispatch(setNotificationCount(count)),
});
const mapStateToPros = ({
  user: { currentUser },
  notifications: { userNotifications },
  notificationCount: { userNotificationCount },
}) => ({ currentUser, userNotifications, userNotificationCount });
export default connect(mapStateToPros, mapDispatchToProps)(Header);
