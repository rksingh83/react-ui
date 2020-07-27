import React, { useState, useEffect } from "react";
import Select from "../boostrapinput/select.component";
import Input from "../boostrapinput/input.component";
import { Post, Get } from "../../service/service.setup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserProfileFormData = ({ profile }) => {
  const [userData, setProfile] = useState({});

  const [genderList, setGender] = useState([
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "other", name: "Other" },
  ]);
  async function getProfile() {
    try {
      const user = await Get("getProfile");
      //date = date.replace(/\//g, '_');
      setProfile(user.data.data.profile);
      console.log(user.data);
    } catch (error) {}
  }
  const saveDataHandler = async () => {
    try {
      const user = await Post("/setuserProfile", userData);
      if (user.data.code == 200) window.location.reload();
      if (user.data.code == 207) alert(user.data.message);
      console.log(user);
    } catch (error) {}
  };
  useEffect(() => {
    getProfile();
  }, []);
  const setProfileHandler = (e) => {
    const { name, value } = e.target;
    setProfile({ ...userData, [name]: value });
  };
  const setDobHandler = (e) => {
    //const {value} =(e.target) ;
    console.log(e);
    setProfile({ ...userData, dob: e });
  };
  return (
    <div className=" mt-4">
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-md-4 col-sm -12">
          <div className="card card-body">
            <Input
              onChange={setProfileHandler}
              type="text"
              label="User Name"
              placeholder="User Name"
              name="unique_user_id"
              value={userData.unique_user_id}
            ></Input>
            <Input
              onChange={setProfileHandler}
              type="text"
              label="Nick Name"
              placeholder="Enter Section name"
              name="nickname"
              value={userData.nickname}
            ></Input>

            <Input
              onChange={setProfileHandler}
              type="text"
              label="Full Name "
              placeholder="Enter full name"
              name="fullname"
              value={userData.fullname}
            ></Input>
            <Input
              onChange={setProfileHandler}
              type="date"
              label="Full Name "
              placeholder="Enter full name"
              name="dob"
              value={userData.dob}
            ></Input>

            <Select
              onChange={setProfileHandler}
              label="Gender"
              placeholder="Enter your Password"
              list={genderList}
              name="gender"
              value={userData.gender}
            ></Select>
            <Input
              onChange={setProfileHandler}
              type="text"
              label="City"
              placeholder="Enter Section City"
              name="nickname"
              value={userData.city}
            ></Input>
            <Input
              onChange={setProfileHandler}
              type="text"
              label="Address"
              placeholder="Enter Address"
              value={userData.address}
              name="address"
            ></Input>
            <Input
              onChange={setProfileHandler}
              type="text"
              label="Email"
              placeholder="email"
              value={userData.email}
              name="email"
              disabled={true}
            ></Input>

            <button
              onClick={saveDataHandler}
              className="btn btn-success"
              type="button"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileFormData;
