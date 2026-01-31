import React, { useEffect, useContext } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import BasicKeypad from "../Reusable/BasicKeypad";
import Dropdown from "../Reusable/DropdownWithInput";
import Context from "../store/Context";
import UpdatedStructure from "./UpdatedStructureHOC";

const optionsObj = [
  { name: "Bit b", value: "b", fullname: "Bit" },
  { name: "Kilobit Kb", value: "Kb", fullname: "Kilobit" },
  { name: "Megabit Mb", value: "Mb", fullname: "Megabit" },
  { name: "Gigabit Gb", value: "Gb", fullname: "Gigabit" },
  { name: "Terabit Tb", value: "Tb", fullname: "Terabit" },
  { name: "Byte B", value: "B", fullname: "Byte" },
  { name: "Kilobyte KB", value: "KB", fullname: "Kilobyte" },
  { name: "Megabyte MB", value: "MB", fullname: "Megabyte" },
  { name: "Gigabyte GB", value: "GB", fullname: "Gigabyte" },
  { name: "Terabyte TB", value: "TB", fullname: "Terabyte" },
];

const BitBytes = (props) => {
  const { globalState, globalDispatch } = useContext(Context);

  // To reset global state to initial value
  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn name="Digital Converter" reset={props.reset} />
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

export default UpdatedStructure(BitBytes, "bits_bytes");
