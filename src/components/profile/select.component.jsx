import React from "react";


import "./input.style.scss";

const Select = ({ handleChange, list, label, ...restProps }) => {
  return (
    <div className="form-group">
      {label ? <label>{label}</label> : null}
      <select className="form-control" onChange={handleChange} {...restProps}>
        <option>Select</option>
        {(list.map((item) => <option value={item.id}>{item.name}</option>))}
      </select>
    </div>
  );
};

export default Select;
