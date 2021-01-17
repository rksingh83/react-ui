import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { Post } from "../../service/service.setup";
import LoadLookup from "../pending-data/display-page-lookup";
import { getPendingPageById } from "../../service/pendingData";
import UploadForm from "../upload-image/upload-images";
import "./top.header.style.scss";
import { BackButton, Left, Right, Save, EditBtn } from "../common/pNGButtons";
import {  Row, Col } from "react-bootstrap";
const TopSingleHeader = ({
  images,
  imageId,
  history,
  currentFolder,
  folderId,
  next,
  prev,
  pageSaveHandler,
  searchHandler ,
  searchItem,
  fillAllDataHandler,


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
    if (!window.confirm("Are you sure you want to delete ?")) return;
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
  const editButtonHandler = () => {
    history.push(`/edit/${imageId}`);
  };
  return (
    <>
      <div className="row">
        <div
          className="col-md-3 pl-1"
          style={{ background: "rgba(0, 0, 0, 0.125)", minHeight: "3rem" }}
        >
           <Row>
              <Col md={10}>
                          <input
                  placeholder="Search anything.."
                  value={searchItem}
                  onChange={searchHandler}
                  onBlur={fillAllDataHandler}
                  name="search"
                  type="input"
                  className="custom-input mt-1"
                ></input>
                </Col>
                </Row>
        </div>
        <div className="col-md-9 main-pending-page-header original-page-header pr-0">
          <span className="badge badge-info p-2">{currentFolder}</span>

          <Left handler={prev} />
          <Right handler={next} />
          {!props.defaultPageEditMode? <button
            className="btn btn-dark"
            onClick={() => props.setDefaultPageEditMode(true)}
          >
            Open In Edit Mode
          </button>: <Save handler={pageSaveHandler} />}
         
          <UploadForm submitHandler={uploadImageHandler}></UploadForm>
          <Delete className="single-header-svg" onClick={deleteHandler} />
          <EditBtn handler={editButtonHandler}></EditBtn>
          <BackButton handler={history.goBack} />
        </div>
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
    </>
  );
};
export default TopSingleHeader;
