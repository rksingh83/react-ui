import React from "react";
import { ReactComponent as Share } from "../../assets/share.svg";
import { Col, Row, ListGroup } from "react-bootstrap";
const UserGroupList = ({ groups, shareGroupHandler, isSharedFolder }) => {
  return (
    <>
      <Col  className ="group-li" md={12}>
        <ListGroup>
          {groups.map((group) => (
            <ListGroup.Item >
              <Row>
                <Col md={10}>
                  <h6 className="m-0">{group.groupName}</h6>
                  <p className="m-0">{group.groupDescription}</p>
                </Col>
                <Col md={2}>
                  {!isSharedFolder && (
                    <Share onClick={() => shareGroupHandler({id:group.id})} />
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </>
  );
};

export default UserGroupList;
