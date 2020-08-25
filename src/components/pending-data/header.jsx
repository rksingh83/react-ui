import React from "react";
import { ReactComponent as Next } from "../../assets/next.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import UploadForm from "../upload-image/upload-images";
import { Post, Get } from "../../service/service.setup";
const PendingHeader = ({
  prev,
  next,
  pendingFolderId,
  currentImageId,
  all,
  saveHandler,
}) => {
  const uploadImageHandler = async (e) => {
    //  e.preventDefault();
    const formData = new FormData();
    var d = new Date();
    let imageName = d.getTime();
    imageName = `jpg_${imageName}.jpg`;
    console.log(e);
    formData.append("files", e, imageName);
    try {
      let res = await Post("/reUploadImage", formData, {
        headers: {
          fileId: pendingFolderId,
          imageId: currentImageId,
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
  return (
    <main className="main">
      <div>
        <Back className="header-svg" onClick={prev} />
      </div>
      <div>
        <UploadForm submitHandler={uploadImageHandler}></UploadForm>
      </div>
      <div>
        <button onClick ={()=>saveHandler()}>Save</button>
      </div>
      <div>
        <span className="info"> Total Pending </span>
        <span className="badge badge-info">{all.length}</span>
      </div>
      <div>
        <span className="info">Current</span>
        <span className="badge badge-info">
          {all.indexOf(currentImageId) + 1}
        </span>
      </div>
      <div>
        <Next className="header-svg" onClick={next} />
      </div>
    </main>
  );
};

export default PendingHeader;
