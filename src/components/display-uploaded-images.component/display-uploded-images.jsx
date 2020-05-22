



import React from  'react' ;
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from '../create-folder/create.btn.component' ;
import GetLoader from '../../ui/loder' ;
import './create-image.style.scss'
const DisplayImages = ({images , isLoading})=>{

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
        ></img>
        </div>
      ))}
    </div>
    )
   }

}
export default DisplayImages ;