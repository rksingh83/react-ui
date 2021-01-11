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

const UploadFile = ({
  dirId,
  history,
  sharedWithMe,
  setFolderFlag,
  isSharedFolder,
  images,
}) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [paginateImages, setPaginateImages] = useState([]);
  const [date, setDate] = useState("");
  const [iSDisplayDiv, setIsDisplayDiv] = useState(false);
  const currentIndex = sharedWithMe == "SHARED" ? 1 : 0;
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [imagesUpdate, setImagesUpdate] = useState([]);
  const [filteredImages, setFilteredImages] = useState("");
  const [searchImage, setSearchImage] = useState("");
  const [isShowLoader, setShowLoader] = useState(false);
  const [currentPagination, setCurrentPagination] = useState(1);

 
  const paginationStyle = {
    position: "absolute",
    bottom: "14%",
    left: "40%",
  };
  const searchImageHandler = (e) => {
    setSearchImage(e.target.value);
    setFilteredImages(
      images.filter((item) => {
        if (item.title) {
          return item.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      })
    );
  };

useEffect(()=>{
paginate(images.length)
},[images])
  
  const hideContentHandler = (flag) => {
    setIsDisplayDiv(flag);
  };

  const updateHandler = (list) => {
    setImagesUpdate(list);
  };
  const paginate = (number) => {
    const allImages = [...images];
    setPaginateImages(allImages.splice(getStartIndex(number), PAGE_OFF_SET));
    setCurrentPagination(number);
  };

  const groupNextPrev = (type) => {
    if (type === "NEXT") {
      if (currentPagination == getPageCount(images)) return;
      paginate(currentPagination + 1);
    } else {
      if (currentPagination == 1) return;
      paginate(currentPagination - 1);
    }
  };
  return (
    <>
      {isShowLoader && <CustomLoader />}
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
      {images.length > 0 && (
        <Paginate
          cls="display-image-pagination"
          elStyle={paginationStyle}
          setCurrentSelected={paginate}
          active={currentPagination}
          count={getPageCount(images)}
          NextPrev={groupNextPrev}
        />
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
