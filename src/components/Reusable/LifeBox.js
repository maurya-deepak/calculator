import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LifeBox({ id, change, name, icon }) {
  return (
    <div className="box" id={id} onClick={change}>
      <FontAwesomeIcon icon={icon} />
      <p>{name}</p>
    </div>
  );
}
