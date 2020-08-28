import React, { useState, useEffect } from "react";
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
  pageData,
  pageLookUpHandler,
  isRedirectLast,
}) => {
  const imageStyle = {
    width: "100%",
    border: "1px solid green",
  };
  useEffect(() => {}, [data.pageLookup]);
  const fileTagHandler = (e) => {
    // let folder = data.pageLookup.file.filter(
    //   (item) => item.id == e.target.value
    // );
    // let tag = folder.length > 0 ? folder[0].fileTag : "";
    // if (!tag) tag = "";
    // setFileId(e.target.value);
    // setFileTag(tag);
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
    try {
      const response = await Post("/savePageLookup", {});
      console.log();
      if (response.data.code == "200") {
        removeImageId();
      }
    } catch (e) {}
  };
  return (
    <div className="container-sm mt-4" style={{ maxWidth: "" }}>
      <div className="row"></div>

      <div className="row">
        <div className="col-md-4">
          {isRedirectLast && (
            <img
              onClick={() => history.push(`/last/${currentImageId}`)}
              style={imageStyle}
              src={data.pageLookup.cloudImagePath}
              className="hover"
            />
          )}
            {!isRedirectLast && (
            <img
              onClick={() => history.push(`/edit/${currentImageId}`)}
              style={imageStyle}
              src={data.pageLookup.cloudImagePath}
              className="hover"
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-3 mb-2 page-lookup-heading">File Title</div>
            <div className="col-md-3 segmentation">
              <img
                style={imageStyle}
                src={data.pageLookup.segmentationImagePath}
                className="img-height"
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                onChange={pageLookUpHandler}
                value={pageData.title}
                name="title"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 page-lookup-heading">File Name</div>
            <div className="col-md-3 page-lookup-heading"></div>
            <div className="col-md-6">
              <FileSelect
                onChange={pageLookUpHandler}
                list={data.pageLookup.file}
                value={pageData.fileId}
                name="fileId"
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
                onChange={pageLookUpHandler}
                list={data.pageLookup.file}
                value={pageData.fileId}
                name="tag"
              />
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-2 page-lookup-heading">Title</div>

            <div className="col-md-10">
              <Input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title"
              />
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-2 page-lookup-heading">Description</div>
            <div className="col-md-10">
              <Input
                type="text"
                onChange={pageLookUpHandler}
                value={pageData.description}
                placeholder="Description"
                name="description"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-2 page-lookup-heading">Share</div>
            <div className="col-md-4">
              <img style={imageStyle} src={data.pageLookup.shareImagePath} />
            </div>
            <div className="col-md-6">
              <UserSelect
                value={pageData.shareId}
                onChange={pageLookUpHandler}
                list={data.data.profileList}
                name="shareId"
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
                value={pageData.date}
                type="date"
                onChange={pageLookUpHandler}
                name="date"
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
                onChange={pageLookUpHandler}
                value={pageData.pageNumber}
                name="pageNumber"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading"> ID.</div>
            <div className="col-md-4">
              <img style={imageStyle} src={data.pageLookup.idImagePath} />
            </div>
            <div className="col-md-6">
              <Input
                onChange={pageLookUpHandler}
                value={pageData.id}
                name="id"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PendingPageData;
