import React from 'react' ;
import Modal from "react-bootstrap/Modal";

import Input from "../boostrapinput/input.component";
const OpenPop = ({handleClose ,saveName})=>{

    return(
        <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closebutton></Modal.Header>
        <Modal.Body>
          <Input
            placeholder="Enter your folder"
            label="Folder"
            value={fileName}
            handleChange={()=>setName(e.target.value)}
            name="folder"
            type="input"
          ></Input>
          <Input
            placeholder="Enter your Name"
            label="Discreption"
            value={fileDescription}
            handleChange={()=>setDesc(e.target.value)}
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
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="btn btn-success"
            variant="primary"
            onClick={saveName}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    )
}