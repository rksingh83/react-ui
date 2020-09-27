import React from "react";
import ContactForm from './contact-form';
const ContactUs = () => (
  <div className="">
    <div className="row">
      <div className="col-md-12 help">
        <h1 className="heading-help">My Digi Network</h1>
      </div>
    </div>
    <div className="row m-0 mt-4">
      <div className="col-md-6 text-center">
        <img
          className="img-help"
          style={{ height: "150" }}
          src={require("../../assets/help-Logo.png")}
        ></img>
      </div>
      <div className="col-md-6 item-center">
      <ContactForm/>
      </div>
    </div>

  </div>
);

export default ContactUs;
