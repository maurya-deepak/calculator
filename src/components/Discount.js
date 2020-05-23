import React, { useState, useEffect, useContext} from "react";
import HeaderWithBackBtn from "./HeaderWithBackBtn";
import BasicKeypad from "./BasicKeypad";
import ChangeSelectedInput from "./ChangeSelectedInput";
import Context from "./store/Context";

const Discount = (props) => {
  // using global state context
  const { globalState, globalDispatch } = useContext(Context);

  // initializing local state
  const [state, setState] = useState({
    final_price: "0",
    save: "0",
  });

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
      if (current.id === "2") {
        const discount = globalState.secondInput;
        const check = parseFloat(discount + key) <= 100.0;
        if (!check) return;
        if (discount.length > 4) return;
      } else if (current.id === "1") {
        const originalPrice = globalState.firstInput;
        if (originalPrice.indexOf(".") !== -1) {
          if (originalPrice.split(".")[1].length > 1) {
            return;
          }
        }
      }
      globalDispatch({
        type: "number",
        current,
        key,
      });
    }
  };

  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  useEffect(() => {
    const originalPrice = parseFloat(globalState.firstInput);
    const discountAmount = parseFloat(globalState.secondInput);
    const saving = ((originalPrice * discountAmount) / 100).toFixed(2);
    const finalPrice = (originalPrice - saving).toFixed(2);
    setState({
      final_price: finalPrice.toString(),
      save: saving.toString(),
    });
  }, [globalState.firstInput, globalState.secondInput]);

  return (
    <div className="Current-box">
      <HeaderWithBackBtn reset={props.reset} name="Discount" />
      <div className="content_section">
        <div className="content_section_1">
          <div className="items">
            <span>Original price</span>
            <span
              name="original_price"
              id="1"
              onClick={ChangeSelectedInput}
              className="current"
            >
              {globalState.firstInput}
            </span>
          </div>
          <div className="items">
            <span>Discount (% off)</span>
            <span
              type="text"
              name="discount"
              id="2"
              onClick={ChangeSelectedInput}
            >
              {globalState.secondInput}
            </span>
          </div>
          <div className="items">
            <span>Final price</span>
            <span id="no-curPointer">{state.final_price}</span>
          </div>
        </div>
        <div className="content_section_2">
          <span>You save </span>
          <span>{state.save}</span>
        </div>
      </div>
      <div className="keypad_section">
        <BasicKeypad onClick={onClick} />
      </div>
    </div>
  );
};

export default Discount;
