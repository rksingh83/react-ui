import React from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
const ImageSharedList = ({ users }) => {
  return (
    <Row>
      <Col md={12}>
        <ListGroup>
          {users.map((item) => (
            <ListGroup.Item>
              {item.fullname} {item.email} 
              {item.mobileNumber ? item.mobileNumber : ""}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};
export default ImageSharedList;
