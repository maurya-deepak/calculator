import React, { useState, useCallback, useEffect, useContext } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import NumberSystemKeypad from "./NumberSystemKeypad";
import Dropdown from "../Reusable/DropdownWithInput";
import Context from "../store/Context";
import numeralSystem from "../../utils/definitions/numeralSystem";

const optionsObj = [
  { name: "Decimal DEC", value: "DEC", fullname: "Decimal" },
  { name: "Binary BIN", value: "BIN", fullname: "Binary" },
  { name: "Octal OCT", value: "OCT", fullname: "Octal" },
  { name: "Hexadecimal HEX", value: "HEX", fullname: "Hexadecimal" },
];

const NumeralSystem = (props) => {
  const { globalState, globalDispatch } = useContext(Context);

  const [selected, setSelected] = useState(false);
  const [selectedFirst, setSelectedFirst] = useState("Decimal");
  const [selectedSecond, setSelectedSecond] = useState("Decimal");
  const [disableHexbtn, setDisableHexbtn] = useState(true);
  const [disable_89_btn, setDisable_89_btn] = useState(false);
  const [disable_all_E01, setDisable_all_E01] = useState(false);

  const selectChange = useCallback(
    (event) => {
      const current = document.querySelector(".current");
      if (
        current.id === "1" &&
        event.target.id === "item1" &&
        globalState.firstInput !== 0
      ) {
        globalDispatch({
          type: "setStateToInitial",
        });
        showHidebtn(event.target);
        setSelectedFirst(event.target.selectedOptions[0].label);
      } else if (
        current.id === "2" &&
        event.target.id === "item2" &&
        globalState.secondInput !== 0
      ) {
        globalDispatch({
          type: "setStateToInitial",
        });
        showHidebtn(event.target);
        setSelectedSecond(event.target.selectedOptions[0].label);
      } else {
        setSelected((prevState) => ({ selected: !prevState }));
      }
    },
    [
      setSelected,
      globalDispatch,
      globalState.firstInput,
      globalState.secondInput,
    ]
  );

  // To reset global state to initial value
  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  const onClick = useCallback(
    (key) => {
      if (key === "Ac") {
        const current = document.querySelector(".current");
        globalDispatch({
          type: "reset",
          current,
        });
      } else if (key === "backspace") {
        const current = document.querySelector(".current");
        globalDispatch({
          type: "backspace",
          current,
        });
      } else if (key === ".") {
        const current = document.querySelector(".current");
        globalDispatch({
          type: "decimal",
          current,
        });
      } else {
        const current = document.querySelector(".current");
        globalDispatch({
          type: "number",
          current,
          key,
        });
      }
    },
    [globalDispatch]
  );

  const showHidebtn = (item) => {
    // item is dropdown value
    if (item) {
      if (item.value === "HEX") {
        setDisableHexbtn(false);
        setDisable_89_btn(false);
        setDisable_all_E01(false);
      } else if (item.value === "OCT") {
        setDisableHexbtn(true);
        setDisable_89_btn(true);
        setDisable_all_E01(false);
      } else if (item.value === "BIN") {
        setDisableHexbtn(true);
        setDisable_89_btn(true);
        setDisable_all_E01(true);
      } else {
        setDisableHexbtn(true);
        setDisable_89_btn(false);
        setDisable_all_E01(false);
      }
    }
  };

  useEffect(() => {
    const item1 = document.getElementById("item1");
    const item2 = document.getElementById("item2");
    const item1Value = item1.value;
    const item2Value = item2.value;
    const currentElement = document.querySelector(".current");
    const fromValue = globalState.firstInput;
    const toValue = globalState.secondInput;

    setSelectedFirst(item1.selectedOptions[0].label);
    setSelectedSecond(item2.selectedOptions[0].label);

    if (currentElement.id === "1") {
      showHidebtn(item1);
      let convertedValue = numeralSystem(fromValue, item1Value, item2Value);
      const key = convertedValue.toString().toUpperCase();
      const current = document.getElementById("2");

      globalDispatch({
        type: "setStateTokey",
        current,
        key,
      });
    }
    if (currentElement.id === "2") {
      showHidebtn(item2);
      let convertedValue = numeralSystem(toValue, item2Value, item1Value);
      const key = convertedValue.toString().toUpperCase();
      const current = document.getElementById("1");

      globalDispatch({
        type: "setStateTokey",
        current,
        key,
      });
    }
  }, [
    globalState.firstInput,
    globalState.secondInput,
    globalDispatch,
    selected,
  ]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn name="Numeral System" reset={props.reset} />
      <div className="contentSection">
        <Dropdown
          selectChange={(e) => selectChange(e)}
          selectId="item1"
          spanId="1"
          options={optionsObj}
          inputValue={globalState.firstInput}
          classname="current"
          selectedName={selectedFirst}
          change={showHidebtn}
        />
        <Dropdown
          selectChange={(e) => selectChange(e)}
          selectId="item2"
          spanId="2"
          options={optionsObj}
          inputValue={globalState.secondInput}
          classname=""
          selectedName={selectedSecond}
          change={showHidebtn}
        />
      </div>
      <div className="keypad_section">
        <NumberSystemKeypad
          onClick={onClick}
          disableHexbtn={disableHexbtn}
          disable_89_btn={disable_89_btn}
          disable_all_E01={disable_all_E01}
        />
      </div>
    </div>
  );
};

export default NumeralSystem;
