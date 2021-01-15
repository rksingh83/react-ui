import React from "react";
import { ListGroup } from "react-bootstrap";
const DefaultSideBar = ({setDefaultFolderId}) => {
  return (
    <ListGroup>
      <ListGroup.Item
        className="bg-header text-white"
        onClick={setDefaultFolderId}
      >
        Default Pages
      </ListGroup.Item>
    </ListGroup>
  );
};

export default DefaultSideBar;
