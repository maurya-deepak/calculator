import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import ChangeSelectedInput from "./ChangeSelectedInput";

const Dropdown = ({
  selectChange,
  selectId,
  spanId,
  options,
  inputValue,
  classname,
}) => {
  return (
    <div className="items">
      <div>
        <select id={selectId} onChange={selectChange}>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      <span id={spanId} className={classname} onClick={ChangeSelectedInput}>
        {inputValue}
      </span>
    </div>
  );
};

export default Dropdown;
