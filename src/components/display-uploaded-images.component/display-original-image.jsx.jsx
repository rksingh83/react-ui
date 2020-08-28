import React, { useEffect, useState } from "react";
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from "../create-folder/create.btn.component";
import GetLoader from "../../ui/loder";
import { Post, Get } from "../../service/service.setup";
import "./create-image.style.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import ImageSlider from "./image.slider";
import { ToastContainer, toast } from "react-toastify";
import TopSingleHeader from "../top-header/new.header";
import LoadLookup from "../pending-data/display-page-lookup";
import { connect } from "react-redux";
import SharedHeader from "../top-header/shared-header";
import { getPendingPageById } from "../../service/pendingData";
import LeftSideBar from "../sidebar/left.sidebar.compoent";
import { Link } from "react-router-dom";
import CustomLoader from "../loader/loader";
const DisplayOriginalImage = ({ match, history, sharedWithMe }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState(match.params.id);

  const [allImages, setAllImages] = useState([]);
  const [currentFolderName, setCurrentFolderName] = useState("");
  const [currentLookup, setCurrentLookup] = useState(false);
  const [isShowLoader, setShowLoader] = useState(false);
  const [allPendingLIst, setAllPendingList] = useState([]);
  const [lookupPageState, setLookupPageState] = useState({
    fileId: 0,
    shareId: 0,
    title: "",
    description: "",
    date: "",
    pendingFolderId: 0,
    imageId: 0,
    pageNumber: 0,
    id: 0,
    segmentation: "",
  });
  const totalEle = ["My Books", "Shared Books", "Pending"];
  const [LiElement, setLiEl] = useState(totalEle);
  const currentIndex = sharedWithMe == "SHARED" ? 1 : 0;
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const handleActive = (e) => {
    setActiveIndex(LiElement.indexOf(e));
    if (LiElement.indexOf(e) == 0) {
      //setFolderFlag("HOME");
    } else {
      //  setFolderFlag("SHARED");
    }
    // setSharedWithMe(!sharedWithMe);
    setLiEl(totalEle);
  };
  const sideBarStyle = {
    border: "1px solid rgba(0, 0, 0, 0.125)",
    height: "90vh",
  };
  const nextHandler = () => {
    let index = allPendingLIst.indexOf(imageId);
    console.log(allPendingLIst, index);
    if (index == allPendingLIst.length - 1) {
      alert("This is Last File");
      return;
    }
    setImageId(allPendingLIst[index + 1]);
  };
  const prevHandler = () => {
    console.log(allPendingLIst);
    let index = allPendingLIst.indexOf(imageId);
    if (index == 0) {
      alert("This is Last File");
      return;
    }
    console.log(imageId); 
    setImageId(allPendingLIst[index - 1]);
  };

  useEffect(() => {
    // getCurrentPage();
    const IMAGE_ORIGINAL_URL =
      sharedWithMe == "HOME" ? "getAnyCloudImages" : "getAnySharedCloudImages";
    const requestFile = { ids: [match.params.id], imagetype: "_align.jpg" };

    Post(`/${IMAGE_ORIGINAL_URL}`, requestFile).then((res) => {
      if (res.data.code == 201) {
        alert(res.data.error);
        history.push("/logout");
      }
      //  console.log((res.data.imageInput[0].align_image_org))
      setImageUrl(res.data.imageInput[0].raw_image_org);
    });
    const requestImages = { id: match.params.folderId };
    const sharedRequest = { fileId: match.params.folderId, allPageAcess: true };
    const allImagesRequest =
      sharedWithMe == "HOME" ? requestImages : sharedRequest;
    const IMAGE_URL =
      sharedWithMe == "HOME" ? "getAllFileImages" : "getAllSharedFileImages";

    Post(`/${IMAGE_URL}`, allImagesRequest).then((res) => {
      if (res.data.code == 201) {
        alert(res.data.error);
        history.push("/logout");
      }
      const allCloud = [];
      setCurrentFolderName(res.data.fileName);
      res.data.imageInput.forEach((image) => allCloud.push(image.id));
      setAllPendingList(allCloud);
      const IMAGE_SMALL_URL =
        sharedWithMe == "HOME"
          ? "getAnyCloudImages"
          : "getAnySharedCloudImages";

      Post(`/${IMAGE_SMALL_URL}`, {
        ids: allCloud,
        imagetype: "_align_small.jpg",
      }).then((res) => {
        if (res.data.code == 201) {
          alert(res.data.error);
          history.push("/logout");
        }
        setAllImages(res.data.imageInput);
        
      });
    });
  }, []);
  useEffect(() => {
    if (sharedWithMe == "HOME") getCurrentPage();
  }, [imageId]);
  // page lookup
  const getCurrentPage = async () => {
    const response = await getPendingPageById(imageId);
    setCurrentLookup(response.data && response.data);
    // setLookupPageState(response.data && response.data.pageLookup);
    if (response) setLookupPageState(response.data.pageLookup);
  };
  // handle input
  const pageLookUpHandler = (e) => {
    const currentState = { ...lookupPageState };

    const { name, value } = e.target;
    if (name == "fileId" || name == "tag") {
      let folder = currentState.file.filter((item) => item.id == value);
      let tag = folder.length > 0 ? folder[0].fileTag : "";
      if (!tag) tag = "";
      currentState["fileId"] = value;
      currentState["tag"] = value;
    } else {
      currentState[name] = value;
    }
    setLookupPageState(currentState);
  };

  const styleImage = {
    width: "80vh",
    height: "80vh",
  };
  const crossStyle = {
    position: "absolute",
    width: "4rem",
    height: "2rem",
    top: "5rem",
    right: "3rem",
  };
  const saveUpdateData = async () => {
    setShowLoader(true);
    try {
      const response = await Post("/savePageLookup", lookupPageState);
      console.log();
      if (response.data.code == "200") {
        alert("Saved Successfully");
        // if (response.data.isFileMoved) removeSavedImageId();
      }
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
    }
  };
  return (
    <>
      {sharedWithMe == "HOME" && (
        <TopSingleHeader
          imageId={imageId}
          images={allImages}
          history={history}
          currentFolder={currentFolderName}
          folderId={match.params.folderId}
          next={nextHandler}
          prev={prevHandler}
          pageSaveHandler={saveUpdateData}
        />
      )}

      {sharedWithMe == "SHARED" && <SharedHeader history={history} />}
      <div className="row">
        {isShowLoader && <CustomLoader />}
        <div className=" custom-pad-li  col-md-2 p-0">
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
        <div className="col-md-10">
          {currentLookup && sharedWithMe == "HOME" && (
            <LoadLookup
              data={currentLookup}
              currentImageId={imageId}
              history={history}
              pendingFolderId={1}
              pageData={lookupPageState}
              pageLookUpHandler={pageLookUpHandler}
            ></LoadLookup>
          )}

          {sharedWithMe == "SHARED" && (
            <ImageSlider
              current={match.params.id}
              history={history}
              setImageId={setImageId}
              images={allImages}
            ></ImageSlider>
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToPros = ({ sharedWithMe: { sharedWithMe } }) => ({
  sharedWithMe,
});
export default connect(mapStateToPros)(DisplayOriginalImage);
//export default DisplayOriginalImage ;
