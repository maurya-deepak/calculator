import React, { useEffect, useContext } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import BasicKeypad from "../Reusable/BasicKeypad";
import Dropdown from "../Reusable/DropdownWithInput";
import Context from "../store/Context";
import UpdatedStructure from "./UpdatedStructureHOC";

const optionsObj = [
  { name: "Square kilometer km2", value: "km2", fullname: "Square kilometer" },
  { name: "Square meter m2", value: "m2", fullname: "Square meter" },
  { name: "Square decimeter dm2", value: "dm2", fullname: "Square decimeter" },
  {
    name: "Square centimeter cm2",
    value: "cm2",
    fullname: "Square centimeter",
  },
  {
    name: "Square millimeter mm2",
    value: "mm2",
    fullname: "Square millimeter",
  },
  { name: "Square micron um2", value: "um2", fullname: "Square micron" },
  { name: "Hectare ha", value: "ha", fullname: "Hectare" },
  { name: "Square mile mi2", value: "mi2", fullname: "Square mile" },
  { name: "Square foot ft2", value: "ft2", fullname: "Square foot" },
  { name: "Square inch in2", value: "in2", fullname: "Square inch" },
  { name: "Square yard yd2", value: "yd2", fullname: "Square yard" },
  { name: "Acre", value: "ac", fullname: "Acre" },
];

const Area = (props) => {
  const { globalState, globalDispatch } = useContext(Context);

  // To reset global state to initial value
  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn name="Area Converter" reset={props.reset} />
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

export default UpdatedStructure(Area, "area");
