import React, { useState, useEffect, useContext } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import ContentSection from "../Reusable/ContentSection";
import BasicKeypad from "../Reusable/BasicKeypad";
import Context from "../store/Context";
import WithOnClick from "../HOC/withOnClick";

const Percentage = (props)=> {
  const { globalState, globalDispatch } = useContext(Context);

  const [state, setState] = useState({
    result: 0,
  });

  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

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
      <HeaderWithBackBtn reset={props.reset} name="Percentage" />
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
        <BasicKeypad onClick={props.onClick} />
      </div>
    </div>
  );
}

export default WithOnClick(Percentage, "firstInput", 100, "1");

