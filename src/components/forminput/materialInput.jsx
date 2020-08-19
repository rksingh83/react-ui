import React from "react";
import TextField from "@material-ui/core/TextField";

const MaterialInput = ({ handleChange, label, ...restProps }) => {
  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        onChange={handleChange}
        id="outlined-basic"
        {...restProps}
      />
    </>
  );
};

export default MaterialInput;
