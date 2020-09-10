import React from "react";

const DisplayTable = ({ heads, children }) => (
  <table className="table">
    <thead>
      <tr>
        {heads.map((head, index) => (
          <th key={index} scope="col">
            {head}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);
export default DisplayTable;
