import React from "react";

const CapturedImages = ({ images }) => {
  return (
    <>
      {images.map((imageSrc) => (
        <div className="m-3">
          <img
            style={{ height: "140px" }}
            src={require("../../assets/spiral.png")}
            className="image-fluid"
          ></img>
          <img style={{ height: "140px" }}  className="image-fluid" src={imageSrc}></img>
        </div>
      ))}
    </>
  );
};

export default CapturedImages;
