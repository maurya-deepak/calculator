import React, { useEffect, useContext } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import BasicKeypad from "../Reusable/BasicKeypad";
import Dropdown from "../Reusable/DropdownWithInput";
import Context from "../store/Context";
import UpdatedStructure from "./UpdatedStructureHOC";

const optionsObj = [
  { name: "Light speed c", value: "c", fullname: "Light speed" },
  { name: "Mach ma", value: "ma", fullname: "Mach" },
  { name: "Kilometer per second km/s", value: "km/s", fullname: "Kilometer per second" },
  { name: "Meter per second m/s", value: "m/s", fullname: "Meter per second" },
  { name: "Kilometer per hour km/h", value: "km/h", fullname: "Kilometer per hour" },
  { name: "Mile per hour m/h", value: "m/h", fullname: "Mile per hour" },
  { name: "Knot kn", value: "kn", fullname: "Knot" },
  { name: "Foot per second ft/s", value: "ft/s", fullname: "Foot per second" },
  { name: "Inch per second in/s", value: "in/s", fullname: "Inch per second" },
];

const Speed = (props) => {
  const { globalState, globalDispatch } = useContext(Context);

  // To reset global state to initial value
  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn name="Speed Converter" reset={props.reset} />
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

export default UpdatedStructure(Speed, "speed");
