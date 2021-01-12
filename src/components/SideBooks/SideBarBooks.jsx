import React from "react";
import { ListGroup, Row, Col, Image } from "react-bootstrap";

import BookSrc from "../../assets/download.png";
const SideBarBooks = ({
  books,
  allBooks,
  filteredBooks,
  setCurrentFolderId,
  searchItem,
}) => {
  books = searchItem == "" ? allBooks : filteredBooks;
  return (
    <ListGroup
      style={{
        maxHeight: "36rem",
        minHeight: "36rem",
        overflowY: "auto",
        border: "1px solid rgba(0, 0, 0, 0.125)",
      }}
    >
      {books.map((book) => (
        <ListGroup.Item className="p-1" key={book.id}>
          <Row>
            <Col md={2}>
              <Image
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentFolderId(book.id, book.sharedImageflg)}
                fluid
                src={BookSrc}
              />
            </Col>
            <Col md={10}>
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setCurrentFolderId(book.id, book.sharedImageflg)
                  }
                >
                  <span className="pl-2">
                    {book.fileName}
                    {book.owner ? `(${book.owner})` : ""}
                    <p className="pl-2">{book.fileDescription}</p>
                  </span>
                </span>
                <span>
                  {getTime(book.dateUpdated)}
                  <br />
                  {book.pageCount}
                </span>
              </span>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SideBarBooks;
const getTime = (time) => {
  // time = getISTTime(time);
  var s = new Date(time).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  var d1 = new Date(time); // jan,1 2011
  var d2 = new Date(); // now
  var diff = d2 - d1,
    sign = diff < 0 ? -1 : 1,
    milliseconds,
    seconds,
    minutes,
    hours,
    days;
  diff /= sign; // or diff=Math.abs(diff);
  diff = (diff - (milliseconds = diff % 1000)) / 1000;
  diff = (diff - (seconds = diff % 60)) / 60;
  diff = (diff - (minutes = diff % 60)) / 60;
  days = (diff - (hours = diff % 24)) / 24;
  if (days > 0) {
    return `${days} days ago`;
  }
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
  if (seconds > 0) {
    return `${seconds} seconds ago`;
  }
  //   console.info(
  //     sign === 1 ? "Elapsed: " : "Remains: ",
  //     days + " days, ",
  //     hours + " hours, ",
  //     minutes + " minutes, ",
  //     seconds + " seconds, ",
  //     milliseconds + " milliseconds."
  //   );
};
const getISTTime = (tme) => {
  let d = new Date(tme);
  return new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
};