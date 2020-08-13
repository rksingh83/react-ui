import React, { useEffect, useState } from "react";
import LoadLookup from "./display-page-lookup";
import {
  getAllPendingPageList,
  getPendingPageById,
} from "../../service/pendingData";

import "./add-friend.style.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { ReactComponent as Yes } from "../../assets/yes.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
import { Link } from "react-router-dom";
import Input from "../boostrapinput/input.component";
import { get } from "js-cookie";

const PendingPageData = () => {
  const [allPendingLIst, setPendingList] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [currentLookup, setCurrentLookup] = useState(false);
  useEffect(() => {
    console.log(getCurrentPage());
  }, [currentImage]);
  useEffect(() => {
    console.log(getAllPageList());
  }, []);
  const getAllPageList = async () => {
    const response = await getAllPendingPageList();
    let imageIds = [];
    response.data.imageInput.forEach((item) => imageIds.push(item.id));
    console.log(imageIds);
    setPendingList(imageIds);
    setCurrentImage(imageIds[0]);
  };
  const getCurrentPage = async () => {
    const response = await getPendingPageById(currentImage);
    setCurrentLookup(response.data && response.data);
  };
  const nextHandler = () => {
    let index = allPendingLIst.indexOf(currentImage);
    if (index == allPendingLIst.length - 1) {
      alert("This is Last File");
      return;
    }
    setCurrentImage(allPendingLIst[index + 1]);
  };
  const prevHandler = () => {
    let index = allPendingLIst.indexOf(currentImage);
    if (index == 0) {
      alert("This is Last File");
      return;
    }
    setCurrentImage(allPendingLIst[index - 1]);
  };
  return (
    <React.Fragment>
      {currentLookup && (
        <LoadLookup
          next={nextHandler}
          prev={prevHandler}
          data={currentLookup}
        ></LoadLookup>
      )}
    </React.Fragment>
  );
};
export default PendingPageData;
