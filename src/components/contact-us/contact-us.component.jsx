import React from "react";
import SecondaryHeader from "../common/SecondaryHeader";
import SideBar from "../profile/sidebar.conponent";
import ContactForm from "./contact-form";
const ContactUs = () => (
  <div className="">
    <SecondaryHeader/>
    <div className="row m-0">
      <SideBar />
      <div className="col-md-5 text-center">
        <img
          className="img-help"
          style={{ height: "150" }}
          src={require("../../assets/help-Logo.png")}
        ></img>
      </div>
      <div className="col-md-5 item-center">
        <ContactForm />
      </div>
    </div>
  </div>
);

export default ContactUs;
