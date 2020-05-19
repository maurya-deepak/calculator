import React, { memo, useState, useContext, useEffect } from "react";
import HeaderWithBackBtn from "./HeaderWithBackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import BasicKeypad from "./BasicKeypad";
import ChangeSelectedInput from "./ChangeSelectedInput";
import { Conversion } from "./Conversion";
import Context from "./store/Context";
import { useCallback } from "react";

const Length = (props) => {
  const [state, setState] = useState({
    from: "0",
    to: "0",
    selected: false,
  });
  const { globalState, actions } = useContext(Context);


  const onClick = useCallback(
    (key) => {
      if (key === "Ac") {
        // reset();
        const current = document.querySelector(".current");
        actions({
          type: "reset",
          current,
        });
      } else if (key === "backspace") {
        // backspace();
        const current = document.querySelector(".current");
        actions({
          type: "backspace",
          current,
        });
      } else if (key === ".") {
        console.log(key);
        const current = document.querySelector(".current");
        actions({
          type: "decimal",
          current,
        });
      } else {
        const current = document.querySelector(".current");
        actions({
          type: "number",
          current,
          key,
        });
      }
    },
    [actions]
  );

  const selectChange = () => {
    setState({
      selected: !state.selected,
    });
  };

  useEffect(() => {
    actions({
      type: "setStateToInitial",
    });
  }, []);

  useEffect(() => {
    setState({
      from: globalState.firstInput,
      to: globalState.secondInput,
    });
  }, [globalState.firstInput, globalState.secondInput]);

  useEffect(() => {
    const item1 = document.getElementById("item1").value;
    const item2 = document.getElementById("item2").value;
    const currentElement = document.querySelector(".current");
    const fromValue = parseFloat(state.from);
    const toValue = parseFloat(state.to);

    if (currentElement.id === "1") {
      let convertedValue = fromValue * Conversion[item1][item2];
      convertedValue =
        convertedValue.toString().length > 15
          ? convertedValue.toPrecision(9).toString()
          : convertedValue.toString();
      const key = convertedValue;
      const current = document.getElementById("2");

      actions({
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
      actions({
        type: "setStateTokey",
        current,
        key,
      });
    }
    // warning: DO NOT PASS "actions" that will lead to infine state change.
  }, [state.from, state.to, state.selected]);

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
        <BasicKeypad onClick={onClick} />
      </div>
    </div>
  );
};

export default memo(Length);
