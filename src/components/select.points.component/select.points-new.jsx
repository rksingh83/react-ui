import React, { useEffect, useState } from "react";
import TestButton from "../create-folder/create.btn.component";
import GetLoader from "../../ui/loder";
import "./points.style.scss";
import { Post, Get } from "../../service/service.setup";
//import './create-image.style.scss' ;
import { ReactComponent as Cross } from "../../assets/edit.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";

const SelectPoints = ({ match, history, sharedWithMe }) => {
  var Markers = new Array();
  const [points, setPoints] = useState(0);
  const [reset, setReset] = useState([]);
  const [src, setSrc] = useState("");
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [imagePoints, setImagePoints] = useState({});
  const totalEle = ["Home"];
  const [LiElement, setLiEl] = useState(totalEle);
  const [oneStyle, setOneStyle] = useState({});
  const [twoStyle, setTwoStyle] = useState({});
  const [threeStyle, setThreeStyle] = useState({});
  const [fourStyle, setFourStyle] = useState({});
  const [currentFolder, setCurrentFolderName] = useState("");
  var active = false;
  //const oneStyle = {}
  useEffect(() => {
    var mapSprite = new Image();
    const IMAGE_ORIGINAL_URL =
      sharedWithMe == "HOME" ? "getAnyCloudImages" : "getAnySharedCloudImages";
    Post(`/${IMAGE_ORIGINAL_URL}`, {
      ids: [match.params.url],
      imagetype: "raw_small",
    }).then((res) => {
      if (res.data.code == 201) {
        alert(res.data.error);
        history.push("/logout");
      }
      setCurrentFolderName(res.data.imageInput[0].fileName);
      mapSprite.src = res.data.imageInput[0].raw_image_small;
      setSrc(res.data.imageInput[0].raw_image_smal);
      var img = new Image();
      img.src = mapSprite.src;
      setSrc(res.data.imageInput[0].raw_image_small);
      setImagePoints(res.data.imageInput[0]);

      console.log(mapSprite.height, mapSprite);
    });
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
            console.log("doing something!");
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
        // console.log("current", e.pageX - activeItem.xOffset);
        //console.log("current", activeItem.clientX, e);
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
      // console.log(xPos , yPos)
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
    $("#outerContainer").click(function (e) {
      var offset = $(this).offset();
      var relativeX = e.pageX - offset.left;
      var relativeY = 2.2 + e.pageY - offset.top;
      // if (e.target.id == "one" || e.target.id == "two") {
      //   var relativeY = e.pageY + offset.top+12;
      // } else {
      //
      // }
      console.log(e);
      console.log(offset);
      console.log(data);

      //alert("X: " + relativeX + "  Y: " + relativeY);
      data[e.target.id] = { X: relativeX, Y: relativeY };
      setData(data);
    });
  }, []);
  const displayPoint = () => {
    const IMG = document.getElementById("img");
    const width = IMG.width / 700;
    const height = IMG.height / 400;

    console.log(imagePoints);
    const bottomleftx =
      (imagePoints["bottomleftx"] * IMG.width) / (width * 100) - 20;
    const bottomlefty =
      (imagePoints["bottomlefty"] * IMG.height) / (height * 100) - 20;
    setOneStyle({ top: bottomlefty, left: bottomleftx });

    const bottomrightx =
      (imagePoints["bottomrightx"] * IMG.width) / (width * 100) - 20;
    const bottomrighty =
      (imagePoints["bottomrighty"] * IMG.height) / (height * 100) - 20;

    setTwoStyle({ top: bottomrighty, left: bottomrightx });
    //TR
    const toprightx =
      (imagePoints["toprightx"] * IMG.width) / (width * 100) - 20;
    const toprighty =
      (imagePoints["toprighty"] * IMG.height) / (height * 100) - 20;
    console.log(toprightx);
    console.log(toprighty);
    setFourStyle({ top: toprighty, left: toprightx });
    //TL
    const topleftx = (imagePoints["topleftx"] * IMG.width) / (width * 100) - 20;
    const toplefty =
      (imagePoints["toplefty"] * IMG.height) / (height * 100) - 20;
    setThreeStyle({ top: toplefty, left: topleftx });
    setIsEdit(true);
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
    const height = IMG.height / 400;
    console.log("HEIGHT", IMG.height);
    console.log("HEIGHT", height);
    console.log("width", IMG.width);
    console.log("width", width);
    console.log(data);

    if (
      !(
        isPointChanged(data.one, "BL") &&
        isPointChanged(data.two, "BR") &&
        isPointChanged(data.three, "TL") &&
        isPointChanged(data.four, "TR")
      )
    ) {
      return;
    }
    allPoints.push(data.one);
    allPoints.push(data.two);
    allPoints.push(data.three);
    allPoints.push(data.four);

    let small = allPoints[0];
    let topRight = allPoints[0];
    let bottomRight = allPoints[0];
    let bottomLeft = allPoints[0];
    allPoints.forEach((item) => {
      if (item.X < small.X && item.Y < small.Y) small = item;

      if (item.X > small.X && item.Y < small.Y) topRight = item;
      if (item.X > small.X && item.Y > small.Y) bottomRight = item;
      if (item.Y > small.Y && item.X < small.X) bottomLeft = item;
    });
    //   console.log("BOT  TOMLEFT", bottomLeft, "BOTTOMR", bottomRight);
    // console.log("TOPLEFT", small, "TOPRIGHT", topRight);

    //  console.log("WIDTH", width, height);

    const requestPayLoad = {};
    console.log(data);
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
    // console.log(requestPayLoad);

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
                  <span className="badge badge-info p-2">
                    {currentFolder}
                  </span>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto text-white">
                <li className="nav-item">
                  <button
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
            <ul className=" ul-pad list-group left-side-bar">
              <li className="custom-pad-li list-group-item active">Home</li>
            </ul>
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
                className={`item one ${isEdit ? "" : "hide-point"}`}
                style={oneStyle}
              >
                BL
              </div>
              <div
                id="two"
                className={`item two ${isEdit ? "" : "hide-point"}`}
                style={twoStyle}
              >
                BR
              </div>
              <div
                id="three"
                className={`item three ${isEdit ? "" : "hide-point"}`}
                style={threeStyle}
              >
                TL
              </div>
              <div
                id="four"
                className={`item four ${isEdit ? "" : "hide-point"}`}
                style={fourStyle}
              >
                TR
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

const mapStateToPros = ({ sharedWithMe: { sharedWithMe } }) => ({
  sharedWithMe,
});
export default connect(mapStateToPros)(SelectPoints);
//export default SelectPoints;
