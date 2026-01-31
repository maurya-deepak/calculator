import React, { useEffect, useContext } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import BasicKeypad from "../Reusable/BasicKeypad";
import Dropdown from "../Reusable/DropdownWithInput";
import Context from "../store/Context";
import UpdatedStructure from "./UpdatedStructureHOC";

const optionsObj = [
  { name: "Tonne t", value: "t", fullname: "Tonne"},
  { name: "Kilogram kg", value: "kg", fullname: "Kilogram"},
  { name: "Gram g", value: "g", fullname: "Gram"},
  { name: "Milligram mg", value: "mg", fullname: "Milligram"},
  { name: "Microgram mcg", value: "ug", fullname: "Microgram"},
  { name: "Quintal q", value: "q", fullname: "Quintal"},
  { name: "Pound lb", value: "lb", fullname: "Pound"},
  { name: "Ounce oz", value: "oz", fullname: "Ounce"},
  { name: "Carat ct", value: "ct", fullname: "Carat"},
  { name: "Stone st", value: "st", fullname: "Stone"},
  { name: "Long ton l.t", value: "l.t", fullname: "Long ton"},
  { name: "Short ton s.t", value: "s.t", fullname: "Short ton"},
  { name: "UK hundredweight (long) l-cwt", value: "l-cwt", fullname: "UK hundredweight (long)"},
  { name: "US hundredweight (short) s-cwt", value: "s-cwt", fullname: "US hundredweight (short)"},
  { name: "Dram dr", value: "dr", fullname: "Dram"},
  { name: "Grain gr", value: "gr", fullname: "Grain"},
];

const Mass = (props) => {
  const { globalState, globalDispatch } = useContext(Context);

  // To reset global state to initial value
  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn name="Mass Converter" reset={props.reset} />
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

export default UpdatedStructure(Mass, "mass");
