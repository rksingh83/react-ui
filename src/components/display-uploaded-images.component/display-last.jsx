import React, { useEffect, useState } from "react";

import { Post } from "../../service/service.setup";
import "./create-image.style.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SharedHeader from "../top-header/shared-header";
import LeftSideBar from "../sidebar/left.sidebar.compoent";
import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
const DisplayLastImage = ({ match, history, sharedWithMe, setFolderFlag }) => {
  const [imageUrl, setImageUrl] = useState("");

  const currentIndex = sharedWithMe == "SHARED" ? 1 : 0;
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [currentFolderName, setCurrentFolderName] = useState("");
  const totalEle = ["My Files", "Share With Me"];
  const [LiElement, setLiEl] = useState(totalEle);
  useEffect(() => {
    const requestFile = { ids: [match.params.id], imagetype: "_align.jpg" };
    const IMAGE_ORIGINAL_URL =
      sharedWithMe == "HOME" ? "getAnyCloudImages" : "getAnySharedCloudImages";
    Post(`/${IMAGE_ORIGINAL_URL}`, requestFile).then((res) => {
      if (res.data.code == 201) {
        alert(res.data.error);
        history.push("/logout");
      }

      setCurrentFolderName(res.data.imageInput[0].fileName);
      setImageUrl(res.data.imageInput[0].raw_image_org);
    });
  }, []);
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
  const styleImage = {
    width: "100%",
    height: "100%",
    marginTop: "10px",
  };
  const crossStyle = {
    width: "4rem",
    height: "2rem",
  };
  const pencilStyle = {
    width: "4rem",
    height: "2rem",
  };
  const download = (src) => {
    var element = document.createElement("a");
    var file = new Blob([src], { type: "image/*" });
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {sharedWithMe == "SHARED" && <SharedHeader history={history} />}
          {sharedWithMe == "HOME" && (
            <nav className="navbar navbar-expand-lg navbar-light sec-header-bg">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto text-white">
                  <li className="nav-item single-header-li">
                    <span className="badge badge-info p-2">
                      {currentFolderName}
                    </span>
                  </li>
                </ul>
                <ul className="navbar-nav ml-auto text-white">
                  <li className="nav-item">
                    <Pencil
                      onClick={() => history.push(`/edit/${match.params.id}`)}
                      style={pencilStyle}
                    ></Pencil>
                  </li>
                  <li className="nav-item">
                    <Cross
                      onClick={() => history.goBack()}
                      style={crossStyle}
                    ></Cross>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-success"
                      onClick={() => history.goBack()}
                    >
                      Back
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          )}
        </div>
      </div>
      <div className="row">
        <div className=" custom-pad-li d-none d-sm-block col-md-2 p-0">
          <Link className="logo-container" to="/">
            <ul className=" ul-pad list-group left-side-bar">
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
        <div className="col-md-9 col-xs-12 col-sm-12">
          <img style={styleImage} src={`${imageUrl}`}></img>
        </div>
      </div>
    </>
  );
};
const mapStateToPros = ({ sharedWithMe: { sharedWithMe } }) => ({
  sharedWithMe,
});
const mapDispatchToProps = (dispatch) => ({
  setFolderFlag: (flag) => dispatch(setFolderFlag(flag)),
});
export default connect(mapStateToPros, mapDispatchToProps)(DisplayLastImage);
//export default DisplayLastImage;
