import React, { useEffect, useState } from "react";

import { Post } from "../../service/service.setup";
import "./create-image.style.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SharedHeader from "../top-header/shared-header";

import { setFolderFlag } from "../../redux/shared-folder/folder.actions";

import { BackButton, EditBtn } from "../common/pNGButtons";
import RightSharedPeopleList from "../right-side-bar/RightSharedPeopleList";
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
    console.log(pendingBook);
    if (pendingBook[0]) {
      dispatch(setCurrentBookId(pendingBook[0].id));
      setPendingFolderId(pendingBook[0].id);
    }
  }, []);

  const setDefaultFolderId = () => {
    setFolderFlag("PENDING");
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
            <nav className="navbar navbar-expand-lg navbar-light sec-header-bg">
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
                <ul className="navbar-nav mr-auto text-white">
                  <li className="nav-item single-header-li">
                    <span className="badge badge-info p-2">
                      {currentFolderName}
                    </span>
                  </li>
                </ul>
                <ul className="navbar-nav ml-auto text-white">
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
          />
          <DefaultSideBar setDefaultFolderId={1} />
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
