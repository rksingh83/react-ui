import React, { useEffect, useState } from "react";

import { Post } from "../../service/service.setup";
import "./create-image.style.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
const DisplayLastImage = ({ match, history, sharedWithMe }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const requestFile = { ids: [match.params.id], imagetype: "original" };
    const IMAGE_ORIGINAL_URL =  (sharedWithMe =='HOME')?'getAnyCloudImages':'getAnySharedCloudImages';
    Post(`/${IMAGE_ORIGINAL_URL}`, requestFile).then((res) => {
      if (res.data.code == 201) {
        alert(res.data.error);
        history.push("/logout");
      }
      setImageUrl(res.data.imageInput[0].align_image_org);
    });
  }, []);
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
    width: "4rem",
    height: "2rem",
  };
  const download = (src) => {
    var element = document.createElement("a");
    var file = new Blob([src], { type: "image/*" });
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
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
              <ul className="navbar-nav ml-auto text-white">
                <li className="nav-item">
                  <Pencil
                    onClick={() => history.push(`/edit/${match.params.id}`)}
                    style={pencilStyle}
                  ></Pencil>
                </li>
                <li className="nav-item">
                  <Cross
                    onClick={() => history.goBack()}
                    style={crossStyle}
                  ></Cross>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-success"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className=" custom-pad-li d-none d-sm-block col-md-2 p-0">
          <Link className="logo-container" to="/">
            <ul className=" ul-pad list-group left-side-bar">
              <li className="custom-pad-li list-group-item active">Home</li>
            </ul>
          </Link>
        </div>
        <div className="col-md-9 col-xs-12 col-sm-12">
          <img style={styleImage} src={`${imageUrl}`}></img>
        </div>
      </div>
    </>
  );
};
const mapStateToPros = ({ sharedWithMe: { sharedWithMe } }) => ({
  sharedWithMe,
});
export default connect(mapStateToPros)(DisplayLastImage);
//export default DisplayLastImage;
