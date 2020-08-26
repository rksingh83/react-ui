import React, { useEffect, useState } from "react";
import { Get, Post } from "../../service/service.setup";
import CustomLoader from "../loader/loader";
const SharedListUL = ({ list, selectedItems }) => {
  const [sharedList, setShareWithList] = useState([]);
  const [isShowLoader, setIsShowLoader] = useState(false);
  useEffect(() => {
    setIsShowLoader(true);
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
        setShareWithList([{ fullname: "Page is not shared with anyone" }]);
      }
      setIsShowLoader(false);
      setShareWithList(user.data.data.profile);
    } catch (error) {
      setIsShowLoader(false);
    }
  }
  return (
    <ul className="list-group">
      {isShowLoader && (
        <li style={{ minHeight: "5rem" }}>
          <CustomLoader />
        </li>
      )}
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
