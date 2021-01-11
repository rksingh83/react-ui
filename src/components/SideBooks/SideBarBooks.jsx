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
                  {book.dateCreated.split(" ")[1]}
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
