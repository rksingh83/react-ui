import React, { useState, useEffect } from "react";
import CouponHistory from "./coupon-history.component";
import ApplyCouponHeader from "./apply-coupon.header";
import SideBar from "./sidebar.conponent";
import { GetUserTransactions } from "../../service/common";
import CustomLoader from "../loader/loader";
import {
  getStartIndex,
  getPageCount,
  PAGE_OFF_SET,
} from "../common/pagination.config";
const Coupon = ({ history }) => {
  const [bookCounts, setBookCounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [startLoader, setStartLoader] = useState(false);
  const [leftCoupon, setLeftCoupon] = useState(0);
  const [transactionCurrentCount, setTransactionCurrentCount] = useState(1);
  const [AllTransactions, setAllTransactions] = useState([]);
  const [AllBooks, setAllBooks] = useState([]);
  const [bookPaginationCount, setBookPaginationCurrentCount] = useState(1);
  useEffect(() => {
    getCouponHistory();
  }, []);
  const getCouponHistory = async () => {
    setStartLoader(true);
    const response = await GetUserTransactions();
    //setTransactions(response.data.data.transactions);
    setAllTransactions([...response.data.data.transactions]);
    setTransactions(response.data.data.transactions.splice(0, PAGE_OFF_SET));
    setAllBooks([...response.data.data.booksCount]);
    setBookCounts(response.data.data.booksCount.splice(0, PAGE_OFF_SET));
    setStartLoader(false);
    setLeftCoupon(response.data.pagesLeft);
  };

  const setCurrentSelected = (number) => {
    const allTrx = [...AllTransactions];
    setTransactions(allTrx.splice(getStartIndex(number), PAGE_OFF_SET));
    setTransactionCurrentCount(number);
  };
  // for books pagination ;
  const setCurrentSelectedBooks = (number) => {
    const allBooks = [...AllBooks];
    setBookCounts(allBooks.splice(getStartIndex(number), PAGE_OFF_SET));
    setBookPaginationCurrentCount(number);
  };

  const bookNextPrev = (type) => {
    if (type === "NEXT") {
      if (bookPaginationCount == getPageCount(AllBooks)) return;
      setCurrentSelectedBooks(bookPaginationCount + 1);
    } else {
      if (bookPaginationCount == 1) return;
      setCurrentSelectedBooks(bookPaginationCount - 1);
    }
  };
  

  const transactionNextPrev = (type) => {
    if (type === "NEXT") {
      if (transactionCurrentCount == getPageCount(AllTransactions)) return;
      setCurrentSelectedBooks(transactionCurrentCount + 1);
    } else {
      if (transactionCurrentCount == 1) return;
      setCurrentSelectedBooks(transactionCurrentCount - 1);
    }
  };

  return (
    <>
      <ApplyCouponHeader getCouponHistory ={getCouponHistory} leftCoupon={leftCoupon} startLoader={setStartLoader} />
      {startLoader && <CustomLoader />}
      <div className="row">
        <SideBar />
        <div className="col-md-10 mt-4">
          <CouponHistory
            txnCount={getPageCount(AllTransactions)}
            transactions={transactions}
            bookCounts={bookCounts}
            txnCurrentCount={transactionCurrentCount}
            bookPaginationCount={bookPaginationCount}
            setCurrentSelected={setCurrentSelected}
            bookCount={getPageCount(AllBooks)}
            setCurrentSelectedBooks={setCurrentSelectedBooks}
            bookNextPrev={bookNextPrev}
            transactionNextPrev={transactionNextPrev}
          />
        </div>
      </div>
    </>
  );
};

export default Coupon;
