import React, { useState, useEffect } from "react";
import { Get } from "../../service/service.setup";
import UserData from "./display.user.data";
import UserProfileFormData from "./user.set.data";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { ReactComponent as Cross } from "../../assets/cross.svg";
const Profile = () => {
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [profile, setProfile] = useState({});

  const [gender, setGender] = useState([
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "other", name: "Other" },
  ]);
  async function getProfile() {
    try {
      const user = await Get("getProfile");
      setProfile(user.data.data.profile);
    } catch (error) {}
  }
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="mt-4 p-4">
      <div className="row">
        <div className="col pb-2">
          <h5 className="edit-heading"> Edit User Details</h5>
          <Pencil
            onClick={() => setIsShowEdit(true)}
            className="svg-styling"
            style={{ display: isShowEdit ? "none" : "" }}
          ></Pencil>
          <Cross
            className="svg-styling"
            onClick={() => setIsShowEdit(false)}
            style={{ display: isShowEdit ? "" : "none" }}
          >
            >
          </Cross>
        </div>
      </div>
      <div style={{ display: isShowEdit ? "" : "none" }}>
        <UserProfileFormData profile={profile}></UserProfileFormData>
      </div>
      <div style={{ display: isShowEdit ? "none" : "" }} className="">
        <UserData profile={profile}></UserData>
      </div>
    </div>
  );
};

export default Profile;
