import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomLoader from "../loader/loader";
import TextField from "@material-ui/core/TextField";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ChangePassword } from "../../service/sharefiles";
const UpdatePassword = ({ show, hide }) => {
  const [startLoader, setStartLoader] = useState(false);
  const FORM_BASE = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };
  const [inputs, setInputs] = useState(FORM_BASE);
  const [errorMgs, setErrorMgs] = useState(FORM_BASE);
  const [error, setError] = useState({
    currentPassword: false,
    password: false,
    confirmPassword: false,
  });
  const errorMessages = {
    currentPassword: "Current password required",
    password: " New password required",
    confirmPassword: "Confirm password",
  };
const inputHight  = {height:"1rem"}
  const inputHandler = (e) => {
    const tempError = {};
    const tempErrorMgs = {};
    const { name, value } = e.target;
    let currentInput = { ...inputs };
    currentInput[name] = value;
    setInputs(currentInput);
    tempError[name] = false;
    tempErrorMgs[name] = "";
    setError(tempError);
    setErrorMgs(tempErrorMgs);
  };
  const closeHandler = () => {
    setInputs({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
    hide(false);
    setErrorMgs(FORM_BASE);
    setInputs(FORM_BASE);
    setError({
      currentPassword: false,
      password: false,
      confirmPassword: false,
    });
  };

  const updatePasswordHandler = async () => {
    setStartLoader(true);
    if (
      inputs.currentPassword == "" ||
      inputs.password == "" ||
      inputs.confirmPassword == ""
    ) {
      const tempError = {};
      const tempErrorMgs = {};
      Object.keys(inputs).map((key) => {
        if (inputs[key] == "") {
          tempError[key] = true;
          tempErrorMgs[key] = errorMessages[key];
        }
      });
      setError(tempError);
      setErrorMgs(tempErrorMgs);
      // closeHandler()
      setStartLoader(false);
      return false;
    }
    if (inputs.password != inputs.confirmPassword) {
      setError({ ...error, password: true, confirmPassword: true });
      setErrorMgs({ ...errorMgs, confirmPassword: "Passwords do not match" });
      setStartLoader(false);
      return false;
    }
    // CHECK NEW AND CONFIRM PASSWORD IS SAME

    const response = await ChangePassword(
      inputs.currentPassword,
      inputs.password
    );
    setStartLoader(false);
    response && alert(response.data.message);

    closeHandler();
  };
  return (
    <Modal size="md" show={show} onHide={() => hide(false)} animation={true}>
      <Modal.Body>
        <div className="item-center">{startLoader && <CustomLoader />}</div>
        <Cross
          className="mb-2 ml-auto"
          variant="secondary"
          onClick={closeHandler}
        ></Cross>

        <ul>
          <li>
            <TextField
              onChange={inputHandler}
              id="outlined-basic"
              label="Current Password"
              fullWidth
              name="currentPassword"
              variant="outlined"
              name="currentPassword"
              value={inputs.currentPassword}
              autoComplete="off"
              type="password"
              required
              error={error.currentPassword}
              helperText={errorMgs.currentPassword}
          
            />
          </li>
          <li className="mt-2">
            <TextField
              onChange={inputHandler}
              id="outlined-basic"
              label="New Password"
              fullWidth
              variant="outlined"
              name="password"
              mt={3}
              value={inputs.password}
              autoComplete="off"
              type="password"
              error={error.password}
              helperText={errorMgs.password}
              required
        
            />
          </li>
          <li className="mt-2">
            <TextField
              onChange={inputHandler}
              id="outlined-basic"
              label="Confirm New Password"
              fullWidth
              variant="outlined"
              name="confirmPassword"
              name="confirmPassword"
              value={inputs.confirmPassword}
              autoComplete="off"
              type="password"
              helperText={errorMgs.confirmPassword}
              error={error.confirmPassword}
              required
              mt={3}
            />
          </li>
          <li className="mt-2">
            <Button
              onClick={updatePasswordHandler}
              variant="contained"
              color="secondary"
              mt={3}
            >
              Save
            </Button>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
export default UpdatePassword;
