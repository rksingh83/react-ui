

import React from  'react' ;
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from '../create-folder/create.btn.component' ;
import GetLoader from '../../ui/loder' ;
import './create-folder.style.scss'
const FolderDisplay = ({ filteredFolder ,searchItem,isLoading ,folders ,reNameFolder ,handleEditShow ,history ,selectedFolderCount})=>{
  let   localRender =  (searchItem=="")?folders:filteredFolder;
   if(isLoading){
     return (<div className ="loader-display"><GetLoader/></div>)
   }else{
    return(
    
      <div style={{ display: "flex" }}>
      {localRender.map((item ,index) => (
        <CreateFolder
          text={item.fileName}
          des={item.fileDescription} 
          fileId ={item.id}
          imageSrc="./download.png"
          key ={index} 
          editFolder = {reNameFolder} 
          selectedFolderCount = {selectedFolderCount}
       
        ></CreateFolder>
      ))}
    </div>
    )
   }

}
export default FolderDisplay ;