

import React from 'react';
const createHistory = require("history").createBrowserHistory;
const CreateFolder = ({text ,fileId, des ,openModel ,imageSrc})=>{
const style = {
    display : "flex" ,
    alignItems:"center" ,
    flexDirection :"column" ,
    justifyContent :"center" ,
    cursor:"pointer"

}
 
const imageStyle = {
    
    width:"30%"

}
//console.log("ID" ,fileId)
    return (
        <div style ={style}>
         <img    style={imageStyle} src = {require(`${imageSrc}`)}></img>  
    <p onClick = {()=>openModel(text ,des ,fileId)}>{text}</p> 
        </div>
    )
}

export default CreateFolder ; 