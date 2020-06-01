import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import Input from "../boostrapinput/input.component";
import CreateFolder from "../create-folder/create-folder.component";
import ModalHeader from "react-bootstrap/ModalHeader";
import { Post, Get } from "../../service/service.setup";
import {connect} from 'react-redux';
const ModalPop = ({ history, currentFile, openModel }) => {
  const [show, setShow] = useState(openModel);
  const [nameFolder, setName] = useState(currentFile);
  const [id, setId] = useState('');
  useEffect(() => {});
  const handRK = () => {
    //pushName(fileName);
    setShow(false);
    const dateCreated = "123";
    const requestFile = {
      filefolderRequest: [{ fileName, fileDescription, dateCreated ,id}],
    };
    
    addName("");
    addDisc("");
   
    if(id){
      Post("/updateFileFolder", requestFile).then((res) =>updateName(res.data.filefolderRequest[0]));
    }else{
    Post("/createFileFolder", requestFile).then((res) =>pushName(res.data.filefolderRequest[0]));
    }
    setId(null)
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [fileName, addName] = useState("");
  const [fileDescription, addDisc] = useState("");
  const addFolderHandler = (e) => {
    addName(e.target.value);
  };
  const pushName = (name) => {
    setName([...nameFolder, name]);
  };
  const updateName =(file)=>{

const updated =     nameFolder.map(item=>{
      if(file.id==item.id){
        item.fileDescription=file.fileDescription;
        item.fileName=file.fileName;
      }
      return item ;
    })
    
   setName(updated)
  }
  //const handleClose = () => setShow(false);
  const addDescHandler = (e) => {
    addDisc(e.target.value);
  };

  const handleEditShow = (text,des ,fileId) => {
    setShow(true);
    addName(text);
    addDisc(des);
    setId(fileId)
  };
  const btnStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    margin: "10px",
  };
  return (
    <>
      <div style={btnStyle}>
        <button className=" btn btn-primary" onClick={handleShow}>
          Add More Folder
        </button>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closebutton></Modal.Header>
        <Modal.Body>
          <Input
            placeholder="Enter your folder"
            label="Folder"
            value={fileName}
            handleChange={addFolderHandler}
            name="folder"
            type="input"
          ></Input>
          <Input
            placeholder="Enter your Name"
            label="Discreption"
            value={fileDescription}
            handleChange={addDescHandler}
            name="dis"
            type="input"
          ></Input>
           <Input
           
            value={id}
            handleChange={()=>setId(id)}
            name="id"
            type="hidden"
          ></Input>
        </Modal.Body>
        <Modal.Footer>
          <button
            class="btn-danger btn"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="btn btn-success"
            variant="primary"
            onClick={handRK}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
      <div style={{ display: "flex" }}>
        {nameFolder.map((item ,index) => (
          <CreateFolder
            openModel={handleEditShow}
            text={item.fileName}
            des={item.fileDescription} 
            fileId ={item.id}
            imageSrc="./download.png"
            key ={index} 
            history ={history}
          ></CreateFolder>
        ))}
      </div>
    </>
  );
};

const mapStateToPros = ({currentFile:{currentFile}})=>({currentFile})
export default connect(mapStateToPros)(ModalPop);
//export default ModalPop;
