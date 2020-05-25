

import React from  'react' ;
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from '../create-folder/create.btn.component' ;
import GetLoader from '../../ui/loder' ;
import './create-folder.style.scss'
const FolderDisplay = ({ ToggleDescription ,onLeave, history,filteredFolder ,searchItem,isLoading ,folders ,reNameFolder ,handleEditShow  ,selectedFolderCount})=>{
  let   localRender =  (searchItem=="")?folders:filteredFolder;
   if(isLoading){
     return (<div className ="loader-display"><GetLoader/></div>)
   }else{
    return(
    
      <div style={{ display: "flex" ,flexWrap:"wrap" }}>
      {localRender.map((item ,index) => (
        <CreateFolder
          text={item.fileName}
          des={item.fileDescription} 
          date ={item.dateCreated}
          fileId ={item.id}
          imageSrc="./icon.png"
          key ={index} 
          editFolder = {reNameFolder}
          history = {history} 
          ToggleDescription = {ToggleDescription}
          selectedFolderCount = {selectedFolderCount}
          onLeave = {onLeave}
          
        ></CreateFolder>
      ))}
    </div>
    )
   }

}
export default FolderDisplay ;