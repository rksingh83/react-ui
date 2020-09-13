import React from "react";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
const DisplayContact = ({ profileLists, addMember, isShowCheckedBox }) => {
  const checkboxStyle = {
    height: "1.2rem",
    width: "3rem",
    position: "relative",
  };
  
  return (
    <div className="row">
      <div className="col">
        <ul className="list-group">
          {profileLists.map((item, index) => (
            <li className="list-group-item li-contact-list" key={index}>
              <span> {item.fullname}</span>
              <span>
                {isShowCheckedBox && (
                  <input
                    onClick={(e) => addMember(e)}
                    type="checkbox"
                    className="form-check-input"
                    value={item.id}
                    style={checkboxStyle}
                  />
                )}
              </span>
            </li>
          ))}
          {profileLists.length == 0 && (
            <li className="list-group-item">There is no data request</li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default DisplayContact;
