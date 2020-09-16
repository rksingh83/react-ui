import React from "react";
import { Link } from "react-router-dom";
const LeftSideBar = ({ menus, currentMenu, setMenu }) => (
  <div className=" custom-pad-li d-none d-sm-block col-md-2 p-0">
    <ul className=" ul-pad list-group left-side-bar">
      <Link className="logo-container" to="/">
        <li className="custom-pad-li list-group-item">Home</li>
      </Link>
      {menus.map((menu) => (
        <li
          onClick={() => setMenu(menu.key)}
          className={`custom-pad-li list-group-item ${
            currentMenu == menu.key ? "active" : ""
          }`}
        >
          {menu.value}
        </li>
      ))}
    </ul>
  </div>
);
export default LeftSideBar;
