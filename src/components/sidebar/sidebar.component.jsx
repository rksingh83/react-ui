import React, { useState, useEffect } from "react";
import ModalPop from "../modal/modal.component";
import { Post, Get } from "../../service/service.setup";
import LeftSideBar from "./left.sidebar.compoent";
import FolderDisplay from "../create-folder/folder-dispaly";
import TopHeader from "../top-header/top.header.component";
import DisplayImageDescription from "../display-discription/display-discription";
const SideBar = ({ history }) => {
  const totalEle = ["Home"];
  const [totalFolder, setTotalFolder] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({});
  const [finalCount, setFinalCount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [LiElement, setLiEl] = useState(totalEle);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItemsCount, setSelectedItemsCount] = useState(null);
  const [searchItem, setSearchHandler] = useState("");
  const [filteredFolder, setFilteredFolder] = useState("");
  const [description, setDescription] = useState("");
  const [iSDisplayDiv, setIsDisplayDiv] = useState(false);
  const [date, setDate] = useState("");
  const sideBarStyle = {
    border: "1px solid rgba(0, 0, 0, 0.125)",
    height: "90vh",
  };
  const searchHandler = (e) => {
    setSearchHandler(e.target.value);
    setFilteredFolder(
      totalFolder.filter((item) =>
        item.fileName.toLowerCase().startsWith(e.target.value.toLowerCase())
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
    setLiEl(totalEle);
  };

  useEffect(() => {
    const requestFile = { filefolderRequest: [] };
    Post("/getAllFiles", requestFile).then((res) => {
      if (res.data.filefolderRequest) {
        setTotalFolder(res.data.filefolderRequest);
      }
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
  return (
    <React.Fragment>
      <TopHeader
        totalFolders={totalFolder}
        selectedItems={selectedFolder}
        searchItem={searchItem}
        searchHandler={searchHandler}
        deleteHandler={deleteHandler}
        saveFolder={saveFolder}
      />
      <div className="row">
        <div className="col-md-2">
          <ul className="list-group" style={sideBarStyle}>
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
        </div>
      </div>
    </React.Fragment>
  );
};
export default SideBar;
