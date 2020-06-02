import React, { useState, useEffect, useContext, useCallback } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import ContentSection from "../Reusable/ContentSection";
import BasicKeypad from "../Reusable/BasicKeypad";
import Context from "../store/Context";

const BillSplit = (props) => {
  const { globalState, globalDispatch } = useContext(Context);
  const [state, setState] = useState({
    result: 0,
  });

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
        if (current.id === "2") return;
        globalDispatch({
          type: "decimal",
          current,
        });
      } else {
        const current = document.querySelector(".current");
        if (current.id === "1") {
          const amount = globalState.firstInput;
          if (amount.indexOf(".") !== -1 && amount.split(".")[1].length >= 2)
            return;
        } else if (current.id === "2") {
          const people = globalState.secondInput;
          const check = parseFloat(people + key) <= 999;
          if (!check) return;
        }
        globalDispatch({
          type: "number",
          current,
          key,
        });
      }
    },
    [globalState.firstInput, globalState.secondInput, globalDispatch]
  );

  useEffect(() => {
    const amount = parseFloat(globalState.firstInput);
    const people = parseFloat(globalState.secondInput);
    if (people > 0) {
      const splitAmount = (amount / people).toFixed(2);
      setState({
        result: splitAmount,
      });
    } else {
      setState({
        result: amount,
      });
    }
  }, [globalState.firstInput, globalState.secondInput]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn reset={props.reset} name="Split bill" />
      <div className="content_section">
        <ContentSection
          name1="Amount"
          name2="People"
          name3="Split amount"
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
};

export default BillSplit;
