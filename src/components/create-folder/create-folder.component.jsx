

import React from 'react';
const createHistory = require("history").createBrowserHistory;
const CreateFolder = ({history ,text ,fileId, des ,openModel ,imageSrc})=>{
const style = {
    display : "flex" ,
    alignItems:"center" ,
    flexDirection :"column" ,
    justifyContent :"center" ,
    cursor:"pointer"

}
 console.log(history)
const imageStyle = {
    
    width:"30%"

}
//console.log("ID" ,fileId)
    return (
        <div style ={style}>
         <img  onClick ={()=>history.push('/uploadFile')}  style={imageStyle} src = {require(`${imageSrc}`)}></img>  
    <p onClick = {()=>openModel(text ,des ,fileId)}>{text}</p> 
        </div>
    )
}

export default CreateFolder ; 