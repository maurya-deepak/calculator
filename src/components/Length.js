import React, { useState, useEffect } from "react";
import HeaderWithBackBtn from "./HeaderWithBackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import BasicKeypad from "./BasicKeypad";
import ChangeSelectedInput from "./ChangeSelectedInput";
import { Conversion } from "./Conversion";
import global from "./store/global";

const Length = (props) => {

  const [state, setState] = useState({
    selected: false,
  });

  function calculate_length() {
    const item1 = document.getElementById("item1").value;
    const item2 = document.getElementById("item2").value;
    const currentElement = document.querySelector(".current");
    const fromValue = parseFloat(global.globalState.state.firstInput);
    const toValue = parseFloat(global.globalState.state.secondInput);

    if (currentElement.id === "1") {
      let convertedValue = fromValue * Conversion[item1][item2];
      convertedValue =
        convertedValue.toString().length > 15
          ? convertedValue.toPrecision(9).toString()
          : convertedValue.toString();
      const key = convertedValue;
      const current = document.getElementById("2");

      global.globalState.actions({
        type: "setStateTokey",
        current,
        key,
      });
    }
    if (currentElement.id === "2") {
      let convertedValue = toValue / Conversion[item1][item2];
      convertedValue =
        convertedValue.toString().length > 15
          ? convertedValue.toPrecision(9).toString()
          : convertedValue.toString();

      const key = convertedValue;
      const current = document.getElementById("1");
      global.globalState.actions({
        type: "setStateTokey",
        current,
        key,
      });
    }
  };

  const onClick = (key) => {
    if (key === "Ac") {
      const current = document.querySelector(".current");
      global.globalState.actions({
        type: "reset",
        current,
      });
    } else if (key === "backspace") {
      const current = document.querySelector(".current");
      global.globalState.actions({
        type: "backspace",
        current,
      });
    } else if (key === ".") {
      console.log(key);
      const current = document.querySelector(".current");
      global.globalState.actions({
        type: "decimal",
        current,
      });
    } else {
      const current = document.querySelector(".current");
      global.globalState.actions({
        type: "number",
        current,
        key,
      });
    }
  };

  const selectChange = () => {
    setState({
      selected: !state.selected,
    });
  };

  useEffect(() => {
    global.globalState.actions({
      type: "setStateToInitial",
    });
  }, []);

  useEffect(() => {
    calculate_length();
  },[state.selected, global.globalState.state.firstInput, global.globalState.state.secondInput]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn name="Length" reset={props.reset} />
      <div className="contentSection">
        <div className="items">
          <div>
            <select id="item1" onChange={selectChange}>
              <option value="km">Kilometer km</option>
              <option value="m">Meter m</option>
              <option value="dm">Decimeter dm</option>
              <option value="cm">Centimeter cm</option>
              <option value="mm">Millimeter mm</option>
              <option value="mi">Mile mi</option>
              <option value="ft">Foot ft</option>
              <option value="in">Inch in</option>
            </select>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <span id="1" className="current" onClick={ChangeSelectedInput}>
            {global.globalState.state.firstInput}
          </span>
        </div>
        <div className="items">
          <div>
            <select id="item2" onChange={selectChange}>
              <option value="km">Kilometer km</option>
              <option value="m">Meter m</option>
              <option value="dm">Decimeter dm</option>
              <option value="cm">Centimeter cm</option>
              <option value="mm">Millimeter mm</option>
              <option value="mi">Mile mi</option>
              <option value="ft">Foot ft</option>
              <option value="in">Inch in</option>
            </select>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <span id="2" onClick={ChangeSelectedInput}>
            {global.globalState.state.secondInput}
          </span>
        </div>
      </div>
      <div className="keypad_section">
        <BasicKeypad onClick={onClick} />
      </div>
    </div>
  );
};

export default Length;
