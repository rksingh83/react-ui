import React, { useState, useEffect } from "react";
import { Post } from "../../service/service.setup";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import "./lon.style.scss";
import LeftSideBar from "../sidebar/left.sidebar.compoent";
import DisplayImages from "../display-uploaded-images.component/display-uploded-images";
import DisplayImageDescription from "../display-discription/display-discription";
import TopHeaderWithBack from "../top-header/simple-top.back";
import SharedHeader from "../top-header/shared-header";
import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
import { Link } from "react-router-dom";
import CustomLoader from "../loader/loader";
import Paginate from "../common/paginate";
import {
  getNotificationsIndex as getStartIndex,
  getNotificationCount as getPageCount,
  NOTIFICATION_OFF_SET as PAGE_OFF_SET,
} from "../common/pagination.config";
import DisplayImagesWithDescription from "../display-uploaded-images.component/DisplayImagesWithDescription";

const UploadFile = ({
  dirId,
  history,
  sharedWithMe,
  setFolderFlag,
  isSharedFolder,
  images,
  filteredImages,
  searchImage,
  paginateImages,
  groupNextPrev,
  paginate,
  currentPagination,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState("");
  const [iSDisplayDiv, setIsDisplayDiv] = useState(false);
  const currentIndex = sharedWithMe == "SHARED" ? 1 : 0;
  const [imagesUpdate, setImagesUpdate] = useState([]);
  const [fileDescription, setFileDescription] = useState("");
  const [isShowLoader, setShowLoader] = useState(false);

  const paginationStyle = {
    position: "absolute",
    bottom: "14%",
    left: "40%",
  };

  const hideContentHandler = (flag) => {
    setIsDisplayDiv(flag);
  };

  const updateHandler = (list) => {
    setImagesUpdate(list);
  };
  const addFileDescriptionHandler = async () => {
    setShowLoader(true);
    try {
      const { data } = await Post("/addPageComment", {
        description: fileDescription,
        fileId: dirId,
      });
      alert(data && data.message);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
    }
  };
  return (
    <>
      {images.length > 0 && (
        <Paginate
          cls="x"
          elStyle={paginationStyle}
          setCurrentSelected={paginate}
          active={currentPagination}
          count={getPageCount(images)}
          NextPrev={groupNextPrev}
        />
      )}

      {isShowLoader && <CustomLoader />}
      {!props.isShowImageDescription && (
        <DisplayImages
          history={history}
          onLeave={hideContentHandler}
          images={paginateImages}
          folderId={dirId}
          updateHandler={updateHandler}
          isLoading={isLoading}
          filteredImages={filteredImages}
          searchInput={searchImage}
          isShowLoader={isShowLoader}
          isSharedFolder={isSharedFolder}
        />
      )}
      {props.isShowImageDescription && (
        <DisplayImagesWithDescription
          history={history}
          onLeave={hideContentHandler}
          images={paginateImages}
          folderId={dirId}
          updateHandler={updateHandler}
          isLoading={isLoading}
          filteredImages={filteredImages}
          searchInput={searchImage}
          isShowLoader={isShowLoader}
          isSharedFolder={isSharedFolder}
        />
      )}
      {images.length > 0 && !props.isShowImageDescription && (
        <div className="row my-2">
          <div className="col-md-8">
            <input
              className="form-control"
              value={fileDescription}
              onChange={(e) => setFileDescription(e.target.value)}
            ></input>
          </div>
          <div className="col-md-4">
            <button
              onClick={addFileDescriptionHandler}
              className="btn btn-dark"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
    </>
  );
};
const mapStateToPros = ({ sharedWithMe: { sharedWithMe } }) => ({
  sharedWithMe,
});
const mapDispatchToProps = (dispatch) => ({
  setFolderFlag: (flag) => dispatch(setFolderFlag(flag)),
});

export default connect(mapStateToPros, mapDispatchToProps)(UploadFile);
//export default UploadFile;
