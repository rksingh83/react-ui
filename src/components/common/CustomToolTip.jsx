 import React from 'react'
 import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
 const CustomToolTip = ({children ,text}) => {
     return (
        <OverlayTrigger
        key="top"
        placement="top"
        overlay={
          <Tooltip id="tooltip-top">
            <strong>{text}</strong>.
          </Tooltip>
        }
      >
       {children}
      </OverlayTrigger>
     )
 }
 
 export default CustomToolTip
 