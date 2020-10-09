import React, { useState, useEffect } from "react";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import AddContactToGroup from "./manage-group";
import { AddMemberToGroup, GetGroupMember } from "../../service/group-service";
import { ReactComponent as Share } from "../../assets/share.svg";
import Paginate from "../common/paginate";
import {
  getStartIndex,
  getPageCount,
  PAGE_OFF_SET,
} from "../common/pagination.config";
const DisplayGroupList = ({
  groups,
  update,
  updateHandler,
  profileLists,
  isShare,
  shareWith,
}) => {
  const svgStyle = {
    height: "35px",
  };

  const [openModal, setOpenModal] = useState(false);
  const [memberList, addMember] = useState([]);
  const [displayGroups, setDisplayGroups] = useState([]);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [membersInGroup, setMembersInGroup] = useState([]);

  useEffect(() => {
    const tempGroup = [...groups];
    setDisplayGroups(tempGroup.splice(0, PAGE_OFF_SET));
  }, []);
  const addMemberHandler = (e) => {
    const currentList = memberList;
    if (e.target.checked) {
      currentList.push(e.target.value);
    } else {
      let index = currentList.indexOf(e.target.value);
      if (index > -1) {
        currentList.splice(index, 1);
      }
    }

    addMember([...currentList]);
  };
  const setOpenModalHandler = (id) => {
    setOpenModal(true);
    getGroups(id);
  };
  const getGroups = async (id) => {
    const list = await GetGroupMember(id);
    if (list.data.code == "207") {
      setMembersInGroup([]);
      return;
    }
    if (list.data.data)
      setMembersInGroup(list.data.data.userGroup[0].profileList);
  };
  const saveGroupHandler = async (groupId) => {
    if (memberList.length > 0) {
      const res = await AddMemberToGroup(memberList, groupId);
      if (res.data.code == "200") {
        alert("Added Successfully");
        setOpenModal(false);
        addMember([]);
      }
    } else {
      alert("Please  Select Member");
    }
  };
  const hideModelHandler = () => {
    setOpenModal();
    addMember([]);
  };
  const paginate = (number) => {
    const allGroups = [...groups];
    setDisplayGroups(allGroups.splice(getStartIndex(number), PAGE_OFF_SET));
    setCurrentPagination(number);
  };

  const groupNextPrev = (type) => {
    if (type === "NEXT") {
      if (currentPagination == getPageCount(groups)) return;
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
          {displayGroups.map((item, index) => (
            <li className="list-group-item li-contact-list" key={index}>
              <span> {item.groupName}</span>
              {isShare && (
                <Share onClick={() => shareWith(item.groupID)}></Share>
              )}

              {!isShare && (
                <span>
                  <button
                    className="btn btn-info mr-2"
                    onClick={() => setOpenModalHandler(item.groupID)}
                  >
                    Manage Group
                  </button>
                  <AddContactToGroup
                    show={openModal}
                    profileLists={profileLists}
                    hide={setOpenModal}
                    groupId={item.groupID}
                    addMember={addMemberHandler}
                    saveGroup={saveGroupHandler}
                    currentGroupMembers={membersInGroup}
                  />
                  <Delete
                    onClick={() => update({ deleted: true, id: item.groupID })}
                    style={svgStyle}
                  />
                  <Pencil
                    onClick={() => updateHandler(item.groupID)}
                    style={svgStyle}
                  />
                </span>
              )}
            </li>
          ))}
          {groups.length == 0 && (
            <li className="list-group-item">No Group Created Yet.</li>
          )}
        </ul>
        <Paginate
          setCurrentSelected={paginate}
          active={currentPagination}
          count={getPageCount(groups)}
          NextPrev={groupNextPrev}
        />
      </div>
    </div>
  );
};
export default DisplayGroupList;
