import React from "react";
import "./user-data.style.scss";
const UserData = ({ profile }) => {

  return (
    <div className="row mt-4">
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className="card card-body">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row div-row">
                <div className="col-4 ">
                  <h4 className="main-heading">{profile.unique_user_id}</h4>
                </div>
                <div className="col-4"></div>
              </div>
            </div>
            {/* <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row div-row">
                <div className="col-4 ">
                  <p className="info-heading">User Name</p>
                </div>
                <div className="col-4">{profile.unique_user_id}</div>
              </div>
            </div> */}
          </div>
          <div className="row div-row">
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row ">
                <div className="col-4  info-heading"> Full Name</div>
                <div className="col-4">{profile.fullname} </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row ">
                <div className="col-4 info-heading">DOB</div>
                <div className="col-4">{profile.dob}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row div-row">
                <div className="col-4 info-heading">Gender</div>
                <div className="col-4">{profile.gender}</div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row div-row">
                <div className="col-4 info-heading">City</div>
                <div className="col-4">{profile.city}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row div-row">
                <div className="col-4 info-heading">Address</div>
                <div className="col-4">{profile.address}</div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row div-row">
                <div className="col-4 info-heading">Country</div>
                <div className="col-4">{profile.country}</div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row div-row">
                <div className="col-4 info-heading">Email Address</div>
                <div className="col-6">{profile.email}</div>
              </div>

            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="row div-row">
                <div className="col-4 info-heading">Phone Number</div>
                <div className="col-4">{profile.mobileNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
