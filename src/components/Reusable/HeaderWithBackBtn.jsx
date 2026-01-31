import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const HeaderWithBackBtn = ({ reset, name }) => {
  return (
    <div className="header">
      <button className="back-btn" onClick={reset}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <p>{name}</p>
    </div>
  );
};

export default memo(HeaderWithBackBtn);
