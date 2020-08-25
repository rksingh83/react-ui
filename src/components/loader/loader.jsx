import React, { useState } from "react";

import "./loader.style.scss";

const CustomLoader = () => (
  <div className="loader-main">
    <div className="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
export default CustomLoader;
