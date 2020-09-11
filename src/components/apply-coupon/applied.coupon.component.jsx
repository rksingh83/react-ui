import React, { useState, useEffect } from "react";
import CouponHistory from "./coupon-history.component";
import ApplyCouponHeader from "./apply-coupon.header";
import SideBar from "./sidebar.conponent";
import { GetUserTransactions } from "../../service/common";
import CustomLoader from "../loader/loader";
const Coupon = ({ history }) => {
  const [bookCounts, setBookCounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [startLoader, setStartLoader] = useState(false);
  useEffect(() => {
    getCouponHistory();
  }, []);
  const getCouponHistory = async () => {
    setStartLoader(true)
    const response = await GetUserTransactions();
    setTransactions(response.data.data.transactions);
    setBookCounts(response.data.data.booksCount);
    setStartLoader(false)
  };
  return (
    <>
      <ApplyCouponHeader startLoader ={setStartLoader} />
      {startLoader && <CustomLoader />}
      <div className="row">
        <SideBar />
        <div className="col-md-10 mt-4">
          <CouponHistory transactions={transactions} bookCounts={bookCounts} />
        </div>
      </div>
    </>
  );
};

export default Coupon;
