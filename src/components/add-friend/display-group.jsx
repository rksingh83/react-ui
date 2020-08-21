import React, { useState } from "react";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import AddContactToGroup from "./manage-group";
import { AddMemberToGroup } from "../../service/group-service";
const DisplayGroupList = ({ groups, update, updateHandler, profileLists }) => {
  const svgStyle = {
    height: "35px",
  };
  console.log(profileLists, "contact");
  const [openModal, setOpenModal] = useState(false);
  const [memberList, addMember] = useState([]);
  const addMemberHandler = (e) => {
    console.log(e.target.value);
    const currentList = memberList;
    if (e.target.checked) {
      currentList.push(e.target.value);
    } else {
      let index = currentList.indexOf(e.target.value);
      if (index > -1) {
        currentList.splice(index, 1);
      }
    }
    console.log(currentList);
    addMember([...currentList]);
  };
  const saveGroupHandler = async (groupId) => {
    if (memberList.length > 0) {
      const res = await AddMemberToGroup(memberList, groupId);
      if (res.data.code == "200") {
        alert("Added Successfully");
        setOpenModal(false);
      }
    }
  };

  return (
    <div className="row">
      <div className="col">
        <ul className="list-group">
          {groups.map((item, index) => (
            <li className="list-group-item li-contact-list" key={index}>
              <span> {item.groupName}</span>
              <span>
                <button
                  className="btn btn-success mr-2"
                  onClick={() => setOpenModal(true)}
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
            </li>
          ))}
          {groups.length == 0 && (
            <li class="list-group-item">There is no group request</li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default DisplayGroupList;
