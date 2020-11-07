import React from "react";
import { ReactComponent as Photo } from "../../assets/photo.svg";
import Retake from "../../assets/retake.png";
const UploadForm = ({ submitHandler, isUpload }) => {
  const style = isUpload
    ? { width: "95px", height: "30px" }
    : { width: "76px", height: "44px", overflow: "hidden" };

  return (
    <form className="" onSubmit={submitHandler}>
      <div style={{ position: "relative" }}>
        {isUpload && <Photo style={{ height: "35px", marginBottom: "10px" }} />}
        {isUpload && <span className="on-hover">Upload</span>}
        {!isUpload && (
          <label className="" style={{ margin: "0px" }}>
            <img className="icon-image" src={Retake} alt="fireSpot" />
          </label>
        )}
        <input
          className="input-file"
          onChange={(e) => submitHandler(e.target.files[0])}
          type="file"
          name="uploadFile"
          style={style}
        ></input>
      </div>
    </form>
  );
};
export default UploadForm;
