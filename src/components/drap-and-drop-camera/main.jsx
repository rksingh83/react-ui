import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";
import WebcamCapture from "./web-cam";
import DatePicker from "react-datepicker";
import DisplayImages from "../display-uploaded-images.component/display-uploded-images";
import CapturedImages from "./CapturedImages";
const CameraWithWebCam = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [imgSrc, setImgSrc] = React.useState([]);
  return (
    <>
      <Row className="mb-2">
        <Col md={6}>
          <input
            className="form-control"
            type="text"
            placeholder="Page-Title"
          ></input>
        </Col>
        <Col md={6}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>drag files</Col>
        <Col md={6}>
          <WebcamCapture imgSrc={imgSrc} setImgSrc={setImgSrc} id={777} />
        </Col>
      </Row>
      <Row>
        <Col md={12} style={{ display: "flex", flexWrap: "wrap" }}>
          <CapturedImages images={imgSrc} />
        </Col>
      </Row>
      {imgSrc.length > 0 && (
        <Row>
          <Col md={6}>
            <button className="btn btn-block btn-primary">Submit</button>
          </Col>

          <Col md={6}>
            <button
              onClick={() => setImgSrc([])}
              className="btn btn-block btn-primary"
            >
              Cancel
            </button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CameraWithWebCam;
