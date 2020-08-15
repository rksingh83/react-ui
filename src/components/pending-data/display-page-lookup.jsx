import React, { useState } from "react";
import { Post, Get } from "../../service/service.setup";
import {
  UserSelect,
  FileSelect,
} from "../boostrapinput/pending-select.component";
import Input from "../boostrapinput/input.component";
import UploadForm from "../upload-image/upload-images";
const PendingPageData = ({
  data,
  prev,
  next,
  currentImageId,
  history,
  pendingFolderId,
}) => {
  const [fileTag, setFileTag] = useState("");
  const imageStyle = {
    width: "100%",
  };
  const fileTagHandler = (e) => {
    let folder = data.pageLookup.file.filter(
      (item) => item.id == e.target.value
    );
    let tag = folder.length > 0 ? folder[0].fileTag : "";
    if (!tag) tag = "";
    console.log(data.pageLookup);
    setFileTag(tag);
  };

  const uploadImageHandler = async (e) => {
    //  e.preventDefault();

    const formData = new FormData();
    var d = new Date();
    let imageName = d.getTime();
    imageName = `jpg_${imageName}.jpg`;
    console.log(e)
    formData.append("files", e, imageName);
    try {
      let res = await Post("/reUploadImage", formData, {
        headers: {
          fileId: pendingFolderId,
          imageId:currentImageId,
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
    <div className="container-sm mt-4" style={{ maxWidth: "600px" }}>
      <div className="row" id="pending">
        <div className="col-md-12">
          <div className="col-md-6">
            <UploadForm submitHandler={uploadImageHandler}></UploadForm>
          </div>
          <div className="row">
            <div className="col-md-6 text-center">
              <button className="btn btn-info" onClick={prev}>
                Prev
              </button>
            </div>
            <div className="col-md-6 text-center">
              <button className="btn btn-info" onClick={next}>
                Next
              </button>
            </div>
          </div>
          <div className=" row">
            <div className="col-md-4 page-lookup-heading">File Name</div>
            <div className="col-md-4">
              <FileSelect
                onChange={fileTagHandler}
                list={data.pageLookup.file}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading">File Tag</div>
            <div className="col-md-2">
              <img
                style={{ width: "100%" }}
                src={data.pageLookup.fileTagImagPath}
              />
            </div>
            <div className="col-md-4">
              <Input disabled={true} value={fileTag} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <img
                onClick={() => history.push(`/edit/${currentImageId}`)}
                style={imageStyle}
                src={data.pageLookup.cloudImagePath}
                className="hover"
              />
            </div>
            <div className="col-md-6">{data.pageLookup.title}</div>
          </div>
          <div className="row">
            <div className="col-md-1 page-lookup-heading">Share</div>
            <div className="col-md-4">
              <img style={imageStyle} src={data.pageLookup.shareImagePath} />
            </div>
            <div className="col-md-4">
              <UserSelect list={data.data.profileList} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-1 page-lookup-heading">Date</div>
            <div className="col-md-4">
              <img style={imageStyle} src={data.pageLookup.dateImagePath} />
            </div>
            <div className="col-md-4">
              <Input type="date" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-1 page-lookup-heading"> Page No.</div>
            <div className="col-md-4">
              <img
                style={imageStyle}
                src={data.pageLookup.pageNumberImagePath}
              />
            </div>
            <div className="col-md-4">
              <Input type="text" value={data.pageLookup.pageNumber} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-1 page-lookup-heading"> ID.</div>
            <div className="col-md-4">
              Id <img style={imageStyle} src={data.pageLookup.idImagePath} />
            </div>
            <div className="col-md-4">
              <Input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PendingPageData;
