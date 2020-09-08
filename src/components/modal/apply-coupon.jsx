import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { AddCoupon } from "../../service/common";
import ShowMessages from "../common/display-message-modal";
const ApplyCoupon = ({ history, show, hide, email }) => {
  const [coupon, setCoupon] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [resMgs, setResMgs] = useState("");
  const closeHandler = () => {
    hide(false);
    setCoupon("");
  };
  const saveCouponHandler = async () => {
    const res = await AddCoupon(coupon);
    if (res.data) {
      alert(res.data.message);
    }

    closeHandler();
  };

  return (
    <Modal size="md" show={show} onHide={() => hide(false)} animation={true}>
      <Modal.Body>
        <ShowMessages
          hide={() => setIsAlert(false)}
          message={resMgs}
          show={isAlert}
        />
        {/* <div className="item-center">{startLoader && <CircularProgress />}</div> */}
        <Cross
          className="mb-2 ml-auto"
          variant="secondary"
          onClick={closeHandler}
        ></Cross>

        <ul>
          <li>
            <TextField
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              id="outlined-basic"
              label="Enter Coupon"
              fullWidth
              name="currentPassword"
              variant="outlined"
              name="currentPassword"
            />
          </li>
          <li className="mt-2">
            <Button
              onClick={saveCouponHandler}
              variant="contained"
              color="secondary"
              mt={3}
            >
              Apply Coupon
            </Button>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
export default ApplyCoupon;
