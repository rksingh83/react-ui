import React ,{useState ,useEffect} from "react";

import { Get, Post } from "../../service/service.setup";
//import "./user-data.style.scss";
import { ReactComponent as Close } from "../../assets/close.svg";
import { ReactComponent as Share } from "../../assets/share.svg";
import Paginate from "../common/paginate";
import {
  getStartIndex,
  getPageCount,
  PAGE_OFF_SET,
} from "../common/pagination.config";
const ContactList = ({ profileList, isShare, selected, hide, images }) => {
  const [displayContacts, setDisplayContacts] = useState([]);
  const [currentPagination, setCurrentPagination] = useState(1);
  useEffect(() => {
    const tempContacts = [...profileList];
    setDisplayContacts(tempContacts.splice(0, PAGE_OFF_SET));
  }, []);
  //http://localhost:9082/shareFile
  async function shareWith(id) {
    if (!window.confirm("Are you sure you want to Share Folder ?")) return;

    try {
      const folderIds = [];
      const imagesIds = [];
      let imagesRequest = {};
      for (let key in selected) {
        if (selected[key]) folderIds.push(key);
      }
      if (images && images.id) {
        images.updateImages.forEach((item) => imagesIds.push(item.id));
        imagesRequest = {
          imageIds: imagesIds,
          user_id: id,
          file_id: images.id,
          active: true,
        };
      }

      const request = { imageIds: folderIds, user_id: id, active: true };

      const requestData = images && images.id ? imagesRequest : request;
      const URL = images && images.id ? "sharePage" : "shareFile";
      const contacts = await Post(`/${URL}`, requestData);
      if (contacts.data.code == "200") {
        alert(contacts.data.message);
        window.location.reload()
      }
      hide(false);
    } catch (error) {}
  }
  async function removeContact(id) {
    if (!window.confirm("Are you sure you want to remove ?")) return;

    try {
      const contacts = await Post(`/removeContact`, { id });
      if (contacts.data.code == "200") {
        alert(contacts.data.message);
      }
      window.location.reload();
    } catch (error) {}
  }
  const paginate = (number) => {
    const allContacts = [...profileList];
    setDisplayContacts(allContacts.splice(getStartIndex(number), PAGE_OFF_SET));
    setCurrentPagination(number);
  };

  const contactsNextPrev = (type) => {
    if (type === "NEXT") {
      if (currentPagination == getPageCount(profileList)) return;
      paginate(currentPagination + 1);
    } else {
      if (currentPagination == 1) return;
      paginate(currentPagination - 1);
    }
  };
  return (
    <div className="row">
      <div className="col">
        <ul className="list-group">
          {profileList.map((item, index) => (
            <li className="list-group-item li-contact-list" key={index}>
              <span> {item.fullname}</span>
              <span>
                {isShare && <Share onClick={() => shareWith(item.id)}></Share>}

                {!isShare && (
                  <Close onClick={() => removeContact(item.id)}></Close>
                )}
              </span>
            </li>
          ))}
          {profileList.length == 0 && (
            <li className="list-group-item">No Contact Found.</li>
          )}
        </ul>
        <Paginate
        setCurrentSelected={paginate}
        active={currentPagination}
        count={getPageCount(profileList)}
        NextPrev ={contactsNextPrev}
      />
      </div>
    </div>
  );
};

export default ContactList;
