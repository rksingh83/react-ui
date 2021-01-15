import React, { useState, useEffect } from "react";
import { Post, Get } from "../../service/service.setup";
import { ListGroup } from "react-bootstrap";

import TopHeader from "../top-header/top.header.component";

import { setFolderFlag } from "../../redux/shared-folder/folder.actions";

import { connect } from "react-redux";
import {
  setAllBooks as setUserAllBooks,
  setCurrentBookId,
} from "../../redux/all-books/allBooks.actions";
// PENDING IMPORT
import PendingHeader from "../pending-data/header";
import LoadLookup from "../pending-data/display-page-lookup";
import CustomLoader from "../loader/loader";
import ShowMessages from "../common/display-message-modal";
import { getDate } from "../common/utility";
import { GetPageLimits } from "../../service/common";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentImageId } from "../../redux/file/pageId.action";
import SideBarBooks from "../SideBooks/SideBarBooks";
import {
  getAllPendingPageList,
  getPendingPageById,
} from "../../service/pendingData";
import UploadFile from "../login/uploadfile";
import RightSharedPeopleList from "../right-side-bar/RightSharedPeopleList";
import {
  getNotificationsIndex as getStartIndex,
  getNotificationCount as getPageCount,
  NOTIFICATION_OFF_SET as PAGE_OFF_SET,
} from "../common/pagination.config";
import DefaultSideBar from "./DefaultSideBar";

const SideBar = ({ match, history, sharedWithMe, setFolderFlag, location }) => {
  // RESPONSE MESSAGE POP
  // pull current user from  redux
  const currentUser = useSelector((state) => state.user.currentUser);
  const ROLE = currentUser && currentUser.authentication.role;
  const dispatch = useDispatch();
  const savedPageId = useSelector((state) => state.pageId.currentImage);

  const [totalFolder, setTotalFolder] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({});
  const [isPrimerUser, setIsPrimerUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSharedFolder, setIsSharedFolder] = useState(false);

  const [searchItem, setSearchHandler] = useState("");
  const [filteredFolder, setFilteredFolder] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState("");

  // pages
  const [paginateImages, setPaginateImages] = useState([]);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [images, setImages] = useState([]);
  const [currentFolderName, setCurrentFolderName] = useState("");
  const [searchImage, setSearchImage] = useState("");
  const [filteredImages, setFilteredImages] = useState("");
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
    isMyDigiNetworkPage: false,
  });
  // PENDING COMPONENT
  const [allPendingLIst, setPendingList] = useState([]);
  // const [allBooks, setAllBooks] = useState([]);
  const allBooks = useSelector((state) => state.userBooks.books);
  //const [currentFolderId, setCurrentFolderId] = useState(0);
  const currentFolderId = useSelector((state) => state.userBooks.currentBookId);

  const [currentImage, setCurrentImage] = useState("");
  const [currentLookup, setCurrentLookup] = useState(false);
  const [pendingFolderId, setPendingFolderId] = useState("");
  const [isShowLoader, setShowLoader] = useState(false);
  const [showPopUp, setShowPop] = useState(false);
  const [responseMgs, setResponseMgs] = useState("");
  const [userImageUploadLimits, setUserImageUploadLimits] = useState(0);

  const searchHandler = (e) => {
    setSearchHandler(e.target.value);
    setFilteredFolder(
      allBooks.filter((item) =>
        item.fileName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const getAllFolders = async (id = false) => {
    const requestFile = { filefolderRequest: [] };
    const { data } = await Post("/getMyAndSharedFiles", requestFile);

    // setAllBooks(data.filefolderRequest);
    if (id) {
      const currentBook = allBooks.find((item) => item.id == id);
      if (currentBook) {
        setIsSharedFolder(currentBook.sharedImageflg);
        dispatch(setCurrentBookId(id));
      }
    } else {
      if (data.filefolderRequest[0]) {
        dispatch(setUserAllBooks(data.filefolderRequest));
        setIsSharedFolder(data.filefolderRequest[0].sharedImageflg);
        // setCurrentFolderId(data.filefolderRequest[0].id);
        dispatch(setCurrentBookId(data.filefolderRequest[0].id));
      }
    }

    setShowLoader(false);
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
          getAllFolders();
          setShowLoader(false);
          return false;
        }
        getAllFolders();
        pushName(res.data.filefolderRequest[0]);
        setShowLoader(false);
      });
    }
  };

  useEffect(() => {
    getUserImageUploadLimits();
    if (ROLE == "labeller") setFolderFlag("PENDING");
  }, []);

  const pushName = (name) => {
    setTotalFolder([...totalFolder, name]);

    setIsLoading(false);
    setSelectedFolder({});
  };
  const reNameFolderHandler = (name, des, id) => {};
  const updateName = (file, isDeleted = false) => {
    setShowLoader(false);
    getAllFolders();
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
  useEffect(() => {
    if (!isSharedFolder) {
      getOwnImage();
    } else {
      getSharedWithMeImage();
    }
  }, [currentFolderId]);
  async function getSharedWithMeImage() {
    setShowLoader(true);
    try {
      const request = { fileId: currentFolderId, allPageAcess: true };
      const images = await Post("/getAllSharedFileImages", request);
      if (images.data.code == 201) {
        alert(images.data.error);
        history.push("/logout");
      }
      setImages(images.data.imageInput);
      const temp = [...images.data.imageInput];
      setPaginateImages(temp.splice(0, PAGE_OFF_SET));

      setCurrentFolderName(images.data.fileName);
      setIsLoading(false);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
    }
  }
  async function getOwnImage() {
    setShowLoader(true);
    try {
      setIsLoading(true);
      const requestFile = { id: currentFolderId };
      const images = await Post("/getAllFileImages", requestFile);

      if (images.data.code == 201) {
        alert(images.data.error);
        history.push("/logout");
      }
      setImages(images.data.imageInput);
      const temp = [...images.data.imageInput];
      setPaginateImages(temp.splice(0, PAGE_OFF_SET));

      setCurrentFolderName(images.data.fileName);
      setIsLoading(false);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
    }
  }

  const paginate = (number) => {
    const allImages = [...images];
    setPaginateImages(allImages.splice(getStartIndex(number), PAGE_OFF_SET));
    setCurrentPagination(number);
  };

  const groupNextPrev = (type) => {
    if (type === "NEXT") {
      if (currentPagination == getPageCount(images)) return;
      paginate(currentPagination + 1);
    } else {
      if (currentPagination == 1) return;
      paginate(currentPagination - 1);
    }
  };
  const searchImageHandler = (e) => {
    setSearchImage(e.target.value);
    setFilteredImages(
      images.filter((item) => {
        if (item.title) {
          return item.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      })
    );
  };

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

    const { name, value } = e.target ? e.target : { name: "shareId", ...e };
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
        isMyDigiNetworkPage:
          lookupPageState.isMyDigiNetworkPage == 1 ? true : false,
        saveWithoutNotification: saveWithoutNotificationValue,
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

  useEffect(() => {
    const reDirectedId = location.search.split("=")[1];
    if (ROLE != "labeller") getAllFolders(reDirectedId);
  }, []);
  const setcurrentFolderId = (id, flagValue) => {
    setIsSharedFolder(flagValue);
    // setCurrentFolderId(id);

    dispatch(setCurrentBookId(id));
    if (flagValue) {
      setFolderFlag("SHARED");
    } else {
      setFolderFlag("HOME");
    }
  };
  const setDefaultFolderId = () => {
    setFolderFlag("PENDING");
    // setCurrentFolderId(pendingFolderId);
    dispatch(setCurrentBookId(pendingFolderId));
    setIsSharedFolder(false);
  };

  return (
    <React.Fragment>
      <ShowMessages
        hide={() => setShowPop(false)}
        message={responseMgs}
        show={showPopUp}
      />
      {sharedWithMe !== "PENDING" && (
        <TopHeader
          totalFolders={allBooks}
          selectedItems={selectedFolder}
          searchItem={searchItem}
          searchImage={searchImage}
          searchImageHandler={searchImageHandler}
          searchHandler={searchHandler}
          deleteHandler={deleteHandler}
          saveFolder={saveFolder}
          uploadLimits={userImageUploadLimits}
          bookId={currentFolderId}
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
        <div className="col-md-3 custom-pad-li d-none d-sm-block p-1">
          <SideBarBooks
            setCurrentFolderId={setcurrentFolderId}
            searchItem={searchItem}
            allBooks={allBooks}
            filteredBooks={filteredFolder}
            bookId={currentFolderId}
          />

          <DefaultSideBar setDefaultFolderId={setDefaultFolderId} />
        </div>
        <div className={ROLE != "labeller" ? "col-md-6" : "col-md-9"}>
          <div className="row">
            {isShowLoader && <CustomLoader />}
            {currentFolderId > 0 && sharedWithMe != "PENDING" && (
              <UploadFile
                isSharedFolder={isSharedFolder}
                dirId={currentFolderId}
                history={history}
                images={images}
                filteredImages={filteredImages}
                searchImage={searchImage}
                paginateImages={paginateImages}
                groupNextPrev={groupNextPrev}
                paginate={paginate}
                currentPagination={currentPagination}
              />
            )}

            {sharedWithMe === "PENDING" && currentLookup && (
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
        {ROLE != "labeller" && (
          <div className="col-md-3 bg-sideBar">
            <RightSharedPeopleList
              isSharedFolder={isSharedFolder}
              bookId={currentFolderId}
              pageId={sharedWithMe === "PENDING" ? currentImage : null}
            />
          </div>
        )}
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
