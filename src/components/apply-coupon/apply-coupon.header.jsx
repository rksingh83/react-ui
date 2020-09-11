import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AddCoupon } from "../../service/common";
const ApplyCouponHeader = ({ startLoader, leftCoupon }) => {
  const [coupon, setCoupon] = useState("");
  const INPUT_FIELDS = { error: false, message: "" };
  const [isError, setError] = useState(INPUT_FIELDS);
  const saveCouponHandler = async () => {
    if (coupon == "") {
      setError({ error: true });
      return;
    }
    startLoader(true);
    const res = await AddCoupon(coupon);
    if (res.data) {
      alert(res.data.message);
    }
    setCoupon("");
    startLoader(false);
  };
  const setCouponInput = (value) => {
    setCoupon(value);
    setError(INPUT_FIELDS);
  };
  return (
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
          <div className="col-md-2"></div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  center-item">
              <li className="nav-item">
                <TextField
                  value={coupon}
                  onChange={(e) => setCouponInput(e.target.value)}
                  id="outlined-basic"
                  label="Enter Coupon"
                  fullWidth
                  name="currentPassword"
                  variant="outlined"
                  name="currentPassword"
                  size="small"
                  required
                  error={isError.error}
                  helperText={isError.message}
                />
              </li>
              <li className="nav-item">
                <Button
                  onClick={saveCouponHandler}
                  variant="contained"
                  color="secondary"
                  mt={3}
                  className="ml-2"
                  size="small"
                >
                  Apply Coupon
                </Button>
              </li>
              <li>
                <span className="ml-3">
                  Total Page Upload Limit <span className="badge badge-info">{leftCoupon}</span>
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ApplyCouponHeader;
