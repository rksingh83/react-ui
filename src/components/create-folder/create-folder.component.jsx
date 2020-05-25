


import React  ,{useState ,useEffect} from 'react';
import {ReactComponent as Select} from './interface.svg';
import './create-folder.style.scss';
import {ReactComponent as Tick} from '../../assets/tick.svg';
const createHistory = require("history").createBrowserHistory;
const CreateFolder = ({history  ,date,onLeave ,ToggleDescription ,text ,fileId, des ,imageSrc ,editFolder ,selectedFolderCount ,displayValue})=>{
   
    const style = {
    display : "flex" ,
    alignItems:"center" ,
    flexDirection :"column" ,
    justifyContent :"center" ,
    cursor:"pointer" ,
    position:"relative" ,
    padding: "10px",
    margin: "10px",
    position:'relative'

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
    console.log(toggleValue)

    setDisplayClass(toggleValue) ;
    selectedFolderCount(id ,toggleValue);
   
    
}
const nevigateFolder =(fileId)=>{
    history.push(`/uploadFile/${fileId}`);
    
}


    return (
        
        <div  onMouseEnter ={()=>ToggleDescription(des , date)} onMouseLeave ={()=>onLeave(false)}
         className= {`mainDiv `}  style ={style}>
       <Tick style ={{display:displayClass?'block':'' ,opacity :displayClass?'1':''}} onClick ={()=>toggleEl(fileId)} className ="tick"/>
        <div  className  = {`hoverDiv ${displayClass?"active":""}`} >
            {/* <Select style ={{width:"30%",height:"30%"}} onClick = {()=>editFolder(text ,des ,fileId)}></Select> */}
        </div>
         <img  onClick ={()=>nevigateFolder(fileId)}  style={imageStyle} src = {require(`${imageSrc}`)}></img>  
    <p className ="folder-link" onClick ={()=>nevigateFolder(fileId)} >{text}</p> 
        </div>
    )
}

export default CreateFolder ; 