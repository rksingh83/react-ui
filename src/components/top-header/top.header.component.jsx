

import React ,{useState} from 'react'
import Modal from "react-bootstrap/Modal";
import Input from "../boostrapinput/input.component";

const TopHeader = ({saveFolder , selectedItems , totalFolders ,deleteHandler})=>{
  
    const [show, setShow] = useState(false);
    const [fileName, addName] = useState("");
    const [fileDescription, addDisc] = useState("");
    const [id, setId] = useState('');
    const  saveHandler = ()=>{
    saveFolder(fileName,fileDescription ,id) ;
    addName("") ;
    addDisc('') ;
    setId('') ;
    setShow(false)

   }
   const  topRowStyle = {
    padding:"10px 10px" ,
    background:"rgba(0, 0, 0, 0.125)"
    }
    let totalItem = 0 ;
    for(let key in selectedItems){
        if(selectedItems[key])
        totalItem++
    }
    const reNameFolder = (isDelete)=>{
         let deletedArr  = [] ;
         let restArr  = [] ;
         const deleted = 1
         for(let key in selectedItems){
            if(selectedItems[key]){
             deletedArr.push({...(totalFolders.filter((item)=>item.id == key))[0],deleted})
            }else{
                restArr.push({...(totalFolders.filter((item)=>item.id == key))[0]})
            }
            
        }
        console.log(deletedArr);
        console.log(totalFolders);
        console.log(isDelete) ;
        setId(deletedArr[0].id);
        addDisc(deletedArr[0].fileDescription);
        addName(deletedArr[0].fileName);
        if(!isDelete)
           setShow(true) ;
        const requestFile = {
            filefolderRequest:deletedArr
          };
          if(isDelete)
          deleteFolders(requestFile ,restArr) ;
    }
    const deleteFolders = (requestFile ,restArr)=>{
             console.log(requestFile)
             deleteHandler(requestFile ,restArr) ;
    }
    return(
        <div className ="row" style ={topRowStyle}>
        <div className ="col-md-12 ">
            <div className ="row">
            <div className ="col-md-2">Search Anything</div>
            <div className ="col-md-1">Share</div>
            <div className ="col-md-1"  onClick={()=>reNameFolder(true)}>Delete</div>
            <div className ="col-md-1">Move</div>
            <div className ="col-md-1"onClick={()=>reNameFolder(false)}>Rename</div>
            <div className ="col-md-1" onClick={()=>setShow(true)}>Create Folder</div>
    <div className = {`col-md-1 ${(totalItem==0)?"hideCount":""}`}>{totalItem} Selected</div>
    <div className ="col-md-1" onClick={()=>window.location.reload()}>Refresh</div>
    
            
            </div>
        </div>
        <Modal show={show} onHide={()=>setShow(false)} animation={true}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <Input
            placeholder="Enter your folder"
            label="Folder"
            value={fileName}
            handleChange={(e)=>addName(e.target.value)}
            name="folder"
            type="input"
          ></Input>
          <Input
            placeholder="Enter your Name"
            label="Discreption"
            value={fileDescription}
            handleChange={(e)=>addDisc(e.target.value)}
            name="dis"
            type="input"
          ></Input>
           <Input
           
            value={''}
            handleChange={()=>setId(id)}
            name="id"
            type="hidden"
          ></Input>
        </Modal.Body>
        <Modal.Footer>
          <button
            class="btn-danger btn"
            variant="secondary"
            onClick ={()=>setShow(false)}
          >
            Close
          </button>
          <button
            className="btn btn-success"
            variant="primary"
            onClick={saveHandler}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    

    </div>
    )
}
export default  TopHeader ;