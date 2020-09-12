import React, { useState, useEffect } from "react";
import Select from "../boostrapinput/select.component";
import Input from "../boostrapinput/input.component";
import { Post, Get } from "../../service/service.setup";
import EditEmailModal from "../modal/change-email-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const UserProfileFormData = ({ profile, history }) => {
  const [userData, setProfile] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
const [dob ,setDOB] = useState('')
  const [genderList, setGender] = useState([
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "other", name: "Other" },
  ]);
  async function getProfile() {
    try {
      const user = await Get("getProfile");
      //date = date.replace(/\//g, '_');
      setProfile(user.data.data.profile[0]);
      setDOB(new Date(user.data.data.profile[0].dob))
    } catch (error) {}
  }
  const saveDataHandler = async () => {
    try {
      const request = {...userData ,dob}
      const user = await Post("/setuserProfile", request);
      if (user.data.code == 200) window.location.reload();
      if (user.data.code == 207) alert(user.data.message);
    } catch (error) {}
  };
  useEffect(() => {
    getProfile();
  }, []);
  const setProfileHandler = (e) => {
    //console.log(userData);
    console.log( new Date(userData.dob))
    const { name, value } = e.target;
    console.log(userData);
    setProfile({ ...userData, [name]: value });
  };
  const setDOBHandler = (e) => {
    console.log(userData);
    //const {value} =(e.target) ;
    setDOB(e);
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
            {/* <Input
              onChange={setProfileHandler}
              type="text"
              label="Nick Name"
              placeholder="Enter Section name"
              name="nickname"
              value={userData.nickname}
            ></Input> */}

            <Input
              onChange={setProfileHandler}
              type="text"
              label="Full Name "
              placeholder="Enter full name"
              name="fullname"
              value={userData.fullname}
            ></Input>
            {/* <Input
              onChange={setProfileHandler}
              type="date"
              label="Date of Birth "
              placeholder="Enter Date of Birth"
              name="dob"
              value={userData.dob}
            ></Input> */}
            <DatePicker
              name="date"
              className="form-control"
              selected={dob}
              onChange={setDOBHandler}
            />

            <Select
              onChange={setProfileHandler}
              label="Gender"
              placeholder="Enter your Gender"
              list={genderList}
              name="gender"
              value={userData.gender}
            ></Select>

            <Input
              onChange={setProfileHandler}
              type="text"
              label="Address"
              placeholder="Enter Your Address "
              value={userData.address}
              name="address"
            ></Input>

            <Input
              onChange={setProfileHandler}
              type="text"
              label="City"
              placeholder="Enter Your City "
              name="city"
              value={userData.city}
            ></Input>

            <Input
              onChange={setProfileHandler}
              type="text"
              label="Country"
              placeholder="Enter Your Country "
              name="country"
              value={userData.country}
            ></Input>

            <Input
              onChange={setProfileHandler}
              type="text"
              label="Phone Number"
              placeholder="Enter Your Mobile Number "
              name="phoneNumber"
              value={userData.mobileNumber}
            ></Input>

            <EditEmailModal
              show={isOpenModal}
              hide={setIsOpenModal}
              history={history}
            ></EditEmailModal>
            <Input
              onChange={setProfileHandler}
              type="text"
              label="Email Address"
              placeholder="email"
              value={userData.email}
              name="email"
              disabled={true}
            ></Input>

            <button
              onClick={() => setIsOpenModal(true)}
              className="btn btn-primary mb-2"
            >
              Change
            </button>
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
