import React from "react";

import "./input.style.scss";

const FileSelect = ({ handleChange, list, label, ...restProps }) => {
  console.log(restProps);

  return (
    <div className="form-group">
      {label ? <label>{label}</label> : null}
      <select className="form-control" onChange={handleChange} {...restProps}>
        <option>Select</option>
        {list.map((e, key) => {
          return (
            <option key={key} value={e.id}>
              {e.fileName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const FileTagSelect= ({ handleChange, list, label, ...restProps }) => {
  console.log(restProps);

  return (
    <div className="form-group">
      {label ? <label>{label}</label> : null}
      <select className="form-control" onChange={handleChange} {...restProps}>
        <option>Select</option>
        {list.map((e, key) => {
          return (
            <option key={key} value={e.id}>
              {e.fileTag}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const UserSelect = ({ handleChange, list, label, ...restProps }) => {
  console.log(restProps);

  return (
    <div className="form-group">
      {label ? <label>{label}</label> : null}
      <select className="form-control" onChange={handleChange} {...restProps}>
        <option>Select</option>
        {list.map((e, key) => {
          return (
            <option key={key} value={e.id}>
              {e.fullname}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export { FileSelect, UserSelect, FileTagSelect };
