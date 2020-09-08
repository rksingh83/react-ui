import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ChangePassword } from "../../service/sharefiles";
const UpdatePassword = ({ history, show, hide ,email }) => {
  const [searchUserId, setSearchUserId] = useState("");
  const [emailInput, setEmailInput] = useState(false);
  const [otp, setOTP] = useState("");
  const [startLoader, setStartLoader] = useState(false);
  const [inputs, setInputs] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    let currentInput = { ...inputs };
    currentInput[name] = value;
    setInputs(currentInput);
    console.log();
  };
  const closeHandler = () => {
    setInputs({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
    hide(false);
  };
  const updatePasswordHandler = async () => {
    
    const response = await ChangePassword(email ,inputs.password);
    console.log(response)
  };
  return (
    <Modal size="md" show={show} onHide={() => hide(false)} animation={true}>
      <Modal.Body>
        <div className="item-center">{startLoader && <CircularProgress />}</div>
        <Cross
          className="mb-2 ml-auto"
          variant="secondary"
          onClick={closeHandler}
        ></Cross>

        <ul>
          <li>
            <TextField
              value={searchUserId}
              onChange={inputHandler}
              id="outlined-basic"
              label="Current Password"
              fullWidth
              name="currentPassword"
              variant="outlined"
              name="currentPassword"
              value={inputs.currentPassword}
            />
          </li>
          <li className="mt-2">
            <TextField
              value={otp}
              onChange={inputHandler}
              id="outlined-basic"
              label="New Password"
              fullWidth
              variant="outlined"
              name="password"
              mt={3}
              value={inputs.password}
            />
          </li>
          <li className="mt-2">
            <TextField
              value={otp}
              onChange={inputHandler}
              id="outlined-basic"
              label="Confirm New Password"
              fullWidth
              variant="outlined"
              name="confirmPassword"
              name="confirmPassword"
              value={inputs.confirmPassword}
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
