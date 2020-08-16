import React, { useEffect, useState } from "react";
import LoadLookup from "./display-page-lookup";
import {
  getAllPendingPageList,
  getPendingPageById,
} from "../../service/pendingData";

import "./add-friend.style.scss";


import { Link } from "react-router-dom";
import Input from "../boostrapinput/input.component";
import { get } from "js-cookie";

const PendingPageData = ({ history }) => {
  const [allPendingLIst, setPendingList] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [currentLookup, setCurrentLookup] = useState(false);
  const [pendingFolderId, setPendingFolderId] = useState("");
  useEffect(() => {
    getCurrentPage();
  }, [currentImage]);
  useEffect(() => {
    console.log("in use efftect" ,allPendingLIst)
    setCurrentImage(allPendingLIst[0]);
  }, [allPendingLIst]);
  useEffect(() => {
    getAllPageList();
  }, []);
  const getAllPageList = async () => {
    try {
      const response = await getAllPendingPageList();
      let imageIds = [];
      response.data.imageInput.forEach((item) => imageIds.push(item.id));
      console.log("ALL IMAGES", imageIds);
      setPendingFolderId(response.data.pendingFolderId);
      setPendingList(imageIds);
    } catch (e) {
      console.log(e.message);
    }
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
  const removeSavedImageId = () => {
    let allList = allPendingLIst;
    console.log("ALL IDS" ,allList,currentImage)
    let index = allPendingLIst.indexOf(currentImage) ;
    if(index>-1){
      allList.splice(index,1)
    }
    console.log(allList);
    setPendingList([...allList]);
  };
  return (
    <React.Fragment>
      {currentLookup && (
        <LoadLookup
          next={nextHandler}
          prev={prevHandler}
          data={currentLookup}
          currentImageId={currentImage}
          history={history}
          pendingFolderId={pendingFolderId}
          removeImageId={removeSavedImageId}
        ></LoadLookup>
      )}
    </React.Fragment>
  );
};
export default PendingPageData;
