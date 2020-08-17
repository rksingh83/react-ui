import React from "react";
import { ReactComponent as Next } from "../../assets/next-arr.svg";
import { ReactComponent as Back } from "../../assets/back-arr.svg";
import UploadForm from "../upload-image/upload-images";
import { Post, Get } from "../../service/service.setup";
const PendingHeader = ({ prev, next, pendingFolderId, currentImageId }) => {
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
      <div></div>
      <div>
        <Next className="header-svg" onClick={next} />
      </div>
    </main>
  );
};

export default PendingHeader;
