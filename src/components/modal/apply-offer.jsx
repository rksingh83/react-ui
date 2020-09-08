import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ChangePassword } from "../../service/sharefiles";
const ApplyCoupon = ({ history, show, hide, email }) => {
  const [coupon, setCoupon] = useState("");

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
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              id="outlined-basic"
              label="Enter Coupon"
              fullWidth
              name="coupon"
              variant="outlined"
            />
          </li>
          <li className="mt-2">
            <Button onClick={} variant="contained" color="secondary" mt={3}>
              Apply
            </Button>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
export default ApplyCoupon;
