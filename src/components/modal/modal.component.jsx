import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import Input from "../boostrapinput/input.component";
import CreateFolder from "../create-folder/create-folder.component";
import ModalHeader from "react-bootstrap/ModalHeader";
import { Post, Get } from "../../service/service.setup";
import {connect} from 'react-redux';
import  {setCurrentUser} from '../../redux/user/user.actions' ;
import  {setCurrentFile} from '../../redux/file/file.actions' ;
const ModalPop = ({ currentFile, openModel }) => {
  const [show, setShow] = useState(openModel);
  console.log('CURRENT_FILE' ,currentFile) ;
  const [nameFolder, setName] = useState(currentFile);
  useEffect(() => {});
  const handRK = () => {
    pushName(fileName);
    setShow(false);
    addName("");
    addDisc("");
    const dateCreated = "123";

    const requestFile = {
      filefolderRequest: [{ fileName, fileDescription, dateCreated }],
    };

    Post("mydiginotes/createFileFolder", requestFile).then((res) => res);
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
  //const handleClose = () => setShow(false);
  const addDescHandler = (e) => {
    addDisc(e.target.value);
  };

  const handleEditShow = (text) => {
    setShow(true);
    addName(text);
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
        {nameFolder.map((item) => (
          <CreateFolder
            openModel={handleEditShow}
            text={item}
            imageSrc="./download.png"
          ></CreateFolder>
        ))}
      </div>
    </>
  );
};

const mapStateToPros = ({currentFile:{currentFile}})=>({currentFile})
export default connect(mapStateToPros)(ModalPop);
//export default ModalPop;
