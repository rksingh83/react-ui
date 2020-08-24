import React from "react";

const sharedHeader = ({
  history,
  back,
  searchHandler,
  fillAllDataHandler,
  searchItem,
  setSharedFileSearchHandler,
  setSharedFileSearInput,
}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <nav
          style={{ minHeight: "3rem", paddingLeft: "0px" }}
          className="navbar navbar-expand-lg navbar-light sec-header-bg single-header"
        >
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
          <ul className="navbar-nav mr-auto text-white">
            {back && (
              <li className="nav-item">
                <input
                  placeholder="Search By User"
                  value={searchItem}
                  onChange={searchHandler}
                  onBlur={fillAllDataHandler}
                  name="search"
                  type="input"
                  className="custom-input"
                ></input>
              </li>
            )}
            {back && (
              <li className="nav-item">
                <input
                  placeholder="Search By File Name."
                  value={setSharedFileSearInput}
                  onChange={setSharedFileSearchHandler}
                  onBlur={setSharedFileSearchHandler}
                  name="search"
                  type="input"
                  className="custom-input ml-2"
                ></input>
              </li>
            )}
          </ul>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto text-white">
              {!back && (
                <li className="nav-item">
                  <button
                    className="btn btn-success"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default sharedHeader;
