


import React  ,{useState ,useEffect} from 'react';
import {ReactComponent as Select} from './interface.svg';
import './create-folder.style.scss'
const createHistory = require("history").createBrowserHistory;
const CreateFolder = ({history ,ToggleDescription ,text ,fileId, des ,imageSrc ,editFolder ,selectedFolderCount ,displayValue})=>{
   
    const style = {
    display : "flex" ,
    alignItems:"center" ,
    flexDirection :"column" ,
    justifyContent :"center" ,
    cursor:"pointer" ,
    position:"relative" ,
    padding: "10px",
    margin: "10px"

}
const [displayClass  ,setDisplayClass] = useState(displayValue)
 
const imageStyle = {
    
    width:"30%",
    zIndex:2


}
;

const hover = {
    position:"absolute" ,
    width:"100%",
    height:"100%",
    background:"rgba(0, 0, 0, 0.125)"
}
const toggleEl = (id)=>{
    
    const toggleValue = !displayClass;

    setDisplayClass(toggleValue) ;
    selectedFolderCount(id ,toggleValue);
   
    
}
const nevigateFolder =(fileId)=>{
    history.push(`/uploadFile/${fileId}`);
    
}


    return (
        
        <div  onMouseEnter ={()=>ToggleDescription(des)} className= {`mainDiv `} onClick ={()=>toggleEl(fileId)} style ={style}>
    
        <div  className  = {`hoverDiv ${displayClass?"active":""}`} >
            <Select style ={{width:"30%",height:"30%"}} onClick = {()=>editFolder(text ,des ,fileId)}></Select>
        </div>
         <img  onClick ={()=>nevigateFolder(fileId)}  style={imageStyle} src = {require(`${imageSrc}`)}></img>  
    <p onClick = {()=>editFolder(text ,des ,fileId)}>{text}</p> 
        </div>
    )
}

export default CreateFolder ; 