import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Input from "../boostrapinput/input.component";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { ReactComponent as FolderCreate } from "../../assets/trade.svg";
import { ReactComponent as Refresh } from "../../assets/icon.svg";
import { ReactComponent as Cross } from "../../assets/cross.svg";

import { ReactComponent as Share } from "../../assets/teaching.svg";
import UploadForm from "../upload-image/upload-images";
import ShareFolderModal from "../modal/share-folder-modal";
import CustomLoader from "../loader/loader";
import ShowMessages from "../common/display-message-modal";
import { Post, Get } from "../../service/service.setup";
import "./top.header.style.scss";
import { Save, CancelButton, EditBtn } from "../common/pNGButtons";
const TopHeader = ({
  saveFolder,
  fillAllDataHandler,
  selectedItems,
  totalFolders,
  deleteHandler,
  searchItem,
  searchHandler,
  ...props
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
  const [isShowLoader, setShowLoader] = useState(false);
  const [showPopUp, setShowPop] = useState(false);
  const [responseMgs, setResponseMgs] = useState("");
  const columnMinWidth = {
    minWidth: "12.5%",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

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
    if (!fileTag || !fileName) {
      alert("Please Enter Required Field");
      return false;
    }
    saveFolder(fileName, fileTag, fileDescription, id);
    addName("");
    addDisc("");
    setId("");
    addFileTag("");
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
    addFileTag(deletedArr[0].file_tag);
    if (!isDelete) setShow(true);
    const requestFile = {
      filefolderRequest: deletedArr,
    };
    if (isDelete) deleteFolders(requestFile, restArr);
  };
  const deleteFolders = (requestFile, restArr) => {
    deleteHandler(requestFile, restArr);
  };
  const fileUploadHandler = async (e) => {
    //  e.preventDefault();
    setShowLoader(true);
    const formData = new FormData();
    var d = new Date();
    let imageName = d.getTime();
    imageName = `jpg_${imageName}.jpg`;
    //e.name = imageName;

    formData.append("files", e, imageName);
    try {
      let res = await Post("/uploadImage", formData, {
        headers: {
          fileId: -1,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 200) {
        setResponseMgs(res.data.message);
        setShowPop(true);
        window.location.reload();
        setShowLoader(false);
      } else {
        alert("Something went wrong try later");
        setShowLoader(false);
      }
    } catch (err) {}
  };
const closeHandler = () =>{
  setShow(false);
}
const editHandler = () =>{
  reNameFolder(false)
}
  return (
    <div className="row secondary-header single-header" style={topRowStyle}>
      {isShowLoader && <CustomLoader />}
      <ShowMessages
        hide={() => setShowPop(false)}
        message={responseMgs}
        show={showPopUp}
      />

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
          <div className="col-md-1 sec-header-item col-text-style">
            <UploadForm isUpload={true} submitHandler={fileUploadHandler} />
          </div>
          {totalItem == 0 && props.uploadLimits < 10 && (
            <div className="col-md-1 sec-header-item col-text-style item-center">
              <span>
                Limits{" "}
                <span className="badge badge-info">{props.uploadLimits}</span>
              </span>
            </div>
          )}
          <div
            style={columnMinWidth}
            className="col-md-1 sec-header-item col-text-style"
          >
            <Refresh
              style={{ marginLeft: "2rem" }}
              onClick={() => setShow(true)}
            />{" "}
            <span className="on-hover" onClick={() => setShow(true)}>
              Create Book
            </span>
          </div>
          <div
            style={columnMinWidth}
            className="col-md-1 col-text-style sec-header-item"
          >
            <FolderCreate onClick={() => window.location.reload()} />{" "}
            <span className="on-hover" onClick={() => window.location.reload()}>
              Refresh
            </span>
          </div>
          <div
            className={`  col-md-1  col-text-style ${
              totalItem == 0 ? "hideCount" : "sec-header-item"
            }`}
            style={columnMinWidth}
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
            style={columnMinWidth}
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
            style={columnMinWidth}
          >
            <EditBtn handler ={editHandler} />
            <span
              className="on-hover"
              onClick={() => showContactListModal(false)}
            >
              Edit
            </span>
            {/* <button
              onClick={showContactListModal}
              className="btn btn-secondary ml-2"
            >
              Shared List
            </button>
            <SharedListModal
              hide={setSharedListPop}
              show={isOpenPop}
              folderId={folderId}
              list={shareWithList}
            ></SharedListModal> */}
          </div>

          <div style={columnMinWidth} className="col-md-1  sec-header-item ">
            <div
              className={` col-text-style ${
                totalItem == 0 ? "hideCount" : "sec-header-item"
              }`}
            >
              <span className="count badge badge-info mr-1">{totalItem} </span>{" "}
              <span style={{ padding: "0 10px" }}> Selected</span>
              <Cross
                className="ml-1"
                onClick={() => window.location.reload()}
              ></Cross>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)} animation={true}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <Input
            placeholder="Enter your Book Name"
            label="Book Name"
            value={fileName}
            handleChange={(e) => addName(e.target.value)}
            name="folder"
            type="input"
          ></Input>
          <Input
            placeholder="Enter your Book Tag"
            label="Book Tag"
            value={fileTag}
            handleChange={(e) => addFileTag(e.target.value)}
            name="folder"
            type="input"
            maxlength={7}
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
          <CancelButton
            className="btn-danger btn"
            variant="secondary"
            handler={closeHandler}
          >
            Close
          </CancelButton>
          <Save handler={saveHandler}>Save Changes</Save>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default TopHeader;
