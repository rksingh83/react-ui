import React, { useEffect, useState, useRef } from "react";
import TestButton from "../create-folder/create.btn.component";
import GetLoader from "../../ui/loder";
import "./points.style.scss";
import { Post, Get } from "../../service/service.setup";
//import './create-image.style.scss' ;
import { ReactComponent as Cross } from "../../assets/edit.svg";
import { ReactComponent as Refresh } from "../../assets/refresh-point.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";
import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
import LeftSideBar from "../sidebar/left.sidebar.compoent";
import AllFilesSideBar from '../common/AllFilesSideBar'
const SelectPoints = ({ match, history, sharedWithMe, setFolderFlag ,currentUser }) => {
  var Markers = new Array();
  const [points, setPoints] = useState(0);
  const ROLE =     currentUser && currentUser.authentication.role
  const [reset, setReset] = useState([]);
  const [src, setSrc] = useState(" ");
  const [data, setData] = useState({});
  const TextMAp = { HOME: 0, SHARED: 1, PENDING: 2 };
  const currentIndex = TextMAp[sharedWithMe];
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [isEdit, setIsEdit] = useState(false);
  const [imagePoints, setImagePoints] = useState({});
  const [cordinates, setCordinates] = useState(null);
  const totalEle = ["My Books", "Shared Books", "Pending"];
  const [LiElement, setLiEl] = useState(totalEle);
  const [oneStyle, setOneStyle] = useState({});
  const [twoStyle, setTwoStyle] = useState({});
  const [threeStyle, setThreeStyle] = useState({});
  const [fourStyle, setFourStyle] = useState({});
  const [currentFolder, setCurrentFolderName] = useState("");
  var active = false;
  const EditButton = useRef(null);
  const fourDiv = useRef(null);
  //const oneStyle = {}
  const handleActive = (e) => {
    setActiveIndex(LiElement.indexOf(e));
    if (LiElement.indexOf(e) == 0) {
      setFolderFlag("HOME");
    }
    if (LiElement.indexOf(e) == 1) {
      setFolderFlag("SHARED");
    }
    if (LiElement.indexOf(e) == 2) {
      setFolderFlag("PENDING");
    }
    // setSharedWithMe(!sharedWithMe);
    setLiEl(totalEle);
  };
  useEffect(() => {
    var mapSprite = new Image();
    const IMAGE_ORIGINAL_URL =
      sharedWithMe == "HOME" ? "getAnyCloudImages" : "getAnySharedCloudImages";
    Post(`/${IMAGE_ORIGINAL_URL}`, {
      ids: [match.params.url],
      imagetype: "_raw_small.jpg",
    }).then((res) => {
      if (res.data.code == 201) {
        alert(res.data.error);
        history.push("/logout");
      }
      setCurrentFolderName(res.data.imageInput[0].fileName);
      mapSprite.src = res.data.imageInput[0].raw_image_org;
      setSrc(res.data.imageInput[0].raw_image_org);
      var img = new Image();
      img.src = mapSprite.src;
      setSrc(res.data.imageInput[0].raw_image_org);
      setImagePoints(res.data.imageInput[0]);
      // displayPoint();

      // ({ height: img.height, width: img.width }, src);
      if (img.height > 0 && img.width)
        setCordinates({ height: img.height, width: img.width });
    });
  }, []);
  useEffect(() => {
    var container = document.querySelector("#container");
    var activeItem = null;
    // console.log(container);
    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);
    function dragStart(e) {
      // console.log(e);
      if (e.target !== e.currentTarget) {
        active = true;

        // this is the item we are interacting with
        activeItem = e.target;

        if (activeItem !== null) {
          if (!activeItem.xOffset) {
            activeItem.xOffset = 0;
          }

          if (!activeItem.yOffset) {
            activeItem.yOffset = 0;
          }

          if (e.type === "touchstart") {
            activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
            activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
          } else {
            activeItem.initialX = e.clientX - activeItem.xOffset;
            activeItem.initialY = e.clientY - activeItem.yOffset;
          }
        }
      }
    }

    function dragEnd(e) {
      if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
      }

      active = false;
      activeItem = null;
    }

    function drag(e) {
      if (active) {
        if (e.type === "touchmove") {
          e.preventDefault();

          activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
          activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
          activeItem.currentX = e.clientX - activeItem.initialX;
          activeItem.currentY = e.clientY - activeItem.initialY;
        }

        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
    $("#outerContainer").click(function (e) {
      console.log(e)
      var offset = $(this).offset();
      var relativeX = e.pageX - offset.left;
      var relativeY = e.pageY - offset.top;
      let temp = {};
      data[e.target.id] = { X: relativeX, Y: relativeY };
      console.log(data)
      setData({ ...data });
    });
  }, [data]);

  const displayPoint = () => {
    const IMG = document.getElementById("img");
    const width = IMG.width / 700;
    const height = IMG.height / 700;
    console.log(height, "wid", width);
    let tempData = {};
    const bottomleftx =
      (imagePoints["bottomleftx"] * IMG.width) / (width * 100) - 7.5;
    const bottomlefty =
      (imagePoints["bottomlefty"] * IMG.height) / (height * 100) - 7.5;
    setOneStyle({ top: bottomlefty, left: bottomleftx });
    tempData = { one: { X: bottomleftx + 7.5, Y: bottomlefty + 7.5 } };

    const bottomrightx =
      (imagePoints["bottomrightx"] * IMG.width) / (width * 100) - 7.5;
    const bottomrighty =
      (imagePoints["bottomrighty"] * IMG.height) / (height * 100) - 7.5;

    setTwoStyle({ top: bottomrighty, left: bottomrightx });
    tempData = {
      ...tempData,
      two: { X: bottomrightx + 7.5, Y: bottomrighty + 7.5 },
    };
    //TR
    const toprightx =
      (imagePoints["toprightx"] * IMG.width) / (width * 100) - 7.5;
    const toprighty =
      (imagePoints["toprighty"] * IMG.height) / (height * 100) - 7.5;

    setFourStyle({ top: toprighty, left: toprightx });
    tempData = { ...tempData, four: { X: toprightx + 7.5, Y: toprighty + 7.5 } };
    //TL
    const topleftx = (imagePoints["topleftx"] * IMG.width) / (width * 100) - 7.5;
    const toplefty =
      (imagePoints["toplefty"] * IMG.height) / (height * 100) - 7.5;
    setThreeStyle({ top: toplefty, left: topleftx });
    tempData = { ...tempData, three: { X: topleftx + 7.5, Y: toplefty + 7.5 } };
    setIsEdit(true);
    setData(tempData);
  };
  const renderPoint = () => {
    const IMG = document.getElementById("img");
    const width = IMG.width / 700;
    const height = IMG.height / 700;
    console.log(height, "wid", width);
    let tempData = {};
    const bottomleftx = (10 * IMG.width) / (width * 100) - 7.5;
    const bottomlefty = (90 * IMG.height) / (height * 100) - 7.5;
    setOneStyle({ top: bottomlefty, left: bottomleftx });
    fourDiv.current.style.top = bottomlefty;
    fourDiv.current.style.left = bottomleftx;
    tempData = { one: { X: bottomleftx + 7.5, Y: bottomlefty + 7.5 } };

    const bottomrightx = (90 * IMG.width) / (width * 100) - 20;
    const bottomrighty = (90 * IMG.height) / (height * 100) - 20;

    setTwoStyle({ top: bottomrighty, left: bottomrightx });
    tempData = {
      ...tempData,
      two: { X: bottomrightx + 20, Y: bottomrighty + 20 },
    };
    //TR
    const toprightx = (90 * IMG.width) / (width * 100) - 20;
    const toprighty = (10 * IMG.height) / (height * 100) - 20;

    setFourStyle({ top: toprighty, left: toprightx });
    tempData = { ...tempData, four: { X: toprightx + 20, Y: toprighty + 20 } };
    //TL
    const topleftx = (10 * IMG.width) / (width * 100) - 20;
    const toplefty = (10 * IMG.height) / (height * 100) - 20;
    setThreeStyle({ top: toplefty, left: topleftx });
    tempData = { ...tempData, three: { X: topleftx + 20, Y: toplefty + 20 } };
    setIsEdit(true);
    setData(tempData);
  };
  const updatePoints = async () => {
    // console.log(reset[0]);
    // const data = {};
    const allPoints = new Array();
    // reset[0].forEach((reset, i) => {
    //   console.log(reset, i);
    //   allPoints.push({ X: reset.XPos, Y: reset.YPos });
    // });
    const IMG = document.getElementById("img");
    const width = IMG.width / 700;
    const height = IMG.height / 700;
    const requestPayLoad = {};
    console.log(data);
    debugger;
    requestPayLoad["id"] = match.params.url;
    requestPayLoad["bottomleftx"] = ((data.one.X * width) / IMG.width) * 100;
    requestPayLoad["bottomlefty"] = ((data.one.Y * height) / IMG.height) * 100;
    requestPayLoad["bottomrightx"] = ((data.two.X * width) / IMG.width) * 100;
    requestPayLoad["bottomrighty"] = ((data.two.Y * height) / IMG.height) * 100;
    requestPayLoad["topleftx"] = ((data.three.X * width) / IMG.width) * 100;
    requestPayLoad["toplefty"] = ((data.three.Y * height) / IMG.height) * 100;
    requestPayLoad["toprightx"] = ((data.four.X * width) / IMG.width) * 100;
    requestPayLoad["toprighty"] = ((data.four.Y * height) / IMG.height) * 100;
    console.log("Points are right here in next line");
    try {
      let res = await Post("/uploadSingleImagePoints", requestPayLoad);

      alert(res.data.message);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
    console.log(data);
  };
  const save = () => {
    //console.log(data);
    updatePoints();
  };
  const isPointChanged = (key, number) => {
    if (!key) {
      alert(`Please update position of ${number} point`);
      return false;
    }
    return true;
  };
  useEffect(() => {
    // displayPoint(true);
  }, [cordinates]);
  const reSetPoint = () => {
    const IMG = document.getElementById("img");
    const bottomleftx = (10 * IMG.width) / (IMG.width * 100);
    const bottomlefty = (10 * IMG.height) / (IMG.height * 100);
    //setOneStyle({ top: bottomlefty, left: bottomleftx });
    fourDiv.current.style.top = "0px";
    fourDiv.current.style.left = "0px";
    fourDiv.current.style.top = bottomlefty;
    fourDiv.current.style.left = bottomleftx;
    console.log(fourDiv.current.style);
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
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
                  <span className="badge badge-info p-2">{currentFolder}</span>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto text-white">
                <li className="nav-item">
                  <Refresh
                    className="mr-2"
                    style={{ height: "35px" }}
                    onClick={renderPoint}
                  />
                </li>
                <li className="nav-item">
                  <button
                    ref={EditButton}
                    className=" mr-2 btn btn-success"
                    onClick={() => displayPoint(true)}
                  >
                    Edit Points
                  </button>
                </li>
                <li className="nav-item">
                  <button className=" mr-2 btn btn-success" onClick={save}>
                    Save
                  </button>
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
        </div>
      </div>
      <div className="row">
        <div className=" custom-pad-li d-none d-sm-block col-md-2 p-0">
          <Link className="logo-container" to="/">
          {ROLE !='labeller' ?<ul className=" ul-pad list-group left-side-bar">
              {totalEle.map((item, index) => (
                <LeftSideBar
                  item={item}
                  key={index}
                  isActive={activeIndex == index ? true : false}
                  changeActive={handleActive}
                />
              ))}
            </ul>:<AllFilesSideBar/>}
          </Link>
        </div>
        <div className="col-md-9 col-xs-12 col-sm-12">
          <div
            style={{ width: 700, height: 700, margin: "auto" }}
            id="outerContainer"
            className="mt-4"
          >
            <div
              id="container"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "100% 100%",
                border: "2px solid green",
              }}
            >
              <div
                id="one"
                ref={fourDiv}
                className={`item one ${isEdit ? "" : "hide-point"}`}
                style={oneStyle}
              >
                .
              </div>
              <div
                id="two"
                className={`item two ${isEdit ? "" : "hide-point"}`}
                style={twoStyle}
              >
                .
              </div>
              <div
                id="three"
                className={`item three ${isEdit ? "" : "hide-point"}`}
                style={threeStyle}
              >
                .
              </div>
              <div
                id="four"
                className={`item four ${isEdit ? "" : "hide-point"}`}
                style={fourStyle}
              >
                .
              </div>
            </div>
          </div>

          <div style={{ display: "none" }}>
            <img id="img" src={src}></img>
          </div>
        </div>
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setFolderFlag: (flag) => dispatch(setFolderFlag(flag)),
});
const mapStateToPros = ({ sharedWithMe: { sharedWithMe }, user: { currentUser } }) => ({
  sharedWithMe,currentUser
});

export default connect(mapStateToPros, mapDispatchToProps)(SelectPoints);
//export default SelectPoints;
