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
  isMemberShip,
}) => {
  const col = isMemberShip == 1 ? "col-md-3" : "col-md-10";
  const INPUT_COL = isMemberShip == 1 ? "col-md-3" : "col-md-6";
  const title_col =
    isMemberShip == 1
      ? "col-md-2 page-lookup-heading"
      : "col-md-2 page-lookup-heading";
  const imageStyle = {
    border: "1px solid green",
    height: "40px",
    marginBottom: "10px",
  };
  const tmnImageStyle = {
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
    } catch (err) {}
  };
  const saveUpdateData = async () => {
    try {
      const response = await Post("/savePageLookup", {});
      if (response.data.code == "200") {
        removeImageId();
      }
    } catch (e) {}
  };
  return (
    <div className="container-sm mt-4" style={{ maxWidth: "" }}>
      <div className="row"></div>

      <div className="row ">
        <div className="col-md-4">
          {isRedirectLast && (
            <img
              onClick={() => history.push(`/last/${currentImageId}`)}
              style={tmnImageStyle}
              src={data.pageLookup.cloudImagePath}
              className="hover"
            />
          )}
          {!isRedirectLast && (
            <img
              onClick={() => history.push(`/edit/${currentImageId}`)}
              style={tmnImageStyle}
              src={data.pageLookup.cloudImagePath}
              className="hover"
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className={title_col}>File Title</div>
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <img
                  style={imageStyle}
                  width="320px"
                  src={data.pageLookup.segmentationImagePath}
                  className="img-height"
                />
              </div>
            )}
            <div className={col}>
              <Input
                type="text"
                onChange={pageLookUpHandler}
                value={pageData.title}
                name="title"
                mt ={"mt-0"}
              />
            </div>
          </div>
          <div className="row">
            <div className={title_col}>File Name</div>
            {isMemberShip == 1 && (
              <div className="col-md-7 page-lookup-heading"></div>
            )}
            <div className={col}>
              <FileSelect
                onChange={pageLookUpHandler}
                list={data.pageLookup.file}
                value={pageData.fileId}
                name="fileId"
                mt ={"mt-0"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading">File Tag</div>
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <img
                  width="240px"
                  style={imageStyle}
                  src={data.pageLookup.fileTagImagPath}
                />
              </div>
            )}
            <div className={col}>
              <FileTagSelect
                onChange={pageLookUpHandler}
                list={data.pageLookup.file}
                value={pageData.fileId}
                name="tag"
                mt ={"mt-0"}
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
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <img
                  width="440px"
                  style={imageStyle}
                  src={data.pageLookup.shareImagePath}
                />
              </div>
            )}
            <div className={col}>
              <UserSelect
                value={pageData.shareId}
                onChange={pageLookUpHandler}
                list={data.data.profileList}
                name="shareId"
                mt ={"mt-0"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading">Date</div>
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <img
                  width="320px"
                  style={imageStyle}
                  src={data.pageLookup.dateImagePath}
                />
              </div>
            )}
            <div className={col}>
              <Input
                value={pageData.date}
                type="date"
                onChange={pageLookUpHandler}
                name="date"
                mt ={"mt-0"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading"> Page No.</div>
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <img
                  style={imageStyle}
                  width="160px"
                  src={data.pageLookup.pageNumberImagePath}
                />
              </div>
            )}
            <div className={col}>
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
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <img
                  width="240px"
                  style={imageStyle}
                  src={data.pageLookup.idImagePath}
                />
              </div>
            )}
            <div className={col}>
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
