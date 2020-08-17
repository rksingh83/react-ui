import React, { useState } from "react";
import { Post, Get } from "../../service/service.setup";
import { ReactComponent as Next } from "../../assets/next-arr.svg";
import { ReactComponent as Back } from "../../assets/back-arr.svg";
import {
  UserSelect,
  FileSelect,
  FileTagSelect,
} from "../boostrapinput/pending-select.component";
import Input from "../boostrapinput/input.component";
import UploadForm from "../upload-image/upload-images";
const PendingPageData = ({
  data,
  currentImageId,
  history,
  pendingFolderId,
  removeImageId,
}) => {
  const [fileTag, setFileTag] = useState("");
  const [fileId, setFileId] = useState(data.pageLookup.fileId);
  const [shareId, setShareId] = useState(data.pageLookup.shareId);
  const [date, setDate] = useState(data.pageLookup.date);
  const [pageNo, setPageNo] = useState(data.pageLookup.pageNumber);

  const [title, setTitle] = useState(data.pageLookup.title);
  const [ID, setID] = useState(data.pageLookup.id);
  const [description, setDescription] = useState(data.pageLookup.description);

  const imageStyle = {
    width: "100%",
    border: "1px solid green",
  };

  const fileTagHandler = (e) => {
    let folder = data.pageLookup.file.filter(
      (item) => item.id == e.target.value
    );
    let tag = folder.length > 0 ? folder[0].fileTag : "";
    if (!tag) tag = "";
    setFileId(e.target.value);
    setFileTag(tag);
  };

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
  const saveUpdateData = async () => {
    const requestData = {
      fileId,
      shareId,
      title,
      description,
      date,
      pendingFolderId,
      imageId: currentImageId,
      pageNumber: pageNo,
      id: data.pageLookup.id,
    };
    console.log(requestData);
    try {
      const response = await Post("/savePageLookup", requestData);
      console.log();
      if (response.data.code == "200") {
        alert("Image Updated Successfully");
        setFileId("");
        setShareId("");
        setDescription("");
        setDate("");
        setTitle("");
        setPageNo("");
        removeImageId();
      }
    } catch (e) {}
  };
  return (
    <div className="container-sm mt-4" style={{ maxWidth: "" }}>
      <div className="row">
        <div className="col-md-12">
          <button
            onClick={saveUpdateData}
            className="btn btn-primary mb-3 btn-sm"
          >
            Save
          </button>
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
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-3 page-lookup-heading">File Name</div>
            <div className="col-md-3 page-lookup-heading"></div>
            <div className="col-md-6">
              <FileSelect
                onChange={fileTagHandler}
                list={data.pageLookup.file}
                value={fileId}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading">File Tag</div>
            <div className="col-md-4">
              <img style={imageStyle} src={data.pageLookup.fileTagImagPath} />
            </div>
            <div className="col-md-6">
              <FileTagSelect
                onChange={fileTagHandler}
                list={data.pageLookup.file}
                value={fileId}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading">Title</div>

            <div className="col-md-10">
              <Input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading">Description</div>
            <div className="col-md-10">
              <Input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Description"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-2 page-lookup-heading">
              File Segmentation
            </div>
            <div className="col-md-4">
              <img
                style={imageStyle}
                src={data.pageLookup.segmentationImagePath}
              />
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading">Share</div>
            <div className="col-md-4">
              <img style={imageStyle} src={data.pageLookup.shareImagePath} />
            </div>
            <div className="col-md-6">
              <UserSelect
                value={shareId}
                onChange={(e) => setShareId(e.target.value)}
                list={data.data.profileList}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading">Date</div>
            <div className="col-md-4">
              <img style={imageStyle} src={data.pageLookup.dateImagePath} />
            </div>
            <div className="col-md-6">
              <Input
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading"> Page No.</div>
            <div className="col-md-4">
              <img
                style={imageStyle}
                src={data.pageLookup.pageNumberImagePath}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                onChange={(e) => setPageNo(e.target.value)}
                value={pageNo}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading"> ID.</div>
            <div className="col-md-4">
              <img style={imageStyle} src={data.pageLookup.idImagePath} />
            </div>
            <div className="col-md-6">
              <Input  onChange={(e) => setID(e.target.value)}   value = {ID} type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PendingPageData;
