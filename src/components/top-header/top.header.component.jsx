import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Input from "../boostrapinput/input.component";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { ReactComponent as FolderCreate } from "../../assets/folder.svg";
import { ReactComponent as Refresh } from "../../assets/referesh.svg";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as AddFriend } from "../../assets/add.svg";
import { ReactComponent as Share } from "../../assets/shareimage.svg";
import ShareFolderModal from "../modal/share-folder-modal";
import { Link } from "react-router-dom";
import SharedListModal from "../modal/show-shared-list-modal";
import { Post, Get } from "../../service/service.setup";
import "./top.header.style.scss";
const TopHeader = ({
  saveFolder,
  fillAllDataHandler,
  selectedItems,
  totalFolders,
  deleteHandler,
  searchItem,
  searchHandler,
}) => {
  const [show, setShow] = useState(false);
  const [fileName, addName] = useState("");
  const [fileTag, addFileTag] = useState("");
  const [fileDescription, addDisc] = useState("");
  const [id, setId] = useState("");
  const [folderId, setFolderId] = useState("");
  const [shareFolder, setShareFolder] = useState(false);
  const [isOpenPop, setSharedListPop] = useState(false);
  const [shareWithList, setShareWithList] = useState([]);
  async function getFolders(fileId) {
    try {
      const user = await Post("/getFileSharedList", {
        fileId,
      });
      if (
        user.data.code == "200" &&
        user.data.message == "Page is not shared with anyone."
      ) {
        alert(user.data.message);
      }
      setShareWithList(user.data.data.profile);
      console.log(user);

      setSharedListPop(true);
    } catch (error) {}
  }
  const showContactListModal = () => {
    let fileId = 0;
    for (let key in selectedItems) {
      if (selectedItems[key]) {
        fileId = key;
      }
    }
    getFolders(fileId);
  };
  const saveHandler = () => {
    if(!fileTag||!fileName){
      alert('Please Enter Required Field') ;
      return false ;
    }
    saveFolder(fileName, fileTag, fileDescription, id);
    addName("");
    addDisc("");
    setId("");
    setShow(false);
  };
  const topRowStyle = {
    background: "rgba(0, 0, 0, 0.125)",
  };
  let totalItem = 0;
  for (let key in selectedItems) {
    if (selectedItems[key]) totalItem++;
  }
  const reNameFolder = (isDelete) => {
    let deletedArr = [];
    let restArr = [];
    const deleted = 1;
    for (let key in selectedItems) {
      if (selectedItems[key]) {
        deletedArr.push({
          ...totalFolders.filter((item) => item.id == key)[0],
          deleted,
        });
      } else {
        restArr.push({ ...totalFolders.filter((item) => item.id == key)[0] });
      }
    }

    setId(deletedArr[0].id);
    addDisc(deletedArr[0].fileDescription);
    addName(deletedArr[0].fileName);
    addFileTag(deletedArr[0].fileTag);
    if (!isDelete) setShow(true);
    const requestFile = {
      filefolderRequest: deletedArr,
    };
    if (isDelete) deleteFolders(requestFile, restArr);
  };
  const deleteFolders = (requestFile, restArr) => {
    deleteHandler(requestFile, restArr);
  };
  return (
    <div className="row secondary-header single-header" style={topRowStyle}>
      <div className="col-md-12">
        <div className="row min-height">
          <div className="col-md-2  sec-header-item">
            <input
              placeholder="Search anything.."
              value={searchItem}
              onChange={searchHandler}
              onBlur={fillAllDataHandler}
              name="search"
              type="input"
              className="custom-input"
            ></input>
          </div>
          <div
            className={`  col-md-1  col-text-style ${
              totalItem == 0 ? "hideCount" : "sec-header-item"
            }`}
          >
            <Share onClick={() => setShareFolder(true)} />{" "}
            <ShareFolderModal
              selected={selectedItems}
              show={shareFolder}
              hide={setShareFolder}
            />
            <span className="on-hover" onClick={() => setShareFolder(true)}>
              Share
            </span>
          </div>
          <div
            className={`  col-md-1  col-text-style ${
              totalItem == 0 ? "hideCount" : "sec-header-item"
            }`}
          >
            <Delete onClick={() => reNameFolder(true)} />{" "}
            <span className="on-hover" onClick={() => reNameFolder(true)}>
              Delete
            </span>
          </div>
          <div
            className={`  col-md-1 col-text-style ${
              totalItem > 1 || totalItem == 0 ? "hideCount" : "sec-header-item"
            }`}
          >
            <Pencil onClick={() => reNameFolder(false)} />{" "}
            <span
              className="on-hover"
              onClick={() => showContactListModal(false)}
            >
              Edit
            </span>
          </div>
          <div
            className={`  col-md-2 col-text-style ${
              totalItem > 1 || totalItem == 0 ? "hideCount" : "sec-header-item"
            }`}
          >
            <button
              onClick={showContactListModal}
              className="btn btn-secondary"
            >
              Shared List
            </button>
            <SharedListModal
              hide={setSharedListPop}
              show={isOpenPop}
              folderId={folderId}
              list={shareWithList}
            ></SharedListModal>
          </div>
          <div className="col-md-2 sec-header-item col-text-style">
            <Refresh onClick={() => setShow(true)} />{" "}
            <span className="on-hover" onClick={() => setShow(true)}>
              Create Folder
            </span>
          </div>
          <div className="col-md-1 col-text-style sec-header-item">
            <FolderCreate onClick={() => window.location.reload()} />{" "}
            <span className="on-hover" onClick={() => window.location.reload()}>
              Refresh
            </span>
          </div>
          <div className="col-md-2  sec-header-item ">
            <div
              className={` col-text-style ${
                totalItem == 0 ? "hideCount" : "sec-header-item"
              }`}
            >
              <span className="count">{totalItem}</span> Selected{" "}
              <Cross onClick={() => window.location.reload()}></Cross>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)} animation={true}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <Input
            placeholder="Enter your folder"
            label="Folder"
            value={fileName}
            handleChange={(e) => addName(e.target.value)}
            name="folder"
            type="input"
          ></Input>
            <Input
            placeholder="Enter your File Tag"
            label="Tag"
            value={fileTag}
            handleChange={(e) => addFileTag(e.target.value)}
            name="folder"
            type="input"
          ></Input>
          <Input
            placeholder="Enter your description"
            label="Description"
            value={fileDescription}
            handleChange={(e) => addDisc(e.target.value)}
            name="dis"
            type="input"
          ></Input>
          <Input
            value={""}
            handleChange={() => setId(id)}
            name="id"
            type="hidden"
          ></Input>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-danger btn"
            variant="secondary"
            onClick={() => setShow(false)}
          >
            Close
          </button>
          <button
            className="btn btn-success"
            variant="primary"
            onClick={saveHandler}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default TopHeader;
