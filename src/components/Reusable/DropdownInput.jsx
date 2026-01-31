import React from "react";
import ChangeSelectedInput from "./ChangeSelectedInput";

export default function DropdownInput({
  spanId,
  classname,
  change,
  inputValue,
}) {
  return (
    <>
      <span
        id={spanId}
        className={classname}
        onClick={(e) => ChangeSelectedInput(e, change)}
      >
        {inputValue}
      </span>
    </>
  );
}
