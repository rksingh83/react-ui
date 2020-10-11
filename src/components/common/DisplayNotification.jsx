import React from "react";

const DisplayNotification = ({ userNotifications, history, setFolderFlag }) => {
  const reDirectTo = (type, id, fileId) => {
    console.log(type);
    switch (type) {
      case "Share Book":
        history.push("/");
        setFolderFlag("SHARED");
        break;
      case "Add Friend":
        history.push("add-friend/USERS");
        break;
        break;
      case "Accept Friend":
        history.push("add-friend/CONTACTS");
        break;
      case "Add Group":
        history.push("add-friend/GROUPS");
        break;
      case "Edit Folder":
        history.push("/");
        setFolderFlag("SHARED");
        break;
      case "Share Page":
        setFolderFlag("SHARED");
        history.push(`/original/${id}/${fileId}`);
        break;
      case "Edit Page":
        setFolderFlag("SHARED");
        history.push(`/original/${id}/${fileId}`);
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
            onClick={() =>
              reDirectTo(
                notification.alert_type,
                notification.redirectId,
                notification.fileid
              )
            }
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
  time = getISTTime(time);
  var s = new Date(time).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
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
const getISTTime = (tme) => {
  let d = new Date(tme);
  return new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
};
