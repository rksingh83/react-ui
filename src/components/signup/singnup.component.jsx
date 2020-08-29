import React from "react";
import CustomButton from "../custom-button/custom-button.componenet";
import axios from "axios";
import Input from "../boostrapinput/input.component";
import { Post, Get } from "../../service/service.setup";
import ShowMessages from "../common/display-message-modal";
class SingnUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      cnfpass: "",
      phoneNumber: "",
      history: props.history,
      openPopUP: false,
      responseMgs: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, phoneNumber } = this.state;
    const user = { name, email, password, phoneNumber };

    Post("/registration", user).then((res) => {
      if (res.data.error) {
        this.setState({
          ...this.state,
          openPopUP: true,
          responseMgs: res.data.error,
        });
        //  alert(res.data.error);
      } else {
        this.state.history.push("/login");
      }
    });
  };
  ValidateInput = (user) => {};
  handlePopUP = () => {
    this.setState({ ...this.state, openPopUP: false });
  };
  render() {
    const { name, email, password, cnfpass, phoneNumber } = this.state;
    return (
      <div className="row mt-4">
        <div className="container">
          <div className="col col-md-6 col-lg-4 col-xs-10">
            <div className="card card-body bg-custom">
              <div className="sign-up">
                <ShowMessages
                  message={this.state.responseMgs}
                  hide={this.handlePopUP}
                  show={this.state.openPopUP}
                ></ShowMessages>
                <form onSubmit={this.handleSubmit}>
                  <Input
                    placeholder="Enter your Name"
                    label="Name"
                    value={name}
                    handleChange={this.handleChange}
                    name="name"
                    required
                    type="input"
                  ></Input>
                  <Input
                    placeholder="Enter your Email"
                    label="Email"
                    value={email}
                    handleChange={this.handleChange}
                    name="email"
                    type="input"
                  ></Input>
                  <Input
                    placeholder="Enter your phone number"
                    label="Phone"
                    value={phoneNumber}
                    handleChange={this.handleChange}
                    name="phoneNumber"
                    type="input"
                  ></Input>
                  <Input
                    placeholder="Enter password Name"
                    label="Password"
                    value={password}
                    handleChange={this.handleChange}
                    name="password"
                    type="password"
                  ></Input>
                  <Input
                    placeholder="Confirm your password"
                    label="Confirm Password"
                    value={cnfpass}
                    handleChange={this.handleChange}
                    name="cnfpass"
                    type="password"
                  ></Input>
                  <Input
                    label=""
                    value="SIGN UP"
                    className="btn btn-success btn-block"
                    onClick={this.handleSubmit}
                    name="cnfpass"
                    type="button"
                  ></Input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SingnUp;
