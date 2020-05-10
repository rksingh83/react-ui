import React, { useState, useEffect } from "react";

const  LeftSideBar = ({item ,isActive ,changeActive})=>{

   
    return (

     <li className = {`list-group-item ${isActive?"active":""}`} onClick={()=>changeActive(item)}>{item}</li>
    )
}
 export default LeftSideBar ;