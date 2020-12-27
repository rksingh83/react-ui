import React, { useState } from "react";
import { ReactComponent as DeleteButton } from "../../assets/delete.svg";
import { ReactComponent as Back } from "../../assets/new-left.svg";
import UploadForm from "../upload-image/upload-images";
import { Post, Get } from "../../service/service.setup";
import { getSharedWithList } from "../../service/common";
import {
  EditBtn,
  Save as SaveBtn,
  Right as RightButton,
  Left as LeftButton,
} from "../common/pNGButtons";
import CustomToolTip from "../common/CustomToolTip";
import ImageSharedList  from "../SharedList/ImageSharedList";
import ImageSharedListModal from '../SharedList/ImageSharedListModal'
const PendingHeader = ({
  prev,
  next,
  pendingFolderId,
  currentImageId,
  all,
  saveHandler,
  history,
  ...props
}) => {
  const isNone = props.role === "labeller" ? "none" : "";
  const [imageSharedWith , setImageSharedWith] = useState([]);
  const [openModal , setOpenModal] = useState(false)
  const uploadImageHandler = async (e) => {
    //  e.preventDefault();
    props.toggleLoader(true);
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
        props.resMgs(res.data.message);
        props.setShowPop(true);
        props.toggleLoader(false);
        window.location.reload();
      } else {
        alert("Something went wrong try later");
      }
    } catch (err) {}
  };
  const saveWithNotification = () => {
    saveHandler(false);
  };
  const getSharedUserListHandler = async () => {
    const response = await getSharedWithList(currentImageId, pendingFolderId);
     if(response.data.data){
    setImageSharedWith(response.data.data.profile)
     }else{
      setImageSharedWith([{fullname :"This page is not shared with any one"}])
     }
    setOpenModal(true)
  };
  return (
    <main className="">
      <ImageSharedListModal closeModal = {()=>setOpenModal(false)} show ={openModal}>
        <ImageSharedList users ={imageSharedWith}/>
      </ImageSharedListModal>
      <div className="row">
        <div
          className="col-md-2"
          style={{ background: "rgba(0, 0, 0, 0.125)", minHeight: "3rem" }}
        ></div>
        <div className="col-md-10 main-pending-page-header">
          {all.length > 0 && props.role != "labeller" && (
            <CustomToolTip text="Retake Image">
              <UploadForm submitHandler={uploadImageHandler}></UploadForm>
            </CustomToolTip>
          )}
          {props.role === "labeller" && (
            <button onClick={() => saveHandler(true)} className="btn btn-info">
              SaveWithoutNotification
            </button>
          )}

          <button onClick={getSharedUserListHandler} className="btn btn-info">
            SharedWith
          </button>

          {all.length > 0 && props.role != "labeller" && (
            <CustomToolTip text="Delete Image">
              <DeleteButton
                className=" mr-2"
                onClick={props.deleteImg}
              ></DeleteButton>
            </CustomToolTip>
          )}

          {all.length > 0 && (
            <CustomToolTip text="Save Image">
              <SaveBtn handler={saveWithNotification} />
            </CustomToolTip>
          )}

          {all.length > 0 && (
            // <button
            //   className="btn btn-success"
            //   onClick={() =>
            //     props.redirectAndSaveId(
            //       `/edit/${currentImageId}`,
            //       currentImageId
            //     )
            //   }
            // >
            //   Edit
            // </button>
            <CustomToolTip text="Edit">
              <EditBtn
                handler={() =>
                  props.redirectAndSaveId(
                    `/edit/${currentImageId}`,
                    currentImageId
                  )
                }
              />
            </CustomToolTip>
          )}

          {props.role != "labeller" && (
            <CustomToolTip text="Previous">
              <LeftButton handler={prev} />
            </CustomToolTip>
          )}

          {props.role === "labeller" ? (
            <button onClick={next} className="btn btn-dark">
              Skip
            </button>
          ) : (
            // <Next className="header-svg" onClick={next} />

            <CustomToolTip text="Next">
              <RightButton handler={next} />
            </CustomToolTip>
          )}
          {props.role != "labeller" && (
            <span className="info"> Total Default Page </span>
          )}
          {props.role != "labeller" && (
            <span className="badge badge-info">{all.length}</span>
          )}

          <span className="info ml-2">Current</span>
          <span className="badge badge-info">
            {all.indexOf(currentImageId) + 1}
          </span>
        </div>
      </div>
    </main>
  );
};

export default PendingHeader;
