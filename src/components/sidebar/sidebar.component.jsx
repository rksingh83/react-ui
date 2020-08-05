import React, { useState, useEffect } from "react";
import ModalPop from "../modal/modal.component";
import { Post, Get } from "../../service/service.setup";
import LeftSideBar from "./left.sidebar.compoent";
import FolderDisplay from "../create-folder/folder-dispaly";
import TopHeader from "../top-header/top.header.component";
import DisplayImageDescription from "../display-discription/display-discription";
import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
import { connect } from "react-redux";
import SharedHeader from "../top-header/shared-header";
const SideBar = ({ history, sharedWithMe, setFolderFlag }) => {
  const totalEle = ["My Files", "Share With Me"];
  const [totalFolder, setTotalFolder] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({});
  const [finalCount, setFinalCount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [LiElement, setLiEl] = useState(totalEle);
  const currentIndex = sharedWithMe == "SHARED" ? 1 : 0;
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
        item.fileName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const saveFolder = (fileName, fileDescription, id) => {
    setIsLoading(true);
    const dateCreated = "123";
    const requestFile = {
      filefolderRequest: [{ fileName, fileDescription, dateCreated, id }],
    };

    if (id) {
      Post("/updateFileFolder", requestFile).then((res) =>
        updateName(res.data.filefolderRequest[0])
      );
    } else {
      Post("/createFileFolder", requestFile).then((res) =>
        pushName(res.data.filefolderRequest[0])
      );
    }
  };
  const handleActive = (e) => {
    setActiveIndex(LiElement.indexOf(e));
    console.log(e);
    if (LiElement.indexOf(e) == 0) {
      setFolderFlag("HOME");
    } else {
      setFolderFlag("SHARED");
    }
    // setSharedWithMe(!sharedWithMe);
    setLiEl(totalEle);
  };

  useEffect(() => {
    const requestFile = { filefolderRequest: [] };
    Post("/getAllFiles", requestFile).then((res) => {
      if (res.data.code == 201) {
        alert(res.data.error);
        history.push("/logout");
      }
      if (res.data.filefolderRequest) {
        setTotalFolder(res.data.filefolderRequest);
      }
      getSharedWithMeFolder();
    });
  }, []);

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
      console.log(folders.data.filefolderRequest);
      setSharedWithMeFolder(folders.data.filefolderRequest);
    } catch (error) {}
  }
  return (
    <React.Fragment>
      {sharedWithMe == "HOME" && (
        <TopHeader
          totalFolders={totalFolder}
          selectedItems={selectedFolder}
          searchItem={searchItem}
          searchHandler={searchHandler}
          deleteHandler={deleteHandler}
          saveFolder={saveFolder}
        />
      )}
      {sharedWithMe == "SHARED" && (
        <SharedHeader
          totalFolders={totalFolder}
          selectedItems={selectedFolder}
          searchItem={sharedSearchItem}
          searchHandler={sharedSearchHandler}
          back={true}
        />
      )}
      <div className="row">
        <div className="col-md-2 custom-pad-li d-none d-sm-block">
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
        <div className="col-md-10">
          <div className="row">
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
              />
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
