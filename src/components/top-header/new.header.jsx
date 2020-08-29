import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { Post } from "../../service/service.setup";
import LoadLookup from "../pending-data/display-page-lookup";
import { getPendingPageById } from "../../service/pendingData";
import { ReactComponent as Next } from "../../assets/next.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import "./top.header.style.scss";
const TopSingleHeader = ({
  images,
  imageId,
  history,
  currentFolder,
  folderId,
  next,
  prev,
  pageSaveHandler,
}) => {
  console.log(currentFolder);
  const [show, setShow] = useState(false);
  const [fileName, addName] = useState("");
  const [fileDescription, addDisc] = useState("");
  const [currentLookup, setCurrentLookup] = useState(false);
  const [id, setId] = useState("");
  const removeSavedImageId = () => setShow(false);
  const saveHandler = () => {
    const requestPayLoad = {
      imageInput: [
        { id: imageId, pageNumber: fileName, description: fileDescription },
      ],
    };
    updateToServer(requestPayLoad, true);
    setShow(false);
  };
  useEffect(() => {
    getCurrentPage();
  }, [imageId]);
  const getCurrentPage = async () => {
    const response = await getPendingPageById(imageId);
    setCurrentLookup(response.data && response.data);
  };
  const deleteHandler = () => {
    if (!window.confirm("Are You sure you want to delete ?")) return;
    const updateImages = images.filter((item) => item.id == imageId);
    console.log(imageId);
    const requestPayload = {
      imageInput: updateImages.filter((item) => (item.delete = 1)),
    };
    updateToServer(requestPayload, true);
  };
  const updateToServer = async (data, isGoBack) => {
    try {
      let res = await Post("/updateImage", data);
      if (res.data.code == 200) alert(res.data.message);
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
    addDisc(updateImages[0].description || "");
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
            <ul className="navbar-nav mr-auto text-white">
              <li className="nav-item single-header-li">
                <span className="badge badge-info p-2">{currentFolder}</span>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto text-white">
            
              <li className="nav-item single-header-li">
                <Delete className="single-header-svg" onClick={deleteHandler} />{" "}
              </li>
              <li>
                <Back className="header-svg" onClick={prev} />
              </li>
              <li>
                <Next className="header-svg" onClick={next} />
              </li>
              <li>
                <button
                  className="btn btn-info ml-2 mr-2"
                  onClick={() => pageSaveHandler()}
                >
                  Save
                </button>
              </li>
              <li>
                <button
                  className="btn btn-info ml-2 mr-2"
                  onClick={() => history.push(`/edit/${imageId}`)}
                >
                  Points
                </button>
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
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        animation={true}
      >
        <Modal.Header>
          <button
            className="btn-danger btn"
            variant="secondary"
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </Modal.Header>
        <Modal.Body className="modal-lg">
          <LoadLookup
            data={currentLookup}
            currentImageId={imageId}
            history={history}
            pendingFolderId={folderId}
            removeImageId={removeSavedImageId}
          ></LoadLookup>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-danger btn"
            variant="secondary"
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default TopSingleHeader;
