import React from "react";
import BackSrc from "../../assets/back.png";
import LeftSrc from "../../assets/left.png";
import RightSrc from "../../assets/right.png";
import save from "../../assets/save.png";
import edit from "../../assets/edit.png";
const BackButton = ({ handler }) => {
  return (
    <>
      <img
        onClick={handler}
        className="icon-image float-right"
        src={BackSrc}
        alt="fireSpot"
      />
    </>
  );
};
const Save = ({ handler }) => {
  return (
    <>
      <img
        onClick={handler}
        className="icon-image float-right"
        src={save}
        alt="fireSpot"
      />
    </>
  );
};
const Left = ({ handler }) => {
  return (
    <>
      <img
        onClick={handler}
        className="icon-image"
        src={LeftSrc}
        alt="fireSpot"
      />
    </>
  );
};
const Right = ({ handler }) => {
  return (
    <>
      <img
        onClick={handler}
        className="icon-image"
        src={RightSrc}
        alt="fireSpot"
      />
    </>
  );
};

const EditBtn = ({ handler }) => {
  return (
    <>
      <img onClick={handler} className="icon-image" src={edit} alt="fireSpot" />
    </>
  );
};
export { BackButton, Left, Right, EditBtn ,Save};
