import React from "react";
import { ReactComponent as Photo } from "../../assets/photo.svg";
import Retake from "../../assets/retake.png";
const UploadForm = ({ submitHandler, isUpload, ...props }) => {
  const style = isUpload
    ? { width: "35px", height: "30px", display: "none" }
    : { width: "36px", height: "44px", overflow: "hidden", display: "none" };

  return (
    <form className="" onSubmit={submitHandler}>
      <div style={{ position: "relative" }}>
        {isUpload && (
          <label
            htmlFor="upload-button-main"
            className=""
            style={{ margin: "0px" }}
          >
            <img
              className="icon-image"
              src={Retake}
              style={{ width: "35", height: "35px", marginBottom: "10px" }}
              {...props}
            />
          </label>
        )}
        {!isUpload && (
          <label
            htmlFor="upload-button-main"
            className=""
            style={{ margin: "0px" }}
          >
            <img
              className="icon-image"
              src={Retake}
              alt="fireSpot"
              {...props}
            />
          </label>
        )}
        <input
          className="input-file"
          onChange={(e) => submitHandler(e.target.files[0])}
          type="file"
          name="uploadFile"
          style={style}
          id="upload-button-main"
        ></input>
      </div>
    </form>
  );
};
export default UploadForm;
