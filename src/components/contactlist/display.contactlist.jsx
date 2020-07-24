import React from "react";
//import "./user-data.style.scss";
const ContactList = ({ profileList }) => {
  console.log(profileList);
  return (
     <div className ="row">
       <div className = "col">
         <h5>Your Contact List</h5>
       <ul class="list-group">
                {profileList.map((item, index) => (
                  <li class="list-group-item" key={index}>
                    <span> {item.fullname}</span>
                    <span style={{ paddingLeft: "50px" }}>
                    </span>
                  </li>
                ))}
       {(profileList.length==0) && <li class="list-group-item">There is no Contact request</li>  }
              </ul>
     </div>
     </div>
  );
};

export default ContactList;
