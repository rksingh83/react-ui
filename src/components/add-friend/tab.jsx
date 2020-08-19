import React from "react";

const ListTabs = ({setCurrentTab , currentTab}) => {
  return (
    <ul className="nav nav-pills nav-justified mb-2">
      <li
        className={`nav-link p-2 ${currentTab == "CONTACTS" ? "active" : ""}`}
        onClick={() => setCurrentTab("CONTACTS")}
      >
        Contacts
      </li>
      <li
        className={`nav-link p-2 ${currentTab == "GROUPS" ? "active" : ""}`}
        onClick={() => setCurrentTab("GROUPS")}
      >
        Groups
      </li>
    </ul>
  );
};
export default ListTabs ;