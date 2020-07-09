import React, { useState, useEffect } from "react";
import { Post} from "../../service/service.setup";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import "./lon.style.scss";
import LeftSideBar from "../sidebar/left.sidebar.compoent";
import DisplayImages from "../display-uploaded-images.component/display-uploded-images";
import DisplayImageDescription from "../display-discription/display-discription";
import TopHeaderWithBack from "../top-header/simple-top.back";
import { Link } from "react-router-dom";
const UploadFile = ({ match, history }) => {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageDescription, setImagesDescription] = useState("Hi");
  const [pageNumber, setPageNumber] = useState("");
  const [date, setDate] = useState("");
  const [iSDisplayDiv, setIsDisplayDiv] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [folderId, setFolderId] = useState(match.params.id);
  const [imagesUpdate, setImagesUpdate] = useState([]);

  const sideBarStyle = {
    border: "1px solid rgba(0, 0, 0, 0.125)",
    height: "90vh",
  };

  const totalEle = ["Home"];
  const [LiElement, setLiEl] = useState(totalEle);
  const handleActive = (e) => {
    setActiveIndex(LiElement.indexOf(e));
    setLiEl(totalEle);
  };
  const otpHandler = () => {};
  const showContentHandler = (pageNo, des, date) => {
    setIsDisplayDiv(true);
    setImagesDescription(des);
    setPageNumber(pageNo);
    setDate(date);
  };
  const hideContentHandler = (flag) => {
    setIsDisplayDiv(flag);
  };
  useEffect(() => {
    const requestFile = { id: match.params.id };
    setIsLoading(true);
    Post("/getAllFileImages", requestFile).then((res) => {
      if (res.data.code == 201) {
        alert(res.data.error);
        history.push("/logout");
      }
      if (res.data.code == 201) {
        // history.push('/logout');
      }
      setImages(res.data.imageInput);
      setIsLoading(false);
    });
  }, []);
  const updateHandler = (list) => {
    setImagesUpdate(list);
  };
  return (
    <>
      <TopHeaderWithBack
        id={match.params.id}
        updateImages={imagesUpdate}
        history={history}
        images={images}
        setImages={setImages}
      />
      <div className="row">
        <div className="col-md-2 custom-pad-li  d-none d-sm-block">
          <Link className="logo-container" to="/">
            <ul className="list-group ul-pad" style={sideBarStyle}>
              {totalEle.map((item, index) => (
                <LeftSideBar
                  item={item}
                  key={index}
                  isActive={activeIndex == index ? true : false}
                  changeActive={handleActive}
                />
              ))}
              <DisplayImageDescription
                pageNumber={pageNumber}
                iSDisplayDiv={iSDisplayDiv}
                isShowNumber={true}
                date={date}
                imageDescription={imageDescription}
              />
            </ul>
          </Link>
        </div>
        <div className="col-md-9">
          <div
            className="empty-folder"
            style={{ display: images.length == 0 ? "" : "none" }}
          >
            <h4>Folder is Empty</h4>
          </div>
          <DisplayImages
            history={history}
            onHove={showContentHandler}
            onLeave={hideContentHandler}
            images={images}
            folderId={folderId}
            updateHandler={updateHandler}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default UploadFile;
