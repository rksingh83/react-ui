import React, { useEffect, useState } from "react";
import TestButton from "../create-folder/create.btn.component";
import GetLoader from "../../ui/loder";
import "./points.style.scss";
import { Post, Get } from "../../service/service.setup";
//import './create-image.style.scss' ;
import { ReactComponent as Cross } from "../../assets/edit.svg";
import $ from "jquery";

const SelectPoints = ({ match, history }) => {
  var Markers = new Array();
  var [points, setPoints] = useState(0);
  var [reset, setReset] = useState([]);
  var [src, setSrc] = useState("");
  const [data, setData] = useState({});

  var active = false;
  useEffect(() => {
    var mapSprite = new Image();
    Post("/getAnyCloudImages", {
      ids: [match.params.url],
      imagetype: "raw_small",
    }).then((res) => {
      mapSprite.src = res.data.imageInput[0].raw_image_small;
      setSrc(res.data.imageInput[0].raw_image_smal);
      var img = new Image();
      img.src = mapSprite.src;
      setSrc(res.data.imageInput[0].raw_image_small);
      console.log(mapSprite.height, mapSprite);
    });
    var container = document.querySelector("#container");
    var activeItem = null;
    console.log(container);
    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);
    function dragStart(e) {
      console.log(e);
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
        console.log("current", e.pageX - activeItem.xOffset);
        console.log("current", activeItem.clientX, e);
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
      var relativeY = e.pageY - offset.top;

      //alert("X: " + relativeX + "  Y: " + relativeY);
      data[e.target.id] = { X: relativeX, Y: relativeY };
      setData(data);
    });
  }, []);

  const updatePoints = async () => {
    // console.log(reset[0]);
    // const data = {};
    const allPoints = new Array();
    // reset[0].forEach((reset, i) => {
    //   console.log(reset, i);
    //   allPoints.push({ X: reset.XPos, Y: reset.YPos });
    // });

    if (
      !(
        isPointChanged(data.one, 1) &&
        isPointChanged(data.two, 2) &&
        isPointChanged(data.three, 3) &&
        isPointChanged(data.four, 4)
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
    // const IMG = document.getElementById("img");
    // const width = IMG.width / 700;
    // const height = IMG.height / 700;
    // console.log("WIDTH", width, height);

    const requestPayLoad = {};
    requestPayLoad["id"] = match.params.url;
    requestPayLoad["bottomleftx"] = bottomLeft.X;
    requestPayLoad["bottomlefty"] = bottomLeft.Y;
    requestPayLoad["bottomrightx"] = bottomRight.X;
    requestPayLoad["bottomrighty"] = bottomRight.Y;
    requestPayLoad["topleftx"] = small.X;
    requestPayLoad["toplefty"] = small.Y;
    requestPayLoad["toprightx"] = topRight.X;
    requestPayLoad["toprighty"] = topRight.Y;
    console.log("Points are right here in next line");
    console.log(requestPayLoad);

    try {
      let res = await Post("/uploadSingleImagePoints", requestPayLoad);

      alert(res.data.message);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };
  const save = () => {
    console.log(data);
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
      <div id="outerContainer" className="mt-4">
        <div id="container" style={{ backgroundImage: `url(${src})` }}>
          <div id="one" className="item one">
            1
          </div>
          <div id="two" className="item two">
            2
          </div>
          <div id="three" className="item three">
            3
          </div>
          <div id="four" className="item four">
            4
          </div>
        </div>
      </div>
      <button className=" mt-4 ml-4 btn btn-success" onClick={save}>
        Save
      </button>
    </>
  );
};

export default SelectPoints;
