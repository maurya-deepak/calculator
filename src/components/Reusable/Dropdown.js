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
  selectedName,
}) => {
  return (
    <div>
      <div className="items">
        <div>
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
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        <span id={spanId} className={classname} onClick={ChangeSelectedInput}>
          {inputValue}
        </span>
      </div>
      <p id="selected-subtitle">{selectedName}</p>
    </div>
  );
};

export default Dropdown;
