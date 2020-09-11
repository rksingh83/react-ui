import React from "react";

const ApplyCouponHeader = () => (
  <div className="row">
    <div className="col-md-12">
      <nav className="navbar navbar-expand-lg navbar-light sec-header-bg">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className ="col-md-2"></div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
           <ul className="navbar-nav  text-white">
            <li className="nav-item">input button</li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
);
export default ApplyCouponHeader;
