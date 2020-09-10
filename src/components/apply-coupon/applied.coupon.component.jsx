import React, { useState, useEffect } from "react";
import CouponHistory from "./coupon-history.component";
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
      <div>SecondaryHeader</div>
      <div className="row">
        <div className="col-md-2">SIDEBAR</div>
        <div className="col-md-10">
          <CouponHistory transactions={transactions} bookCounts={bookCounts} />
        </div>
      </div>
    </>
  );
};

export default Coupon;
