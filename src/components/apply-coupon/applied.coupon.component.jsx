import React, { useState, useEffect } from "react";
import CouponHistory from "./coupon-history.component";
import ApplyCouponHeader from './apply-coupon.header';
import SideBar from './sidebar.conponent'
import { GetUserTransactions } from "../../service/common";
const Coupon = ({ history }) => {
  const [bookCounts, setBookCounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getCouponHistory();
  }, []);
  const getCouponHistory = async () => {
    const response = await GetUserTransactions();
    console.log(response.data);
    setTransactions(response.data.data.transactions);
    setBookCounts(response.data.data.booksCount);
  };
  return (
    <>
      <ApplyCouponHeader/>
      <div className="row">
        <SideBar/>
        <div className="col-md-10">
          <CouponHistory transactions={transactions} bookCounts={bookCounts} />
        </div>
      </div>
    </>
  );
};

export default Coupon;
