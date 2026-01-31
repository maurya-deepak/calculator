import React, { useEffect, useContext } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import BasicKeypad from "../Reusable/BasicKeypad";
import Dropdown from "../Reusable/DropdownWithInput";
import Context from "../store/Context";
import UpdatedStructure from "./UpdatedStructureHOC";

const optionsObj = [
  { name: "Cubic meter m3", value: "m3", fullname: "Cubic meter" },
  { name: "Cubic decimeter dm3", value: "dm3", fullname: "Cubic decimeter" },
  { name: "Cubic centimeter cm3", value: "cm3", fullname: "Cubic centimeter" },
  { name: "Cubic millimeter mm3", value: "mm3", fullname: "Cubic millimeter" },
  { name: "Hectoliter hl", value: "hl", fullname: "Hectoliter" },
  { name: "Liter l", value: "l", fullname: "Liter" },
  { name: "Deciliter dl", value: "dl", fullname: "Deciliter" },
  { name: "Centiliter cl", value: "cl", fullname: "Centiliter" },
  { name: "Milliliter ml", value: "ml", fullname: "Milliliter" },
];

const Volume = (props) => {
  const { globalState, globalDispatch } = useContext(Context);

  // To reset global state to initial value
  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn name="Volume Converter" reset={props.reset} />
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

export default UpdatedStructure(Volume, "volume");
