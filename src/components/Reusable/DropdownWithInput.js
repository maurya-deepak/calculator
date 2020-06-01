import React, { memo } from "react";
import DropdownInput from "./DropdownInput";
import DropDown from "./Dropdown";

const DropdownWithInput = ({
  selectChange,
  selectId,
  spanId,
  options,
  inputValue,
  classname,
  selectedName,
  change,
}) => {
  return (
    <div className="itemsWrapper">
      <div className="items">
        <DropDown
          selectId={selectId}
          selectChange={selectChange}
          options={options}
        />
        <DropdownInput
          spanId={spanId}
          classname={classname}
          change={change}
          inputValue={inputValue}
        />
      </div>
      <p id="selected-subtitle">{selectedName}</p>
    </div>
  );
};

export default memo(DropdownWithInput);
