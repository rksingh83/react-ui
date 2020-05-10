

import React from  'react' ;
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from '../create-folder/create.btn.component' ;
const FolderDisplay = ({folders ,reNameFolder ,handleEditShow ,history ,selectedFolderCount})=>{

  
    return(
        <div style={{ display: "flex" }}>
           
        {folders.map((item ,index) => (
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
export default FolderDisplay ;