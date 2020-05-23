import React, {useState, useEffect, useContext, useCallback } from "react";
import HeaderWithBackBtn from "./HeaderWithBackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import BasicKeypad from "./BasicKeypad";
import ChangeSelectedInput from "./ChangeSelectedInput";
import { Conversion } from "./Conversion";
import Context from "./store/Context";

const Length = (props) => {
  const { globalState, globalDispatch } = useContext(Context);

  const [state, setState] = useState({
    selected: false,
  });
  
  // To reset global state to initial value
  useEffect(()=>{
    globalDispatch({
      type:"setStateToInitial"
    })
  },[globalDispatch]);
  
  // When keypad button clicked is sets state and using useCallback() 
  // so on every key press "keypad" component should not be re-render
  const onClick = useCallback((key) => {
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
  },[globalDispatch]);

  // Whenever state changes it calculates length and updates global state
  useEffect(() => {
    const item1 = document.getElementById("item1").value;
    const item2 = document.getElementById("item2").value;
    const currentElement = document.querySelector(".current");
    const fromValue = parseFloat(globalState.firstInput);
    const toValue = parseFloat(globalState.secondInput);

    if (currentElement.id === "1") {
      let convertedValue = fromValue * Conversion[item1][item2];
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
      let convertedValue = toValue / Conversion[item1][item2];
      convertedValue =
        convertedValue.toString().length > 15
          ? convertedValue.toPrecision(9).toString()
          : convertedValue.toString();

      const key = convertedValue;
      const current = document.getElementById("1");
      globalDispatch({
        type: "setStateTokey",
        current,
        key,
      });
    }
  }, [globalState.firstInput, globalState.secondInput, globalDispatch, state.selected]);


  // change local state when drop-down value is changed
  const selectChange = () => {
    setState({
      selected: !state.selected,
    });
  };
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
            {globalState.firstInput}
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
            {globalState.secondInput}
          </span>
        </div>
      </div>
        <div className="keypad_section">
          <BasicKeypad onClick={this.onClick}/>
      </div>
    </div>
  );
};

export default Length;
