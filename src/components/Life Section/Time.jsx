import React, { useEffect, useContext } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import BasicKeypad from "../Reusable/BasicKeypad";
import Dropdown from "../Reusable/DropdownWithInput";
import Context from "../store/Context";
import UpdatedStructure from "./UpdatedStructureHOC";

const optionsObj = [
  { name: "Year y", value: "y", fullname: "Year" },
  { name: "Month m", value: "m", fullname: "Month" },
  { name: "Week wk", value: "wk", fullname: "Week" },
  { name: "Day d", value: "d", fullname: "Day" },
  { name: "Hour h", value: "h", fullname: "Hour" },
  { name: "Minute min", value: "min", fullname: "Minute" },
  { name: "Second s", value: "s", fullname: "Second" },
  { name: "Millisecond ms", value: "ms", fullname: "Millisecond" },
  { name: "Microsecond mu", value: "mu", fullname: "Microsecond" },
  { name: "Nanosecond ns", value: "ns", fullname: "Nanosecond" },
  { name: "Picosecond ps", value: "ps", fullname: "Picosecond" },
];

const Time = (props) => {
  const { globalState, globalDispatch } = useContext(Context);

  // To reset global state to initial value
  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn name="Time Converter" reset={props.reset} />
      <div className="contentSection">
        <Dropdown
          selectChange={props.selectChange}
          selectId="item1"
          spanId="1"
          options={optionsObj}
          inputValue={globalState.firstInput}
          classname="current"
          selectedName={props.selectedFirst}
        />
        <Dropdown
          selectChange={props.selectChange}
          selectId="item2"
          spanId="2"
          options={optionsObj}
          inputValue={globalState.secondInput}
          classname=""
          selectedName={props.selectedSecond}
        />
      </div>
      <div className="keypad_section">
        <BasicKeypad onClick={props.btnClicked} />
      </div>
    </div>
  );
};

export default UpdatedStructure(Time, "time");
