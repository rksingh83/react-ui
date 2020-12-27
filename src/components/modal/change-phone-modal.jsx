import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { sendOTPToEmail, EmailVerification } from "../../service/sharefiles";
const EditPhoneModal = ({ history, show, hide }) => {
  const [searchUserId, setSearchUserId] = useState("");
  const [emailInput, setEmailInput] = useState(false);
  const [otp, setOTP] = useState("");
  const [startLoader, setStartLoader] = useState(false);

  async function senOTP() {
    try {
      setStartLoader(true);
      const result = await sendOTPToEmail(searchUserId);
      if (result.data.code == "411") {
        alert(result.data.message);
        // setStartLoader(false);
        setEmailInput(true);
      }
      setStartLoader(false);
    } catch (error) {
      setStartLoader(false);
    }
  }

  const EmailVerificationHandler = async () => {
    const result = await EmailVerification(searchUserId, otp);
    if (result.data.code == "405") {
      alert(result.data.error);
      history.push("/logout");
      return;
    }
    if (result.data.code == "200") {
      alert(result.data.error);
      history.push("/logout");
      return;
    }
    
  };
  useEffect(() => {
    //getFriendList();
    //    getContactRequest();
  }, []);
  return (
    <Modal size="md" show={show} onHide={() => hide(false)} animation={true}>
      <Modal.Header>
        <button onClick={senOTP} className="btn btn-success">
          Send OTP
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="item-center">{startLoader && <CircularProgress />}</div>
        {!startLoader && (
          <ul>
            <li>
              <TextField
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
                id="outlined-basic"
                label="Enter Pone"
                fullWidth
                variant="outlined"
                disabled={emailInput}
              />
            </li>
            {emailInput && (
              <li className="mt-2">
                <TextField
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  id="outlined-basic"
                  label="Enter OTP"
                  fullWidth
                  variant="outlined"
                  mt={3}
                />
              </li>
            )}
            {emailInput && (
              <li className="mt-2">
                <Button
                  onClick={EmailVerificationHandler}
                  variant="contained"
                  color="secondary"
                  mt={3}
                >
                  Verify OTP
                </Button>
              </li>
            )}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn-danger btn"
          variant="secondary"
          onClick={() => hide(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default EditPhoneModal;
