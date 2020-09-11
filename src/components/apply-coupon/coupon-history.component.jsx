import React from "react";
import DisplayTable from "./display-table.component";

const getDataTime = (timeStamp) => {
  let date = timeStamp.split("T");
  return `${date[0]} ${date[1]}`;
};
const CouponHistory = ({ transactions, bookCounts }) => (
  <div className="row">
    <div className="col-md-6">
      <h6>Coupon Transaction</h6>
      <DisplayTable
        heads={["Coupon Name", "Date", "Page Credited", "Page Balance"]}
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
    </div>
    <div className="col-md-6">
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
    </div>
  </div>
);

export default CouponHistory;
