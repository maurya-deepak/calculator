import React, { useState, useEffect, useContext } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import ContentSection from "../Reusable/ContentSection";
import BasicKeypad from "../Reusable/BasicKeypad";
import Context from "../store/Context";

export default function Percentage(props) {
  const { globalState, globalDispatch } = useContext(Context);

  const [state, setState] = useState({
    result: 0,
  });

  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  const onClick = (key) => {
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
      if (current.id === "1") {
        const percentage = globalState.firstInput;
        const check = parseFloat(percentage + key) <= 100.0;
        if (!check) return;
        if (percentage.length > 4) return;
      }
      globalDispatch({
        type: "number",
        current,
        key,
      });
    }
  };

  useEffect(() => {
    const percent = parseFloat(globalState.firstInput);
    const total = parseFloat(globalState.secondInput);
    const result = ((total * percent) / 100).toFixed(2);
    setState({
      result,
    });
  }, [globalState.firstInput, globalState.secondInput]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn reset={props.reset} name="Discount" />
      <div className="content_section">
        <ContentSection
          name1="Percentage (%)"
          name2="Total"
          name3="Result"
          value1={globalState.firstInput}
          value2={globalState.secondInput}
          value3={state.result}
        />
      </div>
      <div className="keypad_section">
        <BasicKeypad onClick={onClick} />
      </div>
    </div>
  );
}
