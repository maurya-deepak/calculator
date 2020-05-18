import React, { useState, useContext, useEffect } from "react";
import HeaderWithBackBtn from "./HeaderWithBackBtn";
import BasicKeypad from "./BasicKeypad";
import ChangeSelectedInput from "./ChangeSelectedInput";
import Context from "./store/Context";

const Discount = (props) => {
  const [state, setState] = useState({
    final_price: "0.00",
    save: "0.00",
  });

  const { globalState, actions } = useContext(Context);
  
  const onClick = (key) => {
    if (key === "Ac") {
      reset();
    } else if (key === "backspace") {
      backspace();
    } else if (key === ".") {
      const current = document.querySelector(".current");
      actions({
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
      actions({
        type: "number",
        current,
        key,
      });
    }
  };

  const reset = () => {
    const current = document.querySelector(".current");
    actions({
      type: "reset",
      current,
    });
    if (globalState.firstInput === "0") {
      setState({
        final_price: "0.00",
        save: "0.00",
      });
    }
  };

  const backspace = () => {
    const current = document.querySelector(".current");
    actions({
      type: "backspace",
      current,
    });
  };

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
