

import React from  'react' ;
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from '../create-folder/create.btn.component' ;
import GetLoader from '../../ui/loder' ;
import './create-folder.style.scss'
const FolderDisplay = ({ history,filteredFolder ,searchItem,isLoading ,folders ,reNameFolder ,handleEditShow  ,selectedFolderCount})=>{
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
          fileId ={item.id}
          imageSrc="./icon.png"
          key ={index} 
          editFolder = {reNameFolder}
          history = {history} 
          selectedFolderCount = {selectedFolderCount}
       
        ></CreateFolder>
      ))}
    </div>
    )
   }

}
export default FolderDisplay ;