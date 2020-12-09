import React, { useState, useEffect } from "react";
import { Post, Get } from "../../service/service.setup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateByAdmin } from "../../service/pendingData";
import { Alert, Button } from "react-bootstrap";
import CustomToolTip from "../common/CustomToolTip";
import { sendPageLookupInvitation } from "../../service/common";
import {
  UserSelect,
  FileSelect,
  FileTagSelect,
} from "../boostrapinput/pending-select.component";
import Input from "../boostrapinput/input.component";
import { Link } from "react-router-dom";

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
  pageLookUpDateHandler,
  isDisabled,
  ...props
}) => {
  console.log(pageData.admin_updated);
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
  const [phoneNumber, setPhoneNumber] = useState(0);
  useEffect(() => {
    console.log(pageData);
  }, [data.pageLookup]);
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
  const getDataTime = (timeStamp) => {
    let date = timeStamp.split("T");
    return `${date[0]}`;
  };
  const updateByAdminHandler = async (e) => {
    await updateByAdmin(e.target.value);
  };
  const openAllPagesHandler = () => {
    history.push("/");
    props.clearSavedImageId();
    window.location.reload();
  };
  if (data.code == "207" || data.code == "407") {
    return (
      <div style={{ width: "100%" }} className="mt-4">
        <Button
          onClick={openAllPagesHandler}
          className="btn btn-dark my-2 ml-2"
        >
          Go To All Pages
        </Button>
        <Alert className="m-auto mt-3 text-center" variant="danger">
          {data.message || " This page unavailable"}
        </Alert>
      </div>
    );
  }
  const sendInvitation = async () => {
    props.startLoader(true);
    const request = {
      phoneNumber,
      imageIds: [data.pageLookup.imageId],
      file_id: data.pageLookup.fileId,
      user_id: data.data.profileList[0].id,
    };
    try {
      const response = await sendPageLookupInvitation(request);
      console.log(response.data);
      if (response.data.code == "403") {
        alert(response.data.error);
      }else{
        alert(response.data.error);
      }
      props.startLoader(false);
    } catch (error) {
      props.startLoader(false);
    }
  };
  return (
    <div className="container-sm mt-4" style={{ maxWidth: "" }}>
      <div className="row">
        <div className="col-md-12">
          {pageData.video_url && (
            <a
              download="foo.mp4"
              target="_blank"
              className="btn btn-info my-3"
              href={pageData.video_url}
              download
            >
              Download Video
            </a>
          )}
        </div>
      </div>

      <div className="row ">
        <div className="col-md-4">
          {isRedirectLast && (
            <img
              onClick={() =>
                props.redirectAndSaveId
                  ? props.redirectAndSaveId(
                      `/last/${currentImageId}`,
                      currentImageId
                    )
                  : history.push(`/last/${currentImageId}`)
              }
              style={tmnImageStyle}
              src={data.pageLookup.cloudImagePath}
              className="hover"
            />
          )}
          {!isRedirectLast && (
            <img
              onClick={() =>
                props.redirectAndSaveId
                  ? props.redirectAndSaveId(
                      `/edit/${currentImageId}`,
                      currentImageId
                    )
                  : history.push(`/edit/${currentImageId}`)
              }
              style={tmnImageStyle}
              src={data.pageLookup.cloudImagePath}
              className="hover"
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className={title_col}>Book Name</div>
            {/* {isMemberShip == 1 && (
              <div className="col-md-7 page-lookup-heading"></div>
            )} */}
            <div className={col}>
              <FileSelect
                onChange={pageLookUpHandler}
                list={data.pageLookup.file}
                value={pageData.fileId}
                name="fileId"
                mt={"mt-0"}
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading">Book Tag</div>
            <div className={col}>
              <FileTagSelect
                onChange={pageLookUpHandler}
                list={data.pageLookup.file}
                value={pageData.fileId}
                name="tag"
                mt={"mt-0"}
                disabled={isDisabled}
              />
            </div>
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <img
                  width="240px"
                  style={imageStyle}
                  src={data.pageLookup.fileTagImagPath}
                />
              </div>
            )}
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
            <div className={title_col}>Page Title</div>
            <div className={col}>
              <Input
                type="text"
                onChange={pageLookUpHandler}
                value={pageData.title}
                name="title"
                mt={"mt-0"}
                disabled={isDisabled}
              />
            </div>
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
          </div>
          {!isDisabled && (
            <div className="row">
              <div className="col-md-2 page-lookup-heading">Share</div>
              <div className={col}>
                <UserSelect
                  value={pageData.shareId}
                  onChange={pageLookUpHandler}
                  list={data.data.profileList}
                  name="shareId"
                  mt={"mt-0"}
                  disabled={isDisabled}
                />
              </div>
              {isMemberShip == 1 && (
                <div className="col-md-7">
                  <img
                    width="100%"
                    style={imageStyle}
                    src={data.pageLookup.shareImagePath}
                  />
                </div>
              )}
            </div>
          )}

          <div className="row">
            <div className="col-md-2 page-lookup-heading">Date</div>
            <div className={col}>
              {pageData.date && (
                <DatePicker
                  name="date"
                  className="form-control"
                  selected={new Date(pageData.date)}
                  onChange={pageLookUpDateHandler}
                  disabled={isDisabled}
                  dateFormat="dd/MM/yyyy"
                />
              )}
            </div>
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <img
                  width="320px"
                  style={imageStyle}
                  src={data.pageLookup.dateImagePath}
                />
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading"></div>
            <div
              className={col}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Button onClick={sendInvitation} className="btn btn-info">
                Send Invite
              </Button>
            </div>
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <Input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  placeholder="Enter Email or Phone"
                />
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading"> Page No.</div>
            <div className={col}>
              <Input
                type="text"
                onChange={pageLookUpHandler}
                value={pageData.pageNumber}
                name="pageNumber"
                disabled={isDisabled}
              />
            </div>
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <img
                  style={imageStyle}
                  width="160px"
                  src={data.pageLookup.pageNumberImagePath}
                />
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading"> ID.</div>
            <div className={col}>
              <Input
                disabled={isDisabled}
                onChange={pageLookUpHandler}
                value={pageData.id}
                name="id"
                type="text"
              />
            </div>
            {isMemberShip == 1 && (
              <div className="col-md-7">
                <img
                  width="240px"
                  style={imageStyle}
                  src={data.pageLookup.idImagePath}
                />
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-2 page-lookup-heading">Description</div>
            <div className="col-md-10">
              <Input
                type="text"
                onChange={pageLookUpHandler}
                value={pageData.description}
                placeholder="Description"
                name="description"
                disabled={isDisabled}
              />
            </div>
          </div>
        </div>
      </div>
      {props.role != "labeller" && !isDisabled && (
        <div className="row py-3">
          <div className="col-md-4">
            <span className="set-by-admin">
              Do you want this page to be edited by Admin?
            </span>{" "}
          </div>
          <div className="col-md-1">
            <span className="radio-span">
              NO
              <input
                value={0}
                checked={!Number(pageData.admin_updated)}
                onChange={(e) => pageLookUpHandler(e)}
                id="male"
                name="admin_updated"
                className="form-control radio"
                type="radio"
              />
            </span>
          </div>
          <div className="col-md-1">
            <span className="radio-span">
              YES
              <input
                onChange={(e) => pageLookUpHandler(e)}
                value={1}
                id="male"
                name="admin_updated"
                className="form-control radio"
                type="radio"
                checked={Number(pageData.admin_updated)}
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default PendingPageData;
