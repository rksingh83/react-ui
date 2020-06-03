import React ,{useState} from 'react'
import Modal from "react-bootstrap/Modal";
import WebcamCapture from './web-cam'
import './webcam.style.scss';

const WebCamModel = ({show ,hide ,id})=>(
        <Modal         size="lg"
        show={show}  onHide={()=>hide(false)} animation={true}>
        <Modal.Header>
        <button
            className="btn-danger btn"
            variant="secondary"
            onClick ={()=>hide(false)}
          >
            Close
          </button>
         
        </Modal.Header>
        <Modal.Body>
        <WebcamCapture id ={id}/>
        </Modal.Body>
        <Modal.Footer>
        <button
            className="btn-danger btn"
            variant="secondary"
            onClick ={()=>hide(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
        );
    export default WebCamModel;