import React, { useState, useEffect, useContext, useCallback } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import BasicKeypad from "../Reusable/BasicKeypad";
import Dropdown from "../Reusable/Dropdown";
import { convert } from "../../utils/conversion";
import Context from "../store/Context";

const optionsObj = [
  { name: "Cubic meter m3", value: "m3", fullname: "Cubic meter" },
  { name: "Cubic decimeter dm3", value: "dm3", fullname: "Cubic decimeter" },
  { name: "Cubic centimeter cm3", value: "cm3", fullname: "Cubic centimeter" },
  { name: "Cubic millimeter mm3", value: "mm3", fullname: "Cubic millimeter" },
  { name: "Hectoliter hl", value: "hl", fullname: "Hectoliter" },
  { name: "Liter l", value: "l", fullname: "Liter"},
  { name: "Deciliter dl", value: "dl", fullname: "Deciliter" },
  { name: "Centiliter cl", value: "cl", fullname: "Centiliter" }, 
  { name: "Milliliter ml", value: "ml", fullname: "Milliliter" }, 
];

const Volume = (props) => {
  const { globalState, globalDispatch } = useContext(Context);

  const [state, setState] = useState({
    selected: false,
    selectedFirst: "Cubic meter",
    selectedSecond: "Cubic meter",
  });

  // To reset global state to initial value
  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  // When keypad button clicked is sets state and using useCallback()
  // so on every key press "keypad" component should not be re-render
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

  // Whenever state changes it calculates length and updates global state
    useEffect(() => {
      const item1 = document.getElementById("item1");
      const item2 = document.getElementById("item2");
      const item1Value = item1.value;
      const item2Value = item2.value;
      const currentElement = document.querySelector(".current");
      const fromValue = globalState.firstInput;
      const toValue = globalState.secondInput;

      setState({
        selectedFirst: item1.selectedOptions[0].label,
        selectedSecond: item2.selectedOptions[0].label,
      });

      if (currentElement.id === "1") {
        let convertedValue = convert(fromValue,"volume").from(item1Value).to(item2Value);
        convertedValue =
          convertedValue.toString().length > 15
            ? convertedValue.toPrecision(9).toString()
            : convertedValue.toString();
        const key = convertedValue;
        const current = document.getElementById("2");

        globalDispatch({
          type: "setStateTokey",
          current,
          key,
        });
      }
      if (currentElement.id === "2") {
        let convertedValue = convert(toValue,"volume").from(item1Value).to(item2Value);
        convertedValue =
          convertedValue.toString().length > 15
            ? convertedValue.toPrecision(9).toString()
            : convertedValue.toString();

        const key = convertedValue;
        const current = document.getElementById("1");
        console.log(item2.selectedOptions[0].label);
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
      state.selected,
    ]);

  // change local state when drop-down value is changed
  const selectChange = () => {
    setState({
      selected: !state.selected,
    });
  };

  return (
    <div className="Current-box">
      <HeaderWithBackBtn name="Volume" reset={props.reset} />
      <div className="contentSection">
        <Dropdown
          selectChange={selectChange}
          selectId="item1"
          spanId="1"
          options={optionsObj}
          inputValue={globalState.firstInput}
          classname="current"
          selectedName={state.selectedFirst}
        />
        <Dropdown
          selectChange={selectChange}
          selectId="item2"
          spanId="2"
          options={optionsObj}
          inputValue={globalState.secondInput}
          classname=""
          selectedName={state.selectedSecond}
        />
      </div>
      <div className="keypad_section">
        <BasicKeypad onClick={onClick} />
      </div>
    </div>
  );
};

export default Volume;
