import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({selectId, selectChange, options }) => {
  return (
    <div className="dropdown">
      <select id={selectId} onChange={selectChange}>
        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
              label={option.fullname}
            >
              {option.name}
            </option>
          );
        })}
      </select>
      {<FontAwesomeIcon icon={faCaretDown} />}
    </div>
  );
};
export default memo(Dropdown);
