import React, { useState, useEffect } from "react";
import { Post, Get } from "../../service/service.setup";
import LeftSideBar from "./left.sidebar.compoent";
import FolderDisplay from "../create-folder/folder-dispaly";
import TopHeader from "../top-header/top.header.component";
import DisplayImageDescription from "../display-discription/display-discription";
import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
import PendingPageData from "../pending-data/pending-list";
import { connect } from "react-redux";
import SharedHeader from "../top-header/shared-header";
// PENDING IMPORT
import PendingHeader from "../pending-data/header";
import LoadLookup from "../pending-data/display-page-lookup";
import CustomLoader from "../loader/loader";
import ShowMessages from "../common/display-message-modal";
import { getDate } from "../common/utility";
import { GetPageLimits } from "../../service/common";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentImageId } from "../../redux/file/pageId.action";
import {
  getAllPendingPageList,
  getPendingPageById,
} from "../../service/pendingData";

const SideBar = ({ match, history, sharedWithMe, setFolderFlag }) => {
  // RESPONSE MESSAGE POP
  // pull current user from  redux
  const currentUser = useSelector((state) => state.user.currentUser);
  const ROLE = currentUser && currentUser.authentication.role;
  const dispatch = useDispatch();
  const savedPageId = useSelector((state) => state.pageId.currentImage);
  const totalEle =
    ROLE != "labeller"
      ? ["My Books", "Shared Books", "Default Page"]
      : ["All Pages"];
  const TextMAp =
    ROLE != "labeller" ? { HOME: 0, SHARED: 1, PENDING: 2 } : { PENDING: 0 };
  const [totalFolder, setTotalFolder] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({});
  const [finalCount, setFinalCount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [LiElement, setLiEl] = useState(totalEle);
  const currentIndex = ROLE != "labeller" ? TextMAp[sharedWithMe] : 0;
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [selectedItemsCount, setSelectedItemsCount] = useState(null);
  const [searchItem, setSearchHandler] = useState("");
  const [filteredFolder, setFilteredFolder] = useState("");
  const [description, setDescription] = useState("");
  const [iSDisplayDiv, setIsDisplayDiv] = useState(false);
  const [date, setDate] = useState("");
  // const [sharedWithMe, setSharedWithMe] = useState(true);
  const [sharedWithMeFolder, setSharedWithMeFolder] = useState([]);
  const [sharedSearchItem, setSharedSearchHandler] = useState("");
  const [sharedFilteredFolder, setSharedFilteredFolder] = useState("");
  const [sharedFileSearchInput, setSharedFileSearch] = useState("");
  const [isPrimerUser, setIsPrimerUser] = useState("");
  const [lookupPageState, setLookupPageState] = useState({
    fileId: 0,
    shareId: 0,
    title: "",
    description: "",
    date: new Date(),
    pendingFolderId: 0,
    imageId: 0,
    pageNumber: 0,
    id: 0,
    segmentation: "",
    admin_updated: false,
    isMyDigiNetworkPage:false
  });
  // PENDING COMPONENT
  const [allPendingLIst, setPendingList] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [currentLookup, setCurrentLookup] = useState(false);
  const [pendingFolderId, setPendingFolderId] = useState("");
  const [isShowLoader, setShowLoader] = useState(false);
  const [showPopUp, setShowPop] = useState(false);
  const [responseMgs, setResponseMgs] = useState("");
  const [userImageUploadLimits, setUserImageUploadLimits] = useState(0);

  const sideBarStyle = {
    border: "1px solid rgba(0, 0, 0, 0.125)",
    height: "90vh",
  };
  const searchHandler = (e) => {
    setSearchHandler(e.target.value);
    setFilteredFolder(
      totalFolder.filter((item) =>
        item.fileName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  //
  const sharedSearchHandler = (e) => {
    setSharedSearchHandler(e.target.value);
    setSharedFilteredFolder(
      sharedWithMeFolder.filter((item) =>
        item.owner.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  // shared File Search Handler
  const sharedFileSearchHandler = (e) => {
    let searchOn =
      sharedFilteredFolder.length == 0
        ? sharedWithMeFolder
        : sharedFilteredFolder;
    setSharedFileSearch(e.target.value);
    setSharedFilteredFolder(
      searchOn.filter((item) =>
        item.fileName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const saveFolder = (fileName, fileTag, fileDescription, id) => {
    setShowLoader(true);
    const dateCreated = "123";
    const requestFile = {
      filefolderRequest: [
        { file_tag: fileTag, fileName, fileDescription, dateCreated, id },
      ],
    };

    if (id) {
      Post("/updateFileFolder", requestFile).then((res) =>
        updateName(res.data.filefolderRequest[0])
      );
    } else {
      Post("/createFileFolder", requestFile).then((res) => {
        if (res.data.code == "213") {
          setResponseMgs(res.data.message);
          setShowPop(true);
          setShowLoader(false);
          return false;
        }
        pushName(res.data.filefolderRequest[0]);
        setShowLoader(false);
      });
    }
  };
  const handleActive = (e) => {
    if (ROLE == "labeller") {
      return true;
    }
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
    getOwnFile();
    getSharedWithMeFolder();
    getUserImageUploadLimits();
    if (ROLE == "labeller") setFolderFlag("PENDING");
  }, []);
  const getOwnFile = () => {
    const requestFile = { filefolderRequest: [] };
    Post("/getAllFiles", requestFile).then((res) => {
      if (res.data.code == 201) {
        // alert(res.data.error);
        setResponseMgs(res.data.error);
        setShowPop(true);
        history.push("/logout");
      }
      if (res.data.filefolderRequest) {
        setTotalFolder(res.data.filefolderRequest);
      }
    });
    setShowLoader(false);
  };
  const pushName = (name) => {
    setTotalFolder([...totalFolder, name]);

    setIsLoading(false);
    setSelectedFolder({});
  };
  const reNameFolderHandler = (name, des, id) => {};
  const updateName = (file, isDeleted = false) => {
    let updated = [];
    if (isDeleted) {
      let deletedIds = file.filefolderRequest.map((item) => item.id);
      updated = totalFolder.filter((item) => !deletedIds.includes(item.id));
    } else {
      updated = totalFolder.map((item) => {
        if (file.id == item.id) {
          item.fileDescription = file.fileDescription;
          item.fileName = file.fileName;
        }
        setShowLoader(false);
        window.location.reload();
        return item;
      });
    }
    setTotalFolder(updated);
    setIsLoading(false);
    setSelectedFolder({});
  };
  const selectedFolderCountHandler = (id, value) => {
    let tempObj = {};
    tempObj[id] = value;
    setSelectedFolder({ ...selectedFolder, ...tempObj });
  };
  const deleteHandler = (folderList, resArr) => {
    Post("/updateFileFolder", folderList).then((res) =>
      updateName(folderList, true)
    );
  };
  const ToggleDescription = (description, date) => {
    setIsDisplayDiv(true);
    setDescription(description);
    setDate(date);
  };
  const hideDescriptionHandler = (flag) => {
    setIsDisplayDiv(flag);
  };
  async function getSharedWithMeFolder() {
    try {
      const folders = await Get("getAllSharedFiles");
      setSharedWithMeFolder(folders.data.filefolderRequest);
      setShowLoader(false);
    } catch (error) {}
  }
  // pending
  useEffect(() => {
    getCurrentPage();
  }, [currentImage]);
  useEffect(() => {
    const id = match.params.pageId;
    setCurrentImage(id ? id : savedPageId ? savedPageId : allPendingLIst[0]);
  }, [allPendingLIst]);
  useEffect(() => {
    getAllPageList();
  }, []);
  const getAllPageList = async () => {
    try {
      const response = await getAllPendingPageList(ROLE);
      let imageIds = [];
      response.data.imageInput.forEach((item) => imageIds.push(item.id));
      setPendingFolderId(response.data.pendingFolderId);
      setPendingList(imageIds);
    } catch (e) {}
  };
  const getCurrentPage = async () => {
    setShowLoader(true);
    const response = await getPendingPageById(currentImage);
    if (!response) {
      nextHandler();
      return false;
    }
    setCurrentLookup(response.data && response.data);
    // setLookupPageState(response.data && response.data.pageLookup);
    if (response) {
      setLookupPageState(removeNull(response.data.pageLookup));
      if (
        response.data.user_membership == 1 ||
        response.data.user_membership == 2
      ) {
        setIsPrimerUser(1);
      } else {
        setIsPrimerUser(0);
      }
      removeNull(response.data.pageLookup);
    }
    setShowLoader(false);
  };
  const nextHandler = () => {
    let index = allPendingLIst.indexOf(currentImage);
    if (index == allPendingLIst.length - 1) {
      // alert("This is Last File");
      allPendingLIst.length > 0 && setResponseMgs("This is last file");
      allPendingLIst.length > 0 && setShowPop(true);

      return;
    }
    console.log("INDEX IS", index, currentImage, allPendingLIst);
    setCurrentImage(allPendingLIst[index + 1]);
  };
  const prevHandler = () => {
    let index = allPendingLIst.indexOf(currentImage);
    if (index == 0) {
      setResponseMgs("This is first file");
      setShowPop(true);
      return;
    }
    setCurrentImage(allPendingLIst[index - 1]);
  };
  const removeSavedImageId = () => {
    let allList = allPendingLIst;

    let index = allPendingLIst.indexOf(currentImage);
    if (index > -1) {
      allList.splice(index, 1);
    }
    // nextHandler();
    console.log("REMOVING IMG ID");
    setPendingList([...allList]);
  };
  // set lookup form state
  const pageLookUpHandler = (e) => {
    const currentState = { ...lookupPageState };
     
    const { name, value } = e.target?e.target:{name:"shareId", ...e};
    console.log(value);
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
  const pageLookUpDateHandler = (e) => {
    const currentState = { ...lookupPageState };
    currentState.date = e;
    setLookupPageState(currentState);
  };
  const clearSavedImageId = () => {
    dispatch(setCurrentImageId(""));
  };
  const saveUpdateData = async (saveWithoutNotificationValue = false) => {
    setShowLoader(true);
    try {
      const request = {
        ...lookupPageState,
        admin_updated: lookupPageState.admin_updated == 1 ? true : false,
        isMyDigiNetworkPage: lookupPageState.isMyDigiNetworkPage == 1 ? true : false,
        saveWithoutNotification:saveWithoutNotificationValue
      };
      const response = await Post("/savePageLookup", request);
      if (response.data.code == "200") {
        setResponseMgs("Saved Successfully");
        setShowPop(true);
        clearSavedImageId();
        dispatch(setCurrentImageId(""));
        if (ROLE == "labeller") {
          nextHandler();
          //   removeSavedImageId();
          setShowLoader(false);
          return true;
        }
        if (response.data.isFileMoved) removeSavedImageId();
      }
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
      dispatch(setCurrentImageId(""));
    }
  };
  const pendingImgDeleteHandler = async () => {
    if (!window.confirm("Are you sure you want to delete ?")) return;
    setShowLoader(true);
    const requestPayload = {
      imageInput: [
        {
          id: currentImage,
          fileId: pendingFolderId,
          delete: 1,
        },
      ],
    };
    // updateToServer(requestPayload);
    try {
      let res = await Post("/updateImage", requestPayload);
      if (res.data.code == 200) {
        setResponseMgs(res.data.message);
        setShowPop(true);
      }
      // window.location.reload();
      removeSavedImageId();
      setShowLoader(false);
    } catch (err) {
      setShowLoader(false);
    }
  };
  // get users upload limits
  const getUserImageUploadLimits = async () => {
    const res = await GetPageLimits();
    setUserImageUploadLimits(res.data.pagesLeft);
  };
  // handle null values in input
  const removeNull = (data) => {
    const tempData = { ...data };
    for (let attr in data) {
      if (tempData[attr] == null && attr != "userList") {
        tempData[attr] = "";
      }
    }
    if (tempData.date == "") tempData.date = new Date();
    return tempData;
  };
  const redirectAndSaveId = (url, pageId) => {
    dispatch(setCurrentImageId(pageId));
    history.push(url);
  };
  return (
    <React.Fragment>
      <ShowMessages
        hide={() => setShowPop(false)}
        message={responseMgs}
        show={showPopUp}
      />
      {sharedWithMe == "HOME" && (
        <TopHeader
          totalFolders={totalFolder}
          selectedItems={selectedFolder}
          searchItem={searchItem}
          searchHandler={searchHandler}
          deleteHandler={deleteHandler}
          saveFolder={saveFolder}
          uploadLimits={userImageUploadLimits}
        />
      )}
      {sharedWithMe == "SHARED" && (
        <SharedHeader
          totalFolders={totalFolder}
          selectedItems={selectedFolder}
          searchItem={sharedSearchItem}
          searchHandler={sharedSearchHandler}
          setSharedFileSearchHandler={sharedFileSearchHandler}
          sharedFileSearchInput={sharedFileSearchInput}
          back={true}
        />
      )}
      {sharedWithMe == "PENDING" && (
        <PendingHeader
          currentImageId={currentImage}
          pendingFolderId={pendingFolderId}
          next={nextHandler}
          prev={prevHandler}
          all={allPendingLIst}
          saveHandler={saveUpdateData}
          toggleLoader={setShowLoader}
          setShowPop={setShowPop}
          resMgs={setResponseMgs}
          deleteImg={pendingImgDeleteHandler}
          history={history}
          role={ROLE}
          redirectAndSaveId={redirectAndSaveId}
        />
      )}

      <div className="row">
        <div className="col-md-3 custom-pad-li d-none d-sm-block">
          <ul className="list-group ul-pad" style={sideBarStyle}>
            {LiElement.map((item, index) => (
              <LeftSideBar
                item={item}
                key={index}
                isActive={activeIndex == index ? true : false}
                changeActive={handleActive}
              />
            ))}
            <DisplayImageDescription
              isShowNumber={false}
              date={date}
              iSDisplayDiv={iSDisplayDiv}
              imageDescription={description}
            />
          </ul>
        </div>
        <div className="col-md-9">
          <div className="row">
            {isShowLoader && <CustomLoader />}
            {sharedWithMe == "HOME" && (
              <FolderDisplay
                isLoading={isLoading}
                selectedFolderCount={selectedFolderCountHandler}
                reNameFolder={reNameFolderHandler}
                displayValue={false}
                folders={totalFolder}
                searchItem={searchItem}
                history={history}
                ToggleDescription={ToggleDescription}
                onLeave={hideDescriptionHandler}
                filteredFolder={filteredFolder}
              />
            )}
            {sharedWithMe == "SHARED" && (
              <FolderDisplay
                isLoading={isLoading}
                selectedFolderCount={selectedFolderCountHandler}
                reNameFolder={reNameFolderHandler}
                displayValue={false}
                folders={sharedWithMeFolder}
                searchItem={sharedSearchItem}
                history={history}
                ToggleDescription={ToggleDescription}
                onLeave={hideDescriptionHandler}
                filteredFolder={sharedFilteredFolder}
                isShare={true}
                sharedFileSearchInput={sharedFileSearchInput}
              />
            )}
            {sharedWithMe == "PENDING" && currentLookup && (
              <LoadLookup
                data={currentLookup}
                currentImageId={currentImage}
                history={history}
                pendingFolderId={pendingFolderId}
                removeImageId={removeSavedImageId}
                pageData={lookupPageState}
                isMemberShip={isPrimerUser}
                pageLookUpHandler={pageLookUpHandler}
                isRedirectLast={true}
                pageLookUpDateHandler={pageLookUpDateHandler}
                role={ROLE}
                redirectAndSaveId={redirectAndSaveId}
                clearSavedImageId={clearSavedImageId}
                startLoader={setShowLoader}
                setResponseMgs={setResponseMgs}
                setShowPop={setShowPop}
              ></LoadLookup>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setFolderFlag: (flag) => dispatch(setFolderFlag(flag)),
});

const mapStateToPros = ({ sharedWithMe: { sharedWithMe } }) => ({
  sharedWithMe,
});
export default connect(mapStateToPros, mapDispatchToProps)(SideBar);

//export default SideBar;
