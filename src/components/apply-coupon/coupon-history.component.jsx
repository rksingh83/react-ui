import React from "react";
import DisplayTable from "./display-table.component";
import Paginate from "../common/paginate";
const getDataTime = (timeStamp) => {
  let date = timeStamp.split("T");
  return `${date[0]} ${date[1]}`;
};
const CouponHistory = ({ txnCount, transactions, bookCounts, ...props }) => (
  <div className="row">
    <div className="col-md-6">
      <h6>Coupon Transaction</h6>
      <DisplayTable
        heads={["Coupon Name", "Date", "Page Credited", "Cumulative Sum"]}
      >
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.token}</td>
            <td>{getDataTime(transaction.createDateTime)}</td>
            <td>{transaction.page}</td>
            <td>{transaction.totalPage}</td>
          </tr>
        ))}
      </DisplayTable>
      <Paginate
        setCurrentSelected={props.setCurrentSelected}
        active={props.txnCurrentCount}
        count={txnCount}
        NextPrev ={props.transactionNextPrev}
      />
    </div>
    <div className="col-md-1 center-item">
      <div className="border-custom"></div>
    </div>
    <div className="col-md-5">
      <h6>Books Details</h6>
      <DisplayTable heads={["Book Name", "Total Pages", "Latest Upload Date"]}>
        {bookCounts.map((book, index) => (
          <tr key={`${book.bookName}_${index}`}>
            <td>{book.bookName}</td>
            <td>{book.totalPage}</td>
            <td>{book.updatedDateTime}</td>
          </tr>
        ))}
      </DisplayTable>
      <Paginate
        setCurrentSelected={props.setCurrentSelectedBooks}
        active={props.bookPaginationCount}
        count={props.bookCount}
        NextPrev ={props.bookNextPrev}
      />
    </div>
  </div>
);

export default CouponHistory;
