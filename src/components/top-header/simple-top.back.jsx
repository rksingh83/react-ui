import React, { useState } from "react";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { Post, Get } from "../../service/service.setup";
import { ReactComponent as Photo } from "../../assets/photo.svg";
import "./top.header.style.scss";
import WebCamModel from "../web-cam.component/web-cam-modal";
import { ToastContainer, toast } from "react-toastify";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import OpenEditPop from "../modal/edit.modal";
import { ReactComponent as Share } from "../../assets/shareimage.svg";
import { ReactComponent as FolderSvg } from "../../assets/folder-name.svg";
import ShareFolderModal from "../modal/share-folder-modal";
import SharedListModal from "../modal/show-shared-list-modal";
const TopHeaderWithBack = ({
  history,
  id,
  currentFolder,
  updateImages,
  ...props
}) => {
  
  const [file, setFile] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [images, setImages] = useState({});
  const [pageNo, setPageNo] = useState("");
  // console.log(updateImages);
  const [desc, setDesc] = useState("");
  const [shareFolder, setShareFolder] = useState(false);
  const [isOpenPop, setSharedListPop] = useState(false);
  const [shareWithList, setShareWithList] = useState([]);
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
      console.log(user);

      setSharedListPop(true);
    } catch (error) {}
  }
  const showContactListModal = () => {
    getFolders(updateImages[0].id, id);
  };
  const submitHandler = async (e) => {
    //  e.preventDefault();

    const formData = new FormData();
    var d = new Date();
    let imageName = d.getTime();
    imageName = `jpg_${imageName}.jpg`;
    //e.name = imageName;

    formData.append("files", e, imageName);
    //console.log(e.name);
    try {
      let res = await Post("/uploadImage", formData, {
        headers: {
          fileId: id,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 200) {
        alert(res.data.message);
        window.location.reload();
      } else {
        alert("Something went wrong try later");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const topRowStyle = {
    padding: "10px 10px",
    background: "rgba(0, 0, 0, 0.125)",
  };
  const deleteHandler = () => {
    if (!window.confirm("Are You sure you want to delete ?")) return;
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
    } catch (err) {
      console.log(err);
    }
  };
  const editHandler = () => {
    setImages(updateImages[0]);
    setIsShow(true);
    setPageNo(updateImages[0].pageNumber);
    setDesc(updateImages[0].description);
  };
  const saveHandler = () => {
    const requestPayLoad = {
      imageInput: [
        { id: updateImages[0].id, pageNumber: pageNo, description: desc },
      ],
    };
    updateToServer(requestPayLoad);
    setIsShow(false);
  };
  return (
    <div className="row secondary-header single-header" style={topRowStyle}>
      <ToastContainer />
      <div
        className="col-md-4 ml-2 sec-header-item"
        style={{
          display: id ? "" : "none",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span className="badge badge-info p-2">
          My Files > <span>{currentFolder}</span>
        </span>
        <form
          className="mr-4"
          style={{ display: "inline" }}
          onSubmit={submitHandler}
        >
          <label className="input-label">
            <Photo style={{ width: "30px" }} />
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
          className="btn-success ml-4 btn d-none"
          onClick={() => setShowModel(true)}
        >
          Open WebCam
        </button>
        <WebCamModel id={id} hide={setShowModel} show={showModel} />
      </div>

      <div className="col-md-2 sec-header-item">
        <div
          style={{
            display: updateImages && updateImages.length > 0 ? "" : "none",
          }}
        >
          <Delete onClick={deleteHandler} className="header-icon" />
        </div>
      </div>
      <div className="col-md-1 sec-header-item">
        <div
          style={{
            display: updateImages && updateImages.length > 0 ? "" : "none",
          }}
        >
          <Share onClick={() => setShareFolder(true)} />{" "}
          <ShareFolderModal
            selected={1}
            show={shareFolder}
            hide={setShareFolder}
            images={{ updateImages, id }}
          />
          <span className="on-hover" onClick={() => setShareFolder(true)}>
            Share
          </span>
        </div>
      </div>
      <div className="col-md-1 sec-header-item">
        <div
          style={{
            display: updateImages && updateImages.length == 1 ? "" : "none",
          }}
        >
          <Pencil onClick={editHandler} className="header-icon" />
          <OpenEditPop
            onClose={setIsShow}
            className="header-icon"
            isShow={isShow}
            images={images}
            setPageNo={setPageNo}
            setDesc={setDesc}
            pageNo={pageNo}
            desc={desc}
            saveHandler={saveHandler}
          />
        </div>
      </div>
      <div className="col-md-2 sec-header-item">
        <div
          style={{
            display: updateImages && updateImages.length == 1 ? "" : "none",
          }}
        >
          <button onClick={showContactListModal} className="btn btn-secondary">
            Shared List
          </button>
          <SharedListModal
            hide={setSharedListPop}
            show={isOpenPop}
            list={shareWithList}
          ></SharedListModal>
        </div>
      </div>

      <div className=" ml-auto col-md-1">
        <button
          onClick={() => history.goBack()}
          className="btn btn-success float-right"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
export default TopHeaderWithBack;
