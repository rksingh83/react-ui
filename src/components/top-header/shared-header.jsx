import React from "react";

const sharedHeader = ({ history, back }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <nav style ={{minHeight:"3rem"}} className="navbar navbar-expand-lg navbar-light sec-header-bg single-header">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!back && (
              <ul className="navbar-nav ml-auto text-white">
                <li className="nav-item">
                  <button
                    className="btn btn-success"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default sharedHeader;
