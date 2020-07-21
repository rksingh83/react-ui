import React, { useEffect, useState } from "react";

import { Get , Post } from "../../service/service.setup";
import "./add-friend.style.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";
import { Link } from "react-router-dom";
import Input from "../boostrapinput/input.component";
import UserData from "../profile/display.user.data";
const AddFriend = ({ history }) => {
  
 const [user ,setUser] = useState(null);
 const [userProfile ,setUserProfile] = useState({});
  const styleImage = {
    width: "100%",
    height: "100%",
    marginTop: "10px",
  };
  const crossStyle = {
    width: "4rem",
    height: "2rem",
  };
  const pencilStyle = {
    width: "4rem",
    height: "2rem",
  };
  const searchUserHandler = async()=>{
      try{
      if(!user){
        alert("Please enter Email or User Id");
        return ;
      }
     const userFind =  await Post('/searchUser',{unique_user_id:user});
     console.log(userFind.data)
     if(userFind.data.code =='203'){
      setUser('');
       alert(userFind.data.message);
      
       return ;
     }
     setUserProfile(userFind.data.data.profile)
      }catch(e){
        alert("Something went wrong try latter")
        history.goBack()
      }
  }

  const addUserHandler = async()=>{
    try{
   const userFind =  await Post('/addUser',{id:userProfile.id});
   console.log(userFind)
   if(userFind.data.code =='200'){
     alert(userFind.data.message);
     window.location.reload();
     return ;
   }
   setUserProfile(userFind.data.data.profile)
    }catch(e){
      alert("Something went wrong try latter")
      history.goBack()
     
    }
}
  return (
    <>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto text-white">
               
                <li className="nav-item">
                  <Cross
                    onClick={() => history.goBack()}
                    style={crossStyle}
                  ></Cross>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-success"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className=" custom-pad-li d-none d-sm-block col-md-2 p-0">
          <Link className="logo-container" to="/">
            <ul className=" ul-pad list-group left-side-bar">
              <li className="custom-pad-li list-group-item active">Home</li>
            </ul>
          </Link>
        </div>
        <div className="col-md-9 col-xs-12 col-sm-12">
          <div className ='row'>
            <div className ='col-md-8'>
        <Input type ='text' onChange = {(e)=>setUser(e.target.value)} label ='Search' placeholder ='Search by email or user id'></Input>
        </div>
        <div className ='col-md-4 serach-user-div'>
        <button  onClick  ={searchUserHandler} type ='button' className ='btn btn-success mt-3'>Search</button>
        </div>
        </div>
        <div className ='' style = {{display :(Object.keys(userProfile).length==0)?'none':''}}>
          <button onClick = {addUserHandler} className ='btn btn-success mb-2'>Add Friend</button>
        <UserData profile={userProfile}></UserData>
        </div>
        </div>
      </div>
    </>
  );
};
export default AddFriend;
