import React, { useEffect, useState } from "react";
import "./create-image.style.scss";
import { ReactComponent as Next } from "../../assets/next.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import { ToastContainer, toast } from "react-toastify";
import LeftSideBar from "../sidebar/left.sidebar.compoent";
import { Post } from "../../service/service.setup";
import OpenPop from "../modal/open.model.component";
import { connect } from "react-redux";

import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
import { Link } from "react-router-dom";
const ImageSlider = ({
  sharedWithMe,
  images,
  current,
  history,
  setImageId,
  setFolderFlag
}) => {
  const totalEle = [ "My Files", "Share With Me"];
  const [LiElement, setLiEl] = useState(totalEle);
  const currentIndex = sharedWithMe == "SHARED" ? 1 : 0;
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [isShowPop, setIsShowPop] = useState(false);
  const [pageNo, setPageNo] = useState(null);
  const [desc, setDesc] = useState(null);
  const [date, setDate] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState(current);

  const handleActive = (e) => {
    setActiveIndex(LiElement.indexOf(e));
    if (LiElement.indexOf(e) == 0) {
      setFolderFlag("HOME");
    } else {
      setFolderFlag("SHARED");
    }
    // setSharedWithMe(!sharedWithMe);
    setLiEl(totalEle);
  };
  const openPop = (pageNo, des, dt, id) => {
    setIsShowPop(true);
    setPageNo(pageNo);
    setDesc(des);
    setDate(dt);
    setId(id);
  };
  const updateImage = (data) => {
    const id = data.id;
    document.getElementById(`pageNo_${id}`).innerHTML = data.pageNo;
    document.getElementById(`desc_${id}`).innerHTML = data.des;
    document.getElementById(`date_${id}`).innerHTML = data.dt;
    setIsShowPop(false);
    const requestPayLoad = {
      imageInput: [
        { id: data.id, pageNumber: data.pageNo, description: data.des },
      ],
    };
    updateToServer(requestPayLoad);
  };
  const updateToServer = async (data) => {
    try {
      let res = await Post("/updateImage", data);
      if (res.data.code == 200) alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  const sideBarStyle = {
    border: "1px solid rgba(0, 0, 0, 0.125)",
    height: "90vh",
  };
  const styles = {
    position: "absolute",
  };
  console.log(images);
  const ParentStyles = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  };

  const getCurrentIndex = () => {
    const allImages = document.querySelectorAll(".show-image");
    let imageIndex;
    allImages.forEach((item) => {
      if (item.style.display == "block")
        imageIndex = item.getAttribute("currentindex");
    });
    const currentImage = images.filter((item) => item.id == imageIndex);
    let currentIndex = images.indexOf(currentImage[0]);
    return currentIndex;
  };
  const nextImage = () => {
    const allImages = document.querySelectorAll(".show-image");
    let currentIndex = getCurrentIndex();
    if (currentIndex == images.length - 1) {
      alert("You've reached last image in the file ");
      return;
    }
    if (currentIndex < images.length) {
      currentIndex = currentIndex + 1;
    }
    let selectedIndex = images[currentIndex].id;
    allImages.forEach((item) => {
      if (item.getAttribute("currentindex") == selectedIndex) {
        item.style.display = "block";
        setImageId(item.getAttribute("currentindex"));
      } else {
        item.style.display = "none";
      }
    });
  };
  const prevImage = () => {
    const allImages = document.querySelectorAll(".show-image");
    let currentIndex = getCurrentIndex();
    if (currentIndex == 0) {
      alert("You've reached first image in the file ");
      return;
    }
    if (currentIndex < images.length) {
      currentIndex = currentIndex - 1;
    }
    let selectedIndex = images[currentIndex].id;
    allImages.forEach((item) => {
      if (item.getAttribute("currentindex") == selectedIndex) {
        item.style.display = "block";
        setImageId(item.getAttribute("currentindex"));
      } else {
        item.style.display = "none";
      }
    });
  };
  return (
    <>
      <div className=" custom-pad-li d-none d-sm-block col-md-2 p-0">
        <Link className="logo-container" to="/">
          <ul className=" ul-pad list-group" style={sideBarStyle}>
            {totalEle.map((item, index) => (
              <LeftSideBar
                item={item}
                key={index}
                isActive={activeIndex == index ? true : false}
                changeActive={handleActive}
              />
            ))}
          </ul>
        </Link>
      </div>
      <div className="col-md-9" style={ParentStyles}>
        <ToastContainer />
        {images.map((image, index) => (
          <div
            className="show-image"
            currentindex={image.id}
            style={{ display: current == image.id ? "block" : "none" }}
            key={index}
          >
            <img
              className="image"
              onClick={() => history.push(`/last/${image.id}`)}
              className="display-image"
              src={image.raw_image_org}
            ></img>
          </div>
        ))}
        <Next className="next-btn common-btn" onClick={nextImage}></Next>
        <Back className="prev-btn common-btn" onClick={prevImage}></Back>
        <OpenPop
          des={desc}
          pageNo={pageNo}
          dt={date}
          isShow={isShowPop}
          handleClose={() => setIsShowPop(false)}
          setPageNo={(e) => setPageNo(e)}
          setDt={(e) => setDate(e)}
          setDesc={(e) => setDesc(e)}
          id={id}
          updateImage={updateImage}
        ></OpenPop>
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setFolderFlag: (flag) => dispatch(setFolderFlag(flag)),
});
//export default ImageSlider;
const mapStateToPros = ({ sharedWithMe: { sharedWithMe } }) => ({
  sharedWithMe,
});
export default connect(mapStateToPros ,mapDispatchToProps)(ImageSlider);
