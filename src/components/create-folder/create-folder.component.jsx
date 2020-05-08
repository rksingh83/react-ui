

import React from 'react';
const CreateFolder = ({text ,openModel ,imageSrc})=>{
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
    return (
        <div style ={style}>
         <img  style={imageStyle} src = {require(`${imageSrc}`)}></img>  
    <p onClick = {()=>openModel(text)}>{text}</p> 
        </div>
    )
}

export default CreateFolder ; 