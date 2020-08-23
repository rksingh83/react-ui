import React from "react";
import { ReactComponent as Photo } from "../../assets/photo.svg";
const UploadForm = ({ submitHandler, isUpload }) => {
  const style = isUpload
    ? { width: "95px", height: "30px" }
    : { width: "76px", height: "44px" };

  return (
    <form className="" onSubmit={submitHandler}>
      <div style={{ position: "relative" }}>
        {isUpload && <Photo style={{ height: "35px", marginBottom: "14px" }} />}
        {isUpload && <span className="on-hover">Upload</span>}
        {!isUpload && <label className="btn btn-success">Retake</label>}
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
