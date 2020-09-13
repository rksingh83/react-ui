import React from "react";

const Paginate = ({ count, active, setCurrentSelected, ...props }) => {
  const numbers = [];
  for (let i = 1; i <= count; i++) {
    numbers.push(
      <li key={i} className={`page-item ${active == i ? "active" : ""}`}>
        <a onClick={() => setCurrentSelected(i)} className="page-link">
          {i}
        </a>
      </li>
    );
  }
  return (
    <nav aria-label="Page navigation example" style={{ marginTop: "1rem" }}>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" onClick={() => props.NextPrev("PREV")}>
            Previous
          </a>
        </li>
        {numbers}
        <li className="page-item">
          <a className="page-link" onClick={() => props.NextPrev("NEXT")}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginate;
