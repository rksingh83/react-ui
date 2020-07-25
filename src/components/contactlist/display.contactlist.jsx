import React from "react";
import { ReactComponent as Share } from "../../assets/share.svg";
import { Get, Post } from "../../service/service.setup";
//import "./user-data.style.scss";
const ContactList = ({ profileList ,isShare , selected ,hide}) => {
  //http://localhost:9082/shareFile
  console.log(selected)
  async function shareWith(id) {
    if (!window.confirm("Are You sure you want to Share Folder ?")) return;

    try {
      const folderIds = [] ;
      for (let key in selected) {
        if (selected[key]) folderIds.push(key);
      }
      const request  = {imageIds:folderIds,user_id:id ,active:true}
      const contacts = await Post("/shareFile",request) ;
       if(contacts.data.code =='200'){
         alert(contacts.data.message)
       }
       hide(false)
    
    } catch (error) {}
  }
  return (
     <div className ="row">
       <div className = "col">
         <h5>Your Contact List</h5>
       <ul class="list-group">
                {profileList.map((item, index) => (
                  <li className="list-group-item" key={index}>
                    <span> {item.fullname}</span>
                    <span style={{ paddingLeft: "50px" }}>
                      {isShare&&<Share onClick ={()=>shareWith(item.id)} ></Share>}
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
