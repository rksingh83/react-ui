



import React from  'react' ;
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from '../create-folder/create.btn.component' ;
import GetLoader from '../../ui/loder' ;
import './create-image.style.scss' ;

const DisplayImages = ({images , folderId ,isLoading , onHove , history})=>{

   if(isLoading){
     return (<div className ="loader-display"><GetLoader/></div>)
   }else{
   
    return(
    
      <div style={{ display: "flex" ,flexWrap:"wrap" }}>
      {images.map((item ,index) => (
       <div className ="image-container">
       <img
         src ={item.align_image_thumb}
         key = {index}
         onClick = {()=>history.push(`/original/${item.id}/${folderId}`)}
         onMouseEnter ={()=>onHove(item.id,item.description)}
        ></img>
        </div>
      ))}
    </div>
    )
   }

}
export default DisplayImages ;