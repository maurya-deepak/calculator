import React, { useState, useEffect } from "react";
import HeaderWithBackBtn from "./HeaderWithBackBtn";
import BasicKeypad from "./BasicKeypad";
import ChangeSelectedInput from "./ChangeSelectedInput";
import global from "./store/global";

const Discount = (props) => {

  const [state, setState] = useState({
    final_price: "0",
    save: "0",
  });

  const onClick = (key) => {
    if (key === "Ac") {
      reset();
    } else if (key === "backspace") {
      backspace();
    } else if (key === ".") {
      const current = document.querySelector(".current");
      global.globalState.actions({
        type: "decimal",
        current,
      });
    } else {
      const current = document.querySelector(".current");
      if (current.id === "2") {
        const discount = global.globalState.state.secondInput;
        const check = parseFloat(discount + key) <= 100.0;
        if (!check) return;
        if (discount.length > 4) return;
      } else if (current.id === "1") {
        const originalPrice = global.globalState.state.firstInput;
        if (originalPrice.indexOf(".") !== -1) {
          if (originalPrice.split(".")[1].length > 1) {
            return;
          }
        }
      }
      global.globalState.actions({
        type: "number",
        current,
        key,
      });
    }
  };

  const reset = () => {
    const current = document.querySelector(".current");
    global.globalState.actions({
      type: "reset",
      current,
    });
  };

  const backspace = () => {
    const current = document.querySelector(".current");
    global.globalState.actions({
      type: "backspace",
      current,
    });
  };

  useEffect(() => {
    global.globalState.actions({
      type: "setStateToInitial",
    });
  },[]);
  
 
  useEffect(() => {
    const originalPrice = parseFloat(global.globalState.state.firstInput);
    const discountAmount = parseFloat(global.globalState.state.secondInput);
    const saving = ((originalPrice * discountAmount) / 100).toFixed(2);
    const finalPrice = (originalPrice - saving).toFixed(2);
    setState({
      final_price: finalPrice.toString(),
      save: saving.toString(),
    });
  },[global.globalState.state.firstInput, global.globalState.state.secondInput]);

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
              {global.globalState.state.firstInput}
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
              {global.globalState.state.secondInput}
            </span>
          </div>
          <div className="items">
            <span>Final price</span>
            <span>{state.final_price}</span>
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
