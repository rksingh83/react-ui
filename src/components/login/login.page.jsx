import React, { useState } from "react";
import Login from "./login.component";
import SignUp from "../signup/singnup.component";
import Input from "../boostrapinput/input.component";

import { Post, Get } from "../../service/service.setup";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { setCurrentFile } from "../../redux/file/file.actions";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./lon.style.scss";

const LoginPage = ({ history, setCurrentUser, setCurrentFile }) => {
  // console.log(props)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = (e) => {
    e.preventDefault();
    Post("/signin", { email, password }).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        const code = res.data.code;

        if (code == "411") {
          //  let  history = useHistory();
          Cookies.set("token", res.data.data.authentication.token);
          history.push("/otp");
        }
        if (code == "200") {
          // let  history = useHistory();
          Cookies.set("token", res.data.data.authentication.token);
          const requestFile = { filefolderRequest: [] };
          setCurrentUser(res.data.data);
          Post("/getAllFiles", requestFile).then((res) => {
            if(res.data.code==201){
                 alert(res.data.error);
               history.push('/logout');
             }
            if (res.data.filefolderRequest) {
              //  let data =  (res.data.filefolderRequest).map(item=>item.fileName)
              setCurrentFile(res.data.filefolderRequest);
              history.push("/folder");
            }
          });
        }
        if (code == 401) {
          alert("User Not Found");
        }

        // Cookies.set('token', res.data.data.authentication.token)
        // this.state.history.push("/login");
      }
    });
  };
  return (
    <>
    <div className ="row" style ={{justifyContent:"center"}}>
    <div className="row logo-div" style ={{justifyContent:"center"}}>
          <img  style ={{height:"75px" ,marginTop:"10px"}}src= {require('../../assets/logo.png')}></img>
        </div>
    </div>
    <div className="row mt-4">
      <ToastContainer />
      
      <div className="container">
        
        <div className="col col-md-6 col-lg-4 col-xs-10">
          <div>
            <div className="card card-body bg-custom">
              <div className="sign-up">
                <form onSubmit={loginHandler}>
                  <Input
                    placeholder="Enter your Email"
                    label="Email"
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                    name="email"
                    required
                    type="input"
                  ></Input>
                  <Input
                    placeholder="Enter your password"
                    label="Password"
                    value={password}
                    handleChange={(e) => setPassword(e.target.value)}
                    name="email"
                    type="password"
                  ></Input>
                  <Input
                    label=""
                    value="LOGIN"
                    className="btn btn-success btn-block"
                    onClick={loginHandler}
                    name="cnfpass"
                    type="submit"
                  ></Input>

                  <Link to="/signup">
                    <button className="btn btn-success btn-block mt-3">
                      SIGNUP
                    </button>
                  </Link>
                  <Link to="/forgot">
                    <button className="btn btn-success btn-block mt-3">
                      FORGOT PASSWORD
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setCurrentFile: (currentFile) => dispatch(setCurrentFile(currentFile)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
