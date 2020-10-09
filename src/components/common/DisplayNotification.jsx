import React from "react";

const DisplayNotification = ({ userNotifications, history, setFolderFlag }) => {
  const reDirectTo = (type, id) => {
    switch (type) {
      case "Share Book":
        // code block
        history.push("/");
        setFolderFlag("SHARED");
        //  history.push("/");
        break;
      case "Add friend":
        history.push("add-friend");
        break;
      default:
      // code block
    }
  };
  return (
    <div className="col-md-8 mt-4">
      <ul className="list-group">
        {" "}
        {userNotifications.map((notification, index) => (
          <li
            key={index}
            className="list-group-item hand"
            onClick={() => reDirectTo(notification.alert_type)}
          >
            <span> {notification.description}</span>
            <br></br>
            <span className="notification-text">
              {getTime(notification.createTime)}
            </span>
          </li>
        ))}
      </ul>{" "}
    </div>
  );
};
export default DisplayNotification;
const getTime = (time) => {
  var d1 = new Date(time); // jan,1 2011
  var d2 = new Date(); // now

  var diff = d2 - d1,
    sign = diff < 0 ? -1 : 1,
    milliseconds,
    seconds,
    minutes,
    hours,
    days;
  diff /= sign; // or diff=Math.abs(diff);
  diff = (diff - (milliseconds = diff % 1000)) / 1000;
  diff = (diff - (seconds = diff % 60)) / 60;
  diff = (diff - (minutes = diff % 60)) / 60;
  days = (diff - (hours = diff % 24)) / 24;
  if (days > 0) {
    return `${days} days ago`;
  }
  if (hours > 5) {
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
  if (seconds > 0) {
    return `${seconds} seconds ago`;
  }
  //   console.info(
  //     sign === 1 ? "Elapsed: " : "Remains: ",
  //     days + " days, ",
  //     hours + " hours, ",
  //     minutes + " minutes, ",
  //     seconds + " seconds, ",
  //     milliseconds + " milliseconds."
  //   );
};
