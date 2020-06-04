import React, { useState } from "react";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { Post, Get } from "../../service/service.setup";
import { ReactComponent as Photo } from "../../assets/photo.svg";
import "./top.header.style.scss";
import WebCamModel from "../web-cam.component/web-cam-modal";
import { ToastContainer, toast } from "react-toastify";

const TopHeaderWithBack = ({ history, id }) => {
  const [file, setFile] = useState("");
  const [showModel, setShowModel] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();

    formData.append("files", file);
    console.log(formData);
    try {
      let res = await Post("/uploadImage", formData, {
        headers: {
          fileId: id,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 200) toast.success(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  const topRowStyle = {
    padding: "10px 10px",
    background: "rgba(0, 0, 0, 0.125)",
  };
  return (
    <div className="row secondary-header" style={topRowStyle}>
      <ToastContainer />
      <div className="col-md-12">
        <form style={{ display: "inline" }} onSubmit={submitHandler}>
          <label for="fileInput" className="input-label">
            <Photo style={{ width: "30px" }} />
            <input
              className="input-file"
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              name="uploadFile"
            ></input>
          </label>

          <input
            className="btn btn-primary ml-4"
            type="submit"
            value="Upload"
          />
        </form>
        <button
          className="btn-success ml-4 btn"
          onClick={() => setShowModel(true)}
        >
          Open WebCam
        </button>
        <WebCamModel id={id} hide={setShowModel} show={showModel} />
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
