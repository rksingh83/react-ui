import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Input from "../boostrapinput/input.component";

import BookSrc from "../../assets/download.png";
import { Image, Row, Col } from "react-bootstrap";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { ReactComponent as FolderCreate } from "../../assets/trade.svg";
import { ReactComponent as Refresh } from "../../assets/icon.svg";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import CustomToolTip from "../common/CustomToolTip";
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
  bookId,
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
    minWidth: "6.5%",
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
    deletedArr = [totalFolders.find((item) => item.id === bookId)];

    setId(deletedArr[0].id);
    addDisc(deletedArr[0].fileDescription);
    addName(deletedArr[0].fileName);
    addFileTag(deletedArr[0].file_tag);
    if (isDelete)
      if (
        !window.confirm(
          `Are you sure you want to delete ${deletedArr[0].fileName} book ?`
        )
      )
        return;
    if (!isDelete) setShow(true);
    const requestFile = {
      filefolderRequest: deletedArr,
    };
    if (isDelete)
      deleteFolders(
        {
          filefolderRequest: [{ ...deletedArr[0], deleted: true }],
        },
        restArr
      );
  };
  const deleteFolders = (requestFile, restArr) => {
    console.log(requestFile);
    deleteHandler(requestFile, restArr);
  };
  const fileUploadHandler = async (e) => {
    //  e.preventDefault();
    setShowLoader(true);
    const fileType = e.name.split(".").pop();
    if (fileType !== "png" && fileType !== "jpg") {
      alert("Invalid File type");
      setShowLoader(false);
      return false;
    }
    // console.log(e.name.split('.').pop());
    const formData = new FormData();
    var d = new Date();
    let imageName = d.getTime();
    imageName = `jpg_${imageName}.${fileType}`;
    //e.name = imageName;
    
    formData.append("files", e, imageName);
    try {
      let res = await Post("/uploadImage", formData, {
        headers: {
          fileId: bookId,
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
  const closeHandler = () => {
    setShow(false);
  };
  const editHandler = () => {
    reNameFolder(false);
  };
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
          <div className="col-md-3  pl-1 sec-header-item">
            <Row>
              <Col md={10}>
                <input
                  placeholder="Search anything.."
                  value={searchItem}
                  onChange={searchHandler}
                  onBlur={fillAllDataHandler}
                  name="search"
                  type="input"
                  className="custom-input mt-1"
                ></input>
              </Col>
              <Col md={2}>
                <span className="on-hover" onClick={() => setShow(true)}></span>
                <CustomToolTip text="Create Book">
                  <Image
                    style={{ marginLeft: ".3rem" }}
                    onClick={() => setShow(true)}
                    src={BookSrc}
                    fluid
                  />
                </CustomToolTip>
              </Col>
            </Row>
          </div>
          <div className="col-md-9 sec-header-item col-text-style">
            <Col md={12}>
              <Row>
                <Col md={3}>
                  <input
                    placeholder="Search anything.."
                    value={props.searchImage}
                    onChange={props.searchImageHandler}
                    onBlur={fillAllDataHandler}
                    name="search"
                    type="input"
                    className="custom-input mt-1"
                  ></input>
                </Col>
                <Col className="top-header-icons pr-0" md={9}>
                  {totalFolders.length>0 && (
                    <CustomToolTip text="Edit book">
                      <EditBtn handler={editHandler} />
                    </CustomToolTip>
                  )}
                  {totalFolders.length>0 && (
                    <CustomToolTip text="Delete Book">
                      <Delete onClick={() => reNameFolder(true)} />
                    </CustomToolTip>
                  )}

                  <CustomToolTip text="Refresh">
                    <FolderCreate
                      className="pl-2 pr-2"
                      onClick={() => window.location.reload()}
                    />
                  </CustomToolTip>

                  <CustomToolTip text="Upload Image">
                    <UploadForm
                      isUpload={true}
                      submitHandler={fileUploadHandler}
                    />
                  </CustomToolTip>
                  {totalItem == 0 && props.uploadLimits < 10 && (
                    <div className=" sec-header-item col-text-style item-center">
                      <span>
                        Limits{" "}
                        <span className="badge badge-info">
                          {props.uploadLimits}
                        </span>
                      </span>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
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
          <Save handler={saveHandler} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default TopHeader;
