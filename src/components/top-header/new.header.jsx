import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { Post } from "../../service/service.setup";
import LoadLookup from "../pending-data/display-page-lookup";
import { getPendingPageById } from "../../service/pendingData";
import UploadForm from "../upload-image/upload-images";
import "./top.header.style.scss";
import { BackButton, Left, Right, Save } from "../common/pNGButtons";
const TopSingleHeader = ({
  images,
  imageId,
  history,
  currentFolder,
  folderId,
  next,
  prev,
  pageSaveHandler,
  ...props
}) => {
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
    if (response.data) {
      setCurrentLookup({ ...response.data });
    }
  };
  const deleteHandler = () => {
    if (!window.confirm("Are You sure you want to delete ?")) return;
    const updateImages = images.filter((item) => item.id == imageId);

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
    } catch (err) {}
  };
  const editHandler = () => {
    const updateImages = images.filter((item) => item.id == imageId);
    //  setImages(updateImages[0]);

    setShow(true);
    addName(updateImages[0].pageNumber);
    addDisc(updateImages[0].description || "");
  };
  const uploadImageHandler = async (e) => {
    //  e.preventDefault();
    // props.toggleLoader(true);
    props.toggleLoader(true);
    const formData = new FormData();
    var d = new Date();
    let imageName = d.getTime();
    imageName = `jpg_${imageName}.jpg`;

    formData.append("files", e, imageName);
    try {
      let res = await Post("/reUploadImage", formData, {
        headers: {
          fileId: folderId,
          imageId: imageId,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 200) {
        props.setResponseMgs(res.data.message);
        props.toggleModal(true);
        //   props.toggleLoader(false);
        window.location.reload();
      } else {
        alert("Something went wrong try later");
      }
      props.toggleLoader(false);
    } catch (err) {
      props.toggleLoader(false);
    }
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
                {/* <Back className="header-svg" onClick={prev} /> */}
                <Left handler={prev} />
              </li>
              <li>
                {/* <Next className="header-svg" onClick={next} /> */}
                <Right handler={next} />
              </li>
              <li>
                <UploadForm submitHandler={uploadImageHandler}></UploadForm>
              </li>
              <li>
                {/* <button
                  className="btn btn-info ml-2 mr-2"
                  onClick={() => pageSaveHandler()}
                >
                  Save
                </button> */}
                <Save handler={pageSaveHandler} />
              </li>
              <li>
                <button
                  className="btn btn-info ml-2 mr-2"
                  onClick={() => history.push(`/edit/${imageId}`)}
                >
                  Edit Points
                </button>
              </li>
              <li className="nav-item">
                {/* <button
                  className="btn btn-success"
                  onClick={() => history.goBack()}
                >
                  Back
                </button> */}
                <BackButton handler={history.goBack} />
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
