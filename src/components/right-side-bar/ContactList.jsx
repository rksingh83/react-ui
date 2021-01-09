import React from 'react'
import { Row, Col, Image } from "react-bootstrap";
import Avatar from "../../assets/avatar.png";
const ContactList = ({contactList}) => {
    return (
        <>
        {contactList.map((item) => (
            <Col md={12} className="bg-dark">
              <Row>
                <Col md={2}>
                  <Image
                    height="70px"
                    width="70px"
                    className="profile-image rounded-circle"
                    fluid
                    src={Avatar}
                    rounded-circle
                  />
                </Col>
                <Col md={8}>
                  <span>
                    <h6>{item.fullname}</h6>
                    <p className="mb-0">{item.email}</p>
                    <p>Owner</p>
                  </span>
                </Col>
              </Row>
            </Col>
          ))}
          </>
    )
}

export default ContactList
