import React from "react";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
const DisplayContact = ({ profileLists, addMember }) => {
  const svgStyle = {
    height: "35px",
  };
  console.log(profileLists);
  return (
    <div className="row">
      <div className="col">
        <ul className="list-group">
          {profileLists.map((item, index) => (
            <li className="list-group-item li-contact-list" key={index}>
              <span> {item.fullname}</span>
              <span>
                <input
                  onClick={(e) => addMember(e)}
                  type="checkbox"
                  class="form-check-input"
                  value={item.id}
                />
              </span>
            </li>
          ))}
          {profileLists.length == 0 && (
            <li class="list-group-item">There is no data request</li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default DisplayContact;
