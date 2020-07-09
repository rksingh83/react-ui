import React, { useState, useEffect } from "react";

const  LeftSideBar = ({item ,isActive ,changeActive})=>{

   
    return (

     <li className = {`custom-pad-li list-group-item ${isActive?"active":""}`} onClick={()=>changeActive(item)}>{item}</li>
    )
}
 export default LeftSideBar ;