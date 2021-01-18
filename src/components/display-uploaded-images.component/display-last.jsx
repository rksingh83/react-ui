import React, { useEffect, useState } from "react";

import { Post } from "../../service/service.setup";
import "./create-image.style.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SharedHeader from "../top-header/shared-header";
import { Row, Col } from "react-bootstrap";
import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
import { BackButton, EditBtn } from "../common/pNGButtons";

import SideBarBooks from "../SideBooks/SideBarBooks";
import { useDispatch, useSelector } from "react-redux";
import DefaultSideBar from "../sidebar/DefaultSideBar";
import { setCurrentBookId } from "../../redux/all-books/allBooks.actions";
const DisplayLastImage = ({
  match,
  history,
  sharedWithMe,
  setFolderFlag,

  currentUser,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const allBooks = useSelector((state) => state.userBooks.books);
  const currentFolderId = useSelector((state) => state.userBooks.currentBookId);
  const [searchItem, setSearchHandler] = useState("");
  const [filteredFolder, setFilteredFolder] = useState("");
  const dispatch = useDispatch("");
  const [currentPendingFolderId, setPendingFolderId] = useState("");
  const [currentFolderName, setCurrentFolderName] = useState("");

  useEffect(() => {
    const requestFile = { ids: [match.params.id], imagetype: "_align.jpg" };
    const IMAGE_ORIGINAL_URL =
      sharedWithMe == "HOME" ? "getAnyCloudImages" : "getAnySharedCloudImages";
    Post(`/${IMAGE_ORIGINAL_URL}`, requestFile).then((res) => {
      if (res.data.code == 201) {
        alert(res.data.error);
        history.push("/logout");
      }

      setCurrentFolderName(res.data.imageInput[0].fileName);
      setImageUrl(res.data.imageInput[0].raw_image_org);
      setImageTitle(res.data.imageInput[0].title);
    });
  }, []);
  useEffect(() => {
    const pendingBook = allBooks.filter((item) => item.pending === true);
    if (pendingBook[0]) {
      setPendingFolderId(pendingBook[0].id);
    }
  }, []);
  const searchHandler = (e) => {
    setSearchHandler(e.target.value);
    setFilteredFolder(
      allBooks.filter(
        (item) =>
          item.fileName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          (item.file_tag &&
            item.file_tag
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.owner &&
            item.owner.toLowerCase().includes(e.target.value.toLowerCase())) ||
          (item.fileDescription &&
            item.fileDescription
              .toLowerCase()
              .includes(e.target.value.toLowerCase()))
      )
    );
  };
  const setDefaultFolderId = () => {
    setFolderFlag("PENDING");
    dispatch(setCurrentBookId(currentPendingFolderId));
    history.push(`/?id=${currentPendingFolderId}`);
  };
  const styleImage = {
    width: "100%",
    height: "100%",
    marginTop: "10px",
  };
  const crossStyle = {
    width: "4rem",
    height: "2rem",
  };
  const pencilStyle = {
    height: "2rem",
  };
  const download = (src) => {
    var element = document.createElement("a");
    var file = new Blob([src], { type: "image/*" });
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  const editHandler = () => {
    history.push(`/edit/${match.params.id}`);
  };
  const setFolderIdHandler = (id, flag) => {
    history.push(`/?id= ${id}`);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {sharedWithMe == "SHARED" && <SharedHeader history={history} />}
          {sharedWithMe == "PENDING" && <SharedHeader history={history} />}
          {sharedWithMe == "HOME" && (
            <nav className="navbar navbar-expand-lg navbar-light sec-header-bg pl-0">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div
                  className="col-md-3 pl-1"
                  style={{
                    minHeight: "3rem",
                  }}
                >
                  <Row>
                    <Col md={10}>
                      <input
                        placeholder="Search anything.."
                        value={searchItem}
                        onChange={searchHandler}
                        name="search"
                        type="input"
                        className="custom-input mt-1"
                      ></input>
                    </Col>
                  </Row>
                </div>

                <ul className="navbar-nav ml-auto text-white">
                  <li className="nav-item single-header-li">
                    <span className="badge badge-info p-2">
                      {currentFolderName}
                    </span>
                  </li>
                  <li className="nav-item">
                    <EditBtn
                      onClick={editHandler}
                      style={pencilStyle}
                    ></EditBtn>
                  </li>
                  <li className="nav-item">
                    <Cross
                      onClick={() => history.goBack()}
                      style={crossStyle}
                    ></Cross>
                  </li>
                  <li className="nav-item">
                    <BackButton handler={history.goBack}></BackButton>
                  </li>
                </ul>
              </div>
            </nav>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 pl-0">
          <SideBarBooks
            setCurrentFolderId={setFolderIdHandler}
            searchItem={searchItem}
            allBooks={allBooks}
            filteredBooks={filteredFolder}
            bookId={currentFolderId}
          />
          <DefaultSideBar setDefaultFolderId={setDefaultFolderId} />
        </div>
        <div className="col-md-9 col-xs-12 col-sm-12">
          <p>{imageTitle}</p>
          <img style={styleImage} src={`${imageUrl}`}></img>
        </div>
      </div>
    </>
  );
};
const mapStateToPros = ({
  sharedWithMe: { sharedWithMe },
  user: { currentUser },
}) => ({
  sharedWithMe,
  currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setFolderFlag: (flag) => dispatch(setFolderFlag(flag)),
});

export default connect(mapStateToPros, mapDispatchToProps)(DisplayLastImage);
//export default DisplayLastImage;
