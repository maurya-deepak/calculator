import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Box = ({ id, change, name, icon }) =>{
  
  return (
    <div className="box" id={id} onClick={change}>
      <FontAwesomeIcon icon={icon} id="box-icon" />
      <p>{name}</p>
    </div>
  );
}
export default Box;