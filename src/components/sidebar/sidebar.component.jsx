
import React, { useState, useEffect } from "react";
import ModalPop from '../modal/modal.component' ;
import { Post, Get } from "../../service/service.setup";
import LeftSideBar from './left.sidebar.compoent' ;
import FolderDisplay from '../create-folder/folder-dispaly';
import TopHeader from '../top-header/top.header.component'
const SideBar = ()=>{
    const totalEle = ['My Files' ,'Recent' ,'Photos'  ,'Recycle Bin'] ;
    const [totalFolder ,setTotalFolder]= useState([])
    const [selectedFolder ,setSelectedFolder]= useState({})
    const [finalCount ,setFinalCount]= useState({})
    
    const [LiElement ,setLiEl]= useState(totalEle)
    const [activeIndex ,setActiveIndex] = useState(0)
    const [selectedItemsCount ,setSelectedItemsCount] = useState(null)
    const sideBarStyle = {
        border: "1px solid rgba(0, 0, 0, 0.125)",
        height: "90vh"
    }
    const saveFolder = (fileName ,fileDescription ,id) => {
        const dateCreated = "123";
        const requestFile = {
          filefolderRequest: [{ fileName, fileDescription ,dateCreated ,id}],
        };
        
        if(id){
          Post("mydiginotes/updateFileFolder", requestFile).then((res) =>updateName(res.data.filefolderRequest[0]));
        }else{
            pushName(requestFile.filefolderRequest[0])
       Post("mydiginotes/createFileFolder", requestFile).then((res) =>pushName(res.data.filefolderRequest[0]));
        }
      };
     const handleActive = (e)=>{
        setActiveIndex(LiElement.indexOf(e));
        setLiEl(totalEle)
     }
   
     useEffect(() => {
        const requestFile = { filefolderRequest:[]}
        Post('mydiginotes/getAllFiles',requestFile)
        .then((res)=>{
          if(res.data.filefolderRequest){
            setTotalFolder(res.data.filefolderRequest) ;
          }
       })
     },[]);
     const pushName = (name) => {
        setTotalFolder([...totalFolder, name]);
        console.log(totalFolder)
      };
      const reNameFolderHandler = (name,des,id)=>{
             console.log(name)
      }
      const updateName =(file ,isDeleted=false)=>{
        let updated = [] ;
      
        if(isDeleted){
              let deletedIds = (file.filefolderRequest.map((item=>item.id))) 
               updated = totalFolder.filter((item)=>!deletedIds.includes(item.id))
        }else{
           updated = totalFolder.map(item=>{
              if(file.id==item.id){
                item.fileDescription=file.fileDescription;
                item.fileName=file.fileName;
              }
              return item ;
            })
        }     
            setTotalFolder(updated)
          }
    const selectedFolderCountHandler = (id , value)=>{
          let tempObj = {}
          tempObj[id] = value ;
          setSelectedFolder({...selectedFolder, ...tempObj})
    
    }
    const deleteHandler = (folderList,resArr) =>{
        Post("mydiginotes/updateFileFolder", folderList)
        .then((res) =>updateName(folderList, true));
    }
   
    return(
        <React.Fragment>
        
       <TopHeader totalFolders = {totalFolder} 
       selectedItems = {selectedFolder} 
       deleteHandler ={deleteHandler}
       saveFolder ={saveFolder}/>
        <div className ="row">
            <div className ="col-md-2">
            <ul className="list-group" style ={sideBarStyle}>
            {LiElement.map((item ,index)=><LeftSideBar 
            item={item}
            key = {index}
            isActive = {(activeIndex==index)?true:false}
            changeActive = {handleActive}
            />)}
            </ul>
            </div>
            <div className ="col-md-9">
            <FolderDisplay selectedFolderCount ={selectedFolderCountHandler}  reNameFolder ={reNameFolderHandler} folders ={totalFolder}/>
            </div>
        </div>
        </React.Fragment>
    )
}
export default SideBar ;