import React from "react";
import DisplayTable from "./display-table.component";
const CouponHistory = ({ transactions, bookCounts }) => (
  <div className ="row">
    <div className="col-md-6">
      <DisplayTable heads={["Coupon Name", "Date", "Count"]}>
        {transactions.map((transaction ,index) => (
          <tr key ={index}>
            <td>{transaction.token}</td>
            <td>{transaction.createDateTime}</td>
            <td>{transaction.page}</td>
          </tr>
        ))}
      </DisplayTable>
    </div>
    <div className="col-md-6">
      <DisplayTable heads={["Book Name", "Count"]}>
      {bookCounts.map((book ,index) => (
          <tr key ={`${book.bookName}_${index}`}>
            <td>{book.bookName}</td>
            <td>{book.totalPage}</td>
         
          </tr>
        ))}
      </DisplayTable>
    </div>
  </div>
);

export default CouponHistory;
