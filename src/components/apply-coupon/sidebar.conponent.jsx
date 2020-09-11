import  React from 'react'
import { Link } from "react-router-dom";
const SideBar = () => (
  <div className=" custom-pad-li d-none d-sm-block col-md-2 p-0">
    <Link className="logo-container" to="/">
      <ul className=" ul-pad list-group left-side-bar">
        <li className="custom-pad-li list-group-item active">Home</li>
      </ul>
    </Link>
  </div>
);
export default SideBar;
