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
const DisplayOriginalImage = ({ match, history, sharedWithMe }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState(match.params.id);

  const [allImages, setAllImages] = useState([]);
  const [currentFolderName, setCurrentFolderName] = useState("");
  const [currentLookup, setCurrentLookup] = useState(false);
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
  console.log(allImages);
  useEffect(() => {
    getCurrentPage();
    // const IMAGE_ORIGINAL_URL =
    //   sharedWithMe == "HOME" ? "getAnyCloudImages" : "getAnySharedCloudImages";
    // const requestFile = { ids: [match.params.id], imagetype: "_align.jpg" };

    // Post(`/${IMAGE_ORIGINAL_URL}`, requestFile).then((res) => {
    //   if (res.data.code == 201) {
    //     alert(res.data.error);
    //     history.push("/logout");
    //   }
    //   //  console.log((res.data.imageInput[0].align_image_org))
    //   setImageUrl(res.data.imageInput[0].raw_image_org);
    // });
    // const requestImages = { id: match.params.folderId };
    // const sharedRequest = { fileId: match.params.folderId, allPageAcess: true };
    // const allImagesRequest =
    //   sharedWithMe == "HOME" ? requestImages : sharedRequest;
    // const IMAGE_URL =
    //   sharedWithMe == "HOME" ? "getAllFileImages" : "getAllSharedFileImages";

    // Post(`/${IMAGE_URL}`, allImagesRequest).then((res) => {
    //   if (res.data.code == 201) {
    //     alert(res.data.error);
    //     history.push("/logout");
    //   }
    //   const allCloud = [];
    //   setCurrentFolderName(res.data.fileName);
    //   res.data.imageInput.forEach((image) => allCloud.push(image.id));
    //   const IMAGE_SMALL_URL =
    //     sharedWithMe == "HOME"
    //       ? "getAnyCloudImages"
    //       : "getAnySharedCloudImages";

    //   Post(`/${IMAGE_SMALL_URL}`, {
    //     ids: allCloud,
    //     imagetype: "_align_small.jpg",
    //   }).then((res) => {
    //     if (res.data.code == 201) {
    //       alert(res.data.error);
    //       history.push("/logout");
    //     }
    //     setAllImages(res.data.imageInput);
    //   });
    // });
  }, []);
  const getCurrentPage = async () => {
    const response = await getPendingPageById(match.params.id);
    setCurrentLookup(response.data && response.data);
    // setLookupPageState(response.data && response.data.pageLookup);
    if (response) setLookupPageState(response.data.pageLookup);
  };
  const pageLookUpHandler = (e) => {
    const currentState = { ...lookupPageState };
    console.log(currentState);
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
    console.log(name, value);

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

  return (
    <>
      {sharedWithMe == "HOME" && (
        <TopSingleHeader
          imageId={imageId}
          images={allImages}
          history={history}
          currentFolder={currentFolderName}
          folderId={match.params.folderId}
        />
      )}

      {sharedWithMe == "SHARED" && <SharedHeader history={history} />}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* <ImageSlider
          current={match.params.id}
          history={history}
          setImageId={setImageId}
          images={allImages}
        ></ImageSlider> */}
        {currentLookup && (
          <LoadLookup
            data={currentLookup}
            currentImageId={imageId}
            history={history}
            pendingFolderId={1}
            pageData={lookupPageState}
            pageLookUpHandler={pageLookUpHandler}
          ></LoadLookup>
        )}
      </div>
    </>
  );
};
const mapStateToPros = ({ sharedWithMe: { sharedWithMe } }) => ({
  sharedWithMe,
});
export default connect(mapStateToPros)(DisplayOriginalImage);
//export default DisplayOriginalImage ;
