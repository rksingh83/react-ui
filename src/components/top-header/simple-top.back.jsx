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

const TopHeaderWithBack = ({ history, id, updateImages, ...props }) => {
  const [file, setFile] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [images, setImages] = useState({});
  const [pageNo, setPageNo] = useState("");
  const [desc, setDesc] = useState("");

  const submitHandler = async (e) => {
    //  e.preventDefault();

    const formData = new FormData();

    formData.append("files", e);
    console.log(formData);
    try {
      let res = await Post("/uploadImage", formData, {
        headers: {
          fileId: id,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 200) {
        toast.success(res.data.message);
        window.location.reload();
      } else {
        toast.error("Something went wrong try later");
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
    <div className="row secondary-header" style={topRowStyle}>
      <ToastContainer />
      <div className="col-md-4 ml-2" style={{ display: id ? "" : "none" }}>
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
          className="btn-success ml-4 btn"
          onClick={() => setShowModel(true)}
        >
          Open WebCam
        </button>
        <WebCamModel id={id} hide={setShowModel} show={showModel} />
      </div>
      <div className="col-md-2">
        <div
          style={{
            display: updateImages && updateImages.length > 0 ? "" : "none",
          }}
        >
          <Delete onClick={deleteHandler} className="header-icon" />
        </div>
      </div>
      <div className="col-md-2">
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

      <div className="col-md-2">
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
