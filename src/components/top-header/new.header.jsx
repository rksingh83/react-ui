import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Input from "../boostrapinput/input.component";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { Post } from "../../service/service.setup";

import "./top.header.style.scss";
const TopSingleHeader = ({ images, imageId, history }) => {
  const [show, setShow] = useState(false);
  const [fileName, addName] = useState("");
  const [fileDescription, addDisc] = useState("");
  const [id, setId] = useState("");

  const saveHandler = () => {
    const requestPayLoad = {
      imageInput: [
        { id:imageId,pageNumber: fileName, description: fileDescription },
      ],
    };
    updateToServer(requestPayLoad ,true);
    setShow(false);
  };
  const deleteHandler = () => {
    if (!window.confirm("Are You sure you want to delete ?")) return;
    const updateImages = images.filter((item) => item.id == imageId);
    console.log(imageId)
    const requestPayload = {
      imageInput: updateImages.filter((item) => (item.delete = 1)),
    };
    updateToServer(requestPayload, true);
  };
  const updateToServer = async (data, isGoBack) => {
    try {
      let res = await Post("/updateImage", data);
      if (res.data.code == 200) alert(res.data.message);
      if (isGoBack)
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };
    const editHandler = () => {
        const updateImages = images.filter((item) => item.id == imageId);
     //  setImages(updateImages[0]);
     console.log(updateImages);
      setShow(true);
      addName(updateImages[0].pageNumber);
      addDisc(updateImages[0].description ||"");
    };
  return (
    <div className="row">
      <div className="col-md-12">
        <nav className="navbar navbar-expand-lg navbar-light sec-header-bg single-header">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto text-white">
              <li className="nav-item single-header-li">
                <Delete  className = "single-header-svg" onClick={deleteHandler} />{" "}
              </li>
              <li className="nav-item single-header-li">
                <Pencil  className = "single-header-svg" onClick={editHandler}  />{" "}
              </li>
              <li className="nav-item">
                <button 
                  className="btn btn-success"
                  onClick={() => history.goBack()}
                >
                  Back
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Modal show={show} onHide={() => setShow(false)} animation={true}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <Input
            placeholder="Enter your folder"
            label="Folder"
            value={fileName}
            handleChange={(e) => addName(e.target.value)}
            name="folder"
            type="input"
          ></Input>
          <Input
            placeholder="Enter your Name"
            label="Discreption"
            value={fileDescription}
            handleChange={(e) => addDisc(e.target.value)}
            name="dis"
            type="input"
          ></Input>
          <Input
            value={""}
            handleChange={() => setId(id)}
            name="id"
            type="hidden"
          ></Input>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-danger btn"
            variant="secondary"
            onClick={() => setShow(false)}
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
  );
};
export default TopSingleHeader;
