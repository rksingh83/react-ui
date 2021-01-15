import React from "react";
import { ReactComponent as Share } from "../../assets/share.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
import { Row, Col, Image } from "react-bootstrap";
import Avatar from "../../assets/avatar.png";

const ContactList = ({
  isSharedFolder,
  contactList,
  message,
  cancel,
  shareHandler,
  removeContact,
}) => {
  if (contactList.length === 0) {
    return <Col className="text-white mt-2"> {message}</Col>;
  }
  const getProfileImageUrl = (profilePicture) => {
    return profilePicture ? profilePicture : Avatar;
  };
  return (
    <div className="mt-2">
      {contactList.map((item, index) => (
        <Col key={index} md={12} className="bg-dark">
          <Row>
            <Col md={2}>
              <Image
                height="60px"
                width="60px"
                className="profile-image rounded-circle"
                src={getProfileImageUrl(item.profilePicture)}
                rounded-circle
              />
            </Col>
            <Col md={8}>
              <span>
                <h6>{item.fullname}</h6>
                <p className="mb-0">{item.email}</p>
                <p>{item.isuploadaccess ? "Editor" : "Read Only"}</p>
              </span>
            </Col>
            {!isSharedFolder && (
              <Col md={1}>
                {cancel ? (
                  <Close onClick={() => removeContact(item.id)} />
                ) : (
                  <Share
                    onClick={() => shareHandler({ user_id: item.id })}
                    user_id
                  />
                )}
              </Col>
            )}
          </Row>
        </Col>
      ))}
    </div>
  );
};

export default ContactList;
