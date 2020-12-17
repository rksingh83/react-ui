import React, { useState, useEffect } from "react";
import { Post } from "../../service/service.setup";
import { ReactComponent as Photo } from "../../assets/photo.svg";
import "./top.header.style.scss";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import WebCamModel from "../web-cam.component/web-cam-modal";
import { ReactComponent as Share } from "../../assets/teaching.svg";
import ShareFolderModal from "../modal/share-folder-modal";
import { getPendingPageById } from "../../service/pendingData";
import { BackButton, EditBtn, CancelButton } from "../common/pNGButtons";
import CustomToolTip from "../common/CustomToolTip";
const TopHeaderWithBack = ({
  history,
  id,
  currentFolder,
  updateImages,
  setShowLoader,
  ...props
}) => {
  const [file, setFile] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [images, setImages] = useState({});
  const [imageId, setImageId] = useState(0);
  const [shareFolder, setShareFolder] = useState(false);
  const [isOpenPop, setSharedListPop] = useState(false);
  const [shareWithList, setShareWithList] = useState([]);
  const [currentLookup, setCurrentLookup] = useState(false);
  const columnMinWidth = {
    minWidth: "12.5%",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };
  async function getFolders(id, fileId) {
    try {
      const user = await Post("/getPageSharedList", {
        fileId,
        id,
      });
      if (
        user.data.code == "200" &&
        user.data.message == "Page is not shared with anyone."
      ) {
        alert(user.data.message);
      }
      setShareWithList(user.data.data.profile);

      setSharedListPop(true);
    } catch (error) {}
  }
  const showContactListModal = () => {
    getFolders(updateImages[0].id, id);
  };
  const submitHandler = async (e) => {
    //  e.preventDefault();
    setShowLoader(true);
    const formData = new FormData();
    var d = new Date();
    let imageName = d.getTime();
    imageName = `jpg_${imageName}.jpg`;
    //e.name = imageName;

    formData.append("files", e, imageName);
    try {
      let res = await Post("/uploadImage", formData, {
        headers: {
          fileId: id,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 200) {
        alert(res.data.message);
        setShowLoader(false);
        window.location.reload();
      } else {
        setShowLoader(false);
        alert("Something went wrong try later");
      }
    } catch (err) {
      setShowLoader(false);
    }
  };
  const topRowStyle = {
    background: "rgba(0, 0, 0, 0.125)",
    padding: "5px 0px",
  };
  const deleteHandler = () => {
    if (!window.confirm("Are you sure you want to delete ?")) return;
    const requestPayload = {
      imageInput: updateImages.filter((item) => (item.delete = 1)),
    };
    updateToServer(requestPayload);
  };
  const updateToServer = async (data) => {
    try {
      let res = await Post("/updateImage", data);
      if (res.data.code == 200) alert(res.data.message);
      window.location.reload();
    } catch (err) {}
  };
  const editHandler = () => {
    getCurrentPage(imageId);
  };
  // on Save of Edit modal this will close Modal
  const closeEditModal = () => {
    window.location.reload();
  };
  useEffect(() => {
    //  getCurrentPage();
    if (updateImages.length > 0) setImageId(updateImages[0].id);
  }, [updateImages]);
  const getCurrentPage = async (imageId) => {
    const response = await getPendingPageById(imageId);
    setCurrentLookup(response.data && response.data);
    setIsShow(true);
  };
  const editPageHandler = () => {
    const pageId = updateImages[0].id;
    history.push(`/original/${pageId}/${id}`);
  };
  const refreshPageHandler = () => {
    window.location.reload();
  };
  return (
    <div className="row secondary-header single-header" style={topRowStyle}>
      <div className="col-md-2  sec-header-item">
        <input
          placeholder="Search By Title"
          value={props.imageSearchInput}
          onChange={props.searchImageHandler}
          name="search"
          type="input"
          className="custom-input"
        ></input>
      </div>
      <div className="col-md-1 ml-2 sec-header-item" style={columnMinWidth}>
        <span className="badge badge-info p-2">
          <span>{currentFolder}</span>
        </span>
      </div>
      <div
        className="col-md-2 sec-header-item col-text-style"
        style={columnMinWidth}
      >
        <form
          className=""
          style={{ display: "inline" }}
          onSubmit={submitHandler}
        >
          <label className="input-label">
            <Photo
              style={{
                width: "30px !important",
                height: "35px",
                marginBottom: "3px",
              }}
            />
            <span>Upload</span>
            <input
              className="input-file"
              onChange={(e) => submitHandler(e.target.files[0])}
              type="file"
              name="uploadFile"
            ></input>
          </label>

          {/* <input
            className="btn btn-primary ml-4"
            type="submit"
            value="Upload"
          /> */}
        </form>
        <button
          className="btn-success ml-4 btn"
          onClick={() => setShowModel(true)}
        >
          Open WebCam
        </button>
        <WebCamModel
          setShowLoader={setShowLoader}
          id={id}
          hide={setShowModel}
          show={showModel}
        />
      </div>

      <div
        className="col-md-1 sec-header-item col-text-style"
        style={columnMinWidth}
      >
        <div
          style={{
            display: updateImages && updateImages.length > 0 ? "" : "none",
          }}
        >
          <CustomToolTip text="Delete Image">
            <Delete onClick={deleteHandler} className="header-icon" />
          </CustomToolTip>
        </div>
      </div>
      <div
        className="col-md-1 sec-header-item col-text-style"
        style={columnMinWidth}
      >
        <div
          style={{
            display: updateImages && updateImages.length > 0 ? "" : "none",
          }}
        >
          <CustomToolTip text="Share Image">
            <Share onClick={() => setShareFolder(true)} />
          </CustomToolTip>
          <ShareFolderModal
            selected={1}
            show={shareFolder}
            hide={setShareFolder}
            images={{ updateImages, id }}
            count={updateImages.length}
          />
          {/* <span className="on-hover" onClick={() => setShareFolder(true)}>
            Share
          </span> */}
        </div>
      </div>

      <div className="col-md-1 sec-header-item col-text-style">
        {updateImages && updateImages.length > 0 && (
          <div>
            <CancelButton handler={refreshPageHandler} />
          </div>
        )}
      </div>
      <div className="col-md-1 sec-header-item col-text-style">
        {updateImages && updateImages.length == 1 && (
          <div>
            <CustomToolTip text="Edit Image">
              <EditBtn handler={editPageHandler} />
            </CustomToolTip>
          </div>
        )}
      </div>

      <div className=" ml-auto col-md-1 sec-header-item col-text-style">
        {/* <button
          onClick={() => history.goBack()}
          className="btn btn-success float-right"
        >
          Back
        </button> */}
        <CustomToolTip text="Go Back">
          <BackButton handler={history.goBack} />
        </CustomToolTip>
      </div>
    </div>
  );
};
export default TopHeaderWithBack;
