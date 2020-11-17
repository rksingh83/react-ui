import React from "react";
import { ReactComponent as Next } from "../../assets/new-right.svg";
import { ReactComponent as Back } from "../../assets/new-left.svg";
import UploadForm from "../upload-image/upload-images";
import Save from "../../assets/save.png";
import Left from "../../assets/left.png";
import Right from "../../assets/right.png";
import { Post, Get } from "../../service/service.setup";
import {
  EditBtn,
  Save as SaveBtn,
  Right as RightButton,
  Left as LeftButton,
} from "../common/pNGButtons";
import CustomToolTip from "../common/CustomToolTip";
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
  return (
    <main className="">
      <div className="row">
        <div
          className="col-md-2"
          style={{ background: "rgba(0, 0, 0, 0.125)", minHeight: "3rem" }}
        ></div>
        <div className="col-md-10 main">
          <div>
            {all.length > 0 && props.role != "labeller" && (
              <CustomToolTip text="Retake Image">
                <UploadForm submitHandler={uploadImageHandler}></UploadForm>
              </CustomToolTip>
            )}
          </div>
          <div>
            {all.length > 0 && props.role != "labeller" && (
             <CustomToolTip text="Delete Image">
             <button className="btn btn-danger" onClick={props.deleteImg}>
                Delete
              </button>
              </CustomToolTip>
            )}
          </div>
          <div>
            {all.length > 0 && (
              <CustomToolTip text="Save Image">
                <SaveBtn />
              </CustomToolTip>
            )}
          </div>
          <div>
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
          </div>
          <div style={{ display: isNone }}>
            <span className="info"> Total Default Page </span>
            <span className="badge badge-info">{all.length}</span>
          </div>
          <div>
            <span className="info">Current</span>
            <span className="badge badge-info">
              {all.indexOf(currentImageId) + 1}
            </span>
          </div>

          {props.role != "labeller" && (
            <div>
              <CustomToolTip text="Previous">
                <LeftButton handler={prev} />
              </CustomToolTip>
            </div>
          )}

          <div>
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default PendingHeader;
