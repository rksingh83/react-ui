import React from "react";

const UploadForm = ({ submitHandler }) => (
  <form className="mr-4" onSubmit={submitHandler}>
    <div style={{ position: "relative" }}>
      <label className="btn btn-success">Retake</label>
      <input
        className="input-file"
        onChange={(e) => submitHandler(e.target.files[0])}
        type="file"
        name="uploadFile"
        style={{ width: "76px", height: "44px" }}
      ></input>
    </div>
  </form>
);
export default UploadForm;
