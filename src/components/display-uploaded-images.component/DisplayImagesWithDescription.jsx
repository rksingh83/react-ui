import React, { useState } from "react";
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from "../create-folder/create.btn.component";
import GetLoader from "../../ui/loder";
import { ReactComponent as Tick } from "../../assets/tick.svg";
import "./create-image.style.scss";
import { ListGroup } from "react-bootstrap";

const DisplayImagesWithDescription = ({
  images,
  folderId,

  onLeave,
  history,
  updateHandler,
  filteredImages,
  searchInput,
  isShowLoader,
  isSharedFolder,
}) => {
  let localRender = searchInput == "" ? images : filteredImages;
  if (!isShowLoader && images.length === 0) {
    return (
      <div className="col-md-12 loader-display mt-4">
        <h5 className="mt-4"> This book is empty</h5>
      </div>
    );
  } else {
    return (
      <>
        {localRender.map((item) => (
          <div className="row mb-2 card-body">
            <div className="col-md-4" style={{ display: "flex" }}>
              <img
                style={{ height: "190px" }}
                src={require("../../assets/spiral.png")}
              ></img>
              <img
                className="image-display"
                src={item.raw_image_org}
                style={{ height: "190px" }}
                onClick={() => history.push(`/original/${item.id}/${folderId}`)}
              ></img>
            </div>
            <div className="col-md-8">
              <ListGroup>
                <ListGroup.Item>
                  <span className="font-weight-bold">Page Title:</span>
                  <span className="pl-3">
                    {item.title ? item.title : "---"}
                  </span>
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="font-weight-bold">Date:</span>
                  <span className="pl-4">
                    {grtDate(item.updatedTimeMillisecond)}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="font-weight-bold">Page No:</span>
                  <span className="pl-3">
                    {item.pageNumber ? item.pageNumber : "---"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="font-weight-bold">Page ID:</span>
                  <span className="pl-3">{item.id ? item.id : "---"}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="font-weight-bold">Page No:</span>
                  <span className="pl-3">
                    {item.pageNumber ? item.pageNumber : "---"}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </div>
            {item.is_comment && (
              <div className="col-md-12 mt-2">
                <strong className="ml-3"> {item.description}</strong>
              </div>
            )}
          </div>
        ))}
      </>
    );
  }
};

function grtDate(time) {
  var date = new Date(time);
  return date.toLocaleDateString();
}
export default DisplayImagesWithDescription;
