import React from "react";
import { ReactComponent as Share } from "../../assets/share.svg";
import { Col, Row, ListGroup } from "react-bootstrap";
const UserGroupList = ({
  groups,
  shareGroupHandler,
  isSharedFolder,
  giveUploadAccess,
}) => {
  return (
    <>
      <Col className="group-li" md={12}>
        <ListGroup>
          {groups.map((group) => (
            <ListGroup.Item>
              <Row className ="mb-1">
                <Col md={12}>
                  <h6 className="m-0 font-weight-bold ">{group.groupName}</h6>
                  <p className="m-0">{group.groupDescription}</p>
                </Col>
              </Row>
              {!isSharedFolder && (
                <Row>
                  <Col className ='p-0' md={7}>
                    <button
                      onClick={() =>
                        giveUploadAccess({ id: group.id, isUpload: true })
                      }
                      className="btn btn-dark"
                    >
                      Upload Access
                    </button>
                  </Col>
                  <Col md={5}>
                    <Share
                      onClick={() => shareGroupHandler({ id: group.id })}
                    />
                  </Col>
                </Row>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </>
  );
};

export default UserGroupList;
