import React, { useState, useEffect } from "react";
import { Get } from "../../service/service.setup";
import UserData from "./display.user.data";
import UserProfileFormData from "./user.set.data";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import UpdatePassword from "../modal/change-password-modal";
import SideBar from "./sidebar.conponent";
const Profile = ({ history }) => {
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowUpdatePasswordModal, setIsShowUpdatePasswordModal] = useState(
    false
  );
  const [profile, setProfile] = useState({});

  const [gender, setGender] = useState([
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "other", name: "Other" },
  ]);
  async function getProfile() {
    try {
      const user = await Get("getProfile");
      setProfile(user.data.data.profile[0]);
    } catch (error) {}
  }
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="">
      <div className="row">
        <div className="col-md-12">
          <nav className="navbar navbar-expand-lg navbar-light sec-header-bg">
            <div>
              <div className="edit-heading">
                <span className="edit-label"> Edit User Details</span>
                <UpdatePassword
                  hide={setIsShowUpdatePasswordModal}
                  show={isShowUpdatePasswordModal}
                  email={profile.email}
                />
                <Pencil
                  onClick={() => setIsShowEdit(true)}
                  className="svg-styling"
                  style={{ display: isShowEdit ? "none" : "" }}
                ></Pencil>

                <Cross
                  className="svg-styling"
                  onClick={() => setIsShowEdit(false)}
                  style={{ display: isShowEdit ? "" : "none" }}
                ></Cross>
                <button
                  className="ml-auto btn btn-info change-password"
                  onClick={() => setIsShowUpdatePasswordModal(true)}
                  style={{ float: "right" }}
                >
                  Change Password
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="row">
        <SideBar />
        <div className ="col-md-10">
        <div style={{ display: isShowEdit ? "" : "none" }}>
          <UserProfileFormData
            history={history}
            profile={profile}
          ></UserProfileFormData>
        </div>
        <div style={{ display: isShowEdit ? "none" : "" }} className="">
          <UserData profile={profile}></UserData>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
