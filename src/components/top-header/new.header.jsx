import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { Post } from "../../service/service.setup";
import LoadLookup from "../pending-data/display-page-lookup";
import { getPendingPageById } from "../../service/pendingData";
import UploadForm from "../upload-image/upload-images";
import "./top.header.style.scss";
import { BackButton, Left, Right, Save, EditBtn } from "../common/pNGButtons";
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
          className="col-md-2"
          style={{ background: "rgba(0, 0, 0, 0.125)", minHeight: "3rem" }}
        ></div>
        <div className="col-md-10 main-pending-page-header">
          <span className="badge badge-info p-2">{currentFolder}</span>
          <Delete className="single-header-svg" onClick={deleteHandler} />{" "}
          <Left handler={prev} />
          <Right handler={next} />
          <UploadForm submitHandler={uploadImageHandler}></UploadForm>
          <Save handler={pageSaveHandler} />
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
