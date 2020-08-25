import React, { useEffect, useState } from "react";
import { Get, Post } from "../../service/service.setup";
const SharedListUL = ({ list, selectedItems }) => {
  const [sharedList, setShareWithList] = useState([]);
  useEffect(() => {
    let fileId = 0;
    for (let key in selectedItems) {
      if (selectedItems[key]) {
        fileId = key;
      }
    }
    getFolders(fileId);
  }, []);

  async function getFolders(fileId) {
    try {
      const user = await Post("/getFileSharedList", {
        fileId,
      });
      if (
        user.data.code == "200" &&
        user.data.message == "Page is not shared with anyone."
      ) {
        alert(user.data.message);
      }
      setShareWithList(user.data.data.profile);
    } catch (error) {}
  }
  return (
    <ul className="list-group">
      {sharedList.map((item, index) => (
        <li className="list-group-item li-contact-list" key={index}>
          <span> {item.fullname}</span>
          {item.fullaccess && <span>Full Access</span>}
        </li>
      ))}
    </ul>
  );
};

export default SharedListUL;
