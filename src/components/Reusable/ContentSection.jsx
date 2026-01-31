import React from "react";
import ChangeSelectedInput from "../Reusable/ChangeSelectedInput";

export default function ContentSection({
  name1,
  name2,
  name3,
  value1,
  value2,
  value3,
}) {
  return (
    <div className="content_section_1">
      <div className="items">
        <span>{name1}</span>
        <span
          name={name1}
          id="1"
          onClick={ChangeSelectedInput}
          className="current"
        >
          {value1}
        </span>
      </div>
      <div className="items">
        <span>{name2}</span>
        <span name={name2} id="2" onClick={ChangeSelectedInput}>
          {value2}
        </span>
      </div>
      <div className="items">
        <span>{name3}</span>
        <span id="no-curPointer">{value3}</span>
      </div>
    </div>
  );
}
