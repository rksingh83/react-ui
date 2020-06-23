import React, { useEffect, useState } from "react";
import TestButton from "../create-folder/create.btn.component";
import GetLoader from "../../ui/loder";
import "./points.style.scss";
import { Post, Get } from "../../service/service.setup";
//import './create-image.style.scss' ;
import { ReactComponent as Cross } from "../../assets/edit.svg";

const SelectPoints = ({ match, history }) => {
  var Markers = new Array();
  var [points, setPoints] = useState(0);
  var [reset, setReset] = useState([]);
  var [src, setSrc] = useState("");

  var active = false;
  useEffect(() => {
    var mapSprite = new Image();
    Post("/getAnyCloudImages", {
      ids: [match.params.url],
      imagetype: "raw_small",
    }).then((res) => {
      mapSprite.src = res.data.imageInput[0].raw_image_small;
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
  }, []);

  const updatePoints = async () => {
    console.log(reset[0]);
    const data = {};
    const allPoints = new Array();
    reset[0].forEach((reset, i) => {
      console.log(reset, i);
      allPoints.push({ X: reset.XPos, Y: reset.YPos });
    });
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
    const IMG = document.getElementById("img");
    const width = IMG.width / 700;
    const height = IMG.height / 700;
    console.log("WIDTH", width, height);

    const requestPayLoad = {};
    requestPayLoad["id"] = match.params.url;
    requestPayLoad["bottomleftx"] = ((bottomLeft.X * width) / IMG.width) * 100;
    requestPayLoad["bottomlefty"] =
      ((bottomLeft.Y * height) / IMG.height) * 100;
    requestPayLoad["bottomrightx"] =
      ((bottomRight.X * width) / IMG.width) * 100;
    requestPayLoad["bottomrighty"] =
      ((bottomRight.Y * height) / IMG.height) * 100;
    requestPayLoad["topleftx"] = ((small.X * width) / IMG.width) * 100;
    requestPayLoad["toplefty"] = ((small.Y * height) / IMG.height) * 100;
    requestPayLoad["toprightx"] = ((topRight.X * width) / IMG.width) * 100;
    requestPayLoad["toprighty"] = ((topRight.Y * height) / IMG.height) * 100;
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
  return (
    <div id="outerContainer">
      <div id="container">
        <div className="item one"></div>
        <div className="item two"></div>
        <div className="item three"></div>
        <div className="item four"></div>
      </div>
    </div>
  );
};

export default SelectPoints;
