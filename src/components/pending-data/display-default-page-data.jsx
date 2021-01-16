import React, { useState, useEffect } from "react";
import { Post, Get } from "../../service/service.setup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateByAdmin } from "../../service/pendingData";
import { Alert, Button } from "react-bootstrap";

import { sendPageLookupInvitation } from "../../service/common";

import Searchable from "react-searchable-dropdown";
import {
  FileSelect,
  FileTagSelect,
} from "../boostrapinput/pending-select.component";
import Input from "../boostrapinput/input.component";

const DefaultPageData = ({
  data,
  currentImageId,
  history,
  pendingFolderId,
  removeImageId,
  pageData,
  pageLookUpHandler,
  isRedirectLast,
  isMemberShip,
  pageLookUpDateHandler,
  isDisabled,
  ...props
}) => {
  const tmnImageStyle = {
    width: "100%",
    border: "1px solid green",
  };

  const getDataTime = (timeStamp) => {
    if (timeStamp) {
      let date = new Date(timeStamp).toLocaleDateString();
      date = date.split("/");
      return `${date[1]}/${date[0]}/${date[2]}`;
    } else {
      return "---";
    }
  };

  return (
    <div className="container-sm mt-4" style={{ maxWidth: "" }}>
      <div className="row ">
        <div className="col-md-4">
          {isRedirectLast && (
            <img
              onClick={() =>
                props.redirectAndSaveId
                  ? props.redirectAndSaveId(
                      `/last/${currentImageId}`,
                      currentImageId
                    )
                  : history.push(`/last/${currentImageId}`)
              }
              style={tmnImageStyle}
              src={data.pageLookup.cloudImagePath}
              className="hover"
            />
          )}
          {!isRedirectLast && (
            <img
              onClick={() =>
                props.redirectAndSaveId
                  ? props.redirectAndSaveId(
                      `/edit/${currentImageId}`,
                      currentImageId
                    )
                  : history.push(`/edit/${currentImageId}`)
              }
              style={tmnImageStyle}
              src={data.pageLookup.cloudImagePath}
              className="hover"
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="row ">
            <div classNam className="col-md-4 pl-0 font-weight-bold">
              Book Name:
            </div>

            <div className="col-md-8">
              {getBookName(data.pageLookup.file, pageData.fileId)}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4 pl-0 font-weight-bold">Book Tag:</div>
            <div className="col-md-8 ">
              {getBookTag(data.pageLookup.file, pageData.fileId)}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="font-weight-bold col-md-4">Page Title:</div>
            <div className="col-md-8">
              {pageData.title ? pageData.title : "---"}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4 font-weight-bold pl-0">Date:</div>
            <div className="col-md-8">{getDataTime(pageData.date)}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4 pl-0  font-weight-bold"> Page No:</div>
            <div className="col-md-8">
              {pageData.pageNumber ? pageData.pageNumber : "---"}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4 pl-0 font-weight-bold">Page ID:</div>
            <div className="col-md-8">{pageData.id ? pageData.id : "---"}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4  pl-0 font-weight-bold">Description:</div>
            <div className="col-md-8">
              {pageData.description ? pageData.description : "---"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getBookName = (allBooks, id) => {
  const book = allBooks.find((book) => book.id === id);
  return book ? book.fileName : "---";
};
const getBookTag = (allBooks, id) => {
  const book = allBooks.find((book) => book.id === id);
  return book ? book.fileTag : "---";
};
export default DefaultPageData;
