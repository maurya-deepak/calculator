import React, { useState, useEffect, useContext, useCallback } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import ChangeSelectedInput from "../Reusable/ChangeSelectedInput";
import BasicKeypad from "../Reusable/BasicKeypad";
import Context from "../store/Context";

const Gst = (props) => {
  const { globalState, globalDispatch } = useContext(Context);
  // local states
  const [finalPrice, setFinalPrice] = useState("0");
  const [c_s_GST, setCSgst] = useState("0");
  const [isgstChange, isSetgstChange] = useState(false);

  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
  }, [globalDispatch]);

  const onClick = useCallback(
    (key) => {
      const current = document.querySelector(".current");
      if (key === "Ac") {
        globalDispatch({
          type: "reset",
          current,
        });
      } else if (key === "backspace") {
        globalDispatch({
          type: "backspace",
          current,
        });
      } else if (key === ".") {
        globalDispatch({
          type: "decimal",
          current,
        });
      } else {
        const originalPrice = globalState.firstInput;
        if (
          originalPrice.indexOf(".") !== -1 &&
          originalPrice.split(".")[1].length > 1
        ) {
          return;
        }
        globalDispatch({
          type: "number",
          current,
          key,
        });
      }
    },
    [globalDispatch, globalState.firstInput]
  );

  useEffect(() => {
    const originalPrice = parseFloat(globalState.firstInput);
    let gst = document.querySelector(".current-gst").innerText;
    gst = parseFloat(gst.split("%")[0]);
    console.log(gst);
    const finalPrice = (originalPrice + (originalPrice * gst) / 100).toFixed(2);
    setFinalPrice(finalPrice);
    const c_s_GST = ((originalPrice * (gst / 2)) / 100).toFixed(2);
    setCSgst(c_s_GST);
  }, [globalState.firstInput, isgstChange]);

  const changeClass = (e) => {
    const currentGstSelected = document.querySelector(".current-gst");
    const clickedItem = e.target;
    if (currentGstSelected !== clickedItem) {
      clickedItem.classList.add("current-gst");
      currentGstSelected.classList.remove("current-gst");
      isSetgstChange((prev) => !prev);
    }
  };
  return (
    <div className="Current-box">
      <HeaderWithBackBtn reset={props.reset} name="Split bill" />
      <div className="content_section">
        <div className="content_section_1">
          <div className="items">
            <span>Original price</span>
            <span id="1" onClick={ChangeSelectedInput} className="current">
              {globalState.firstInput}
            </span>
          </div>
          <div className="items">
            <span>Gst</span>
            <span className="gst-list">
              <ul>
                <li className="current-gst" onClick={changeClass}>
                  3%
                </li>
                <li onClick={changeClass}>5%</li>
                <li onClick={changeClass}>12%</li>
                <li onClick={changeClass}>18%</li>
                <li onClick={changeClass}>28%</li>
              </ul>
            </span>
          </div>
          <div className="items">
            <span>Final price</span>
            <span id="no-curPointer">{finalPrice}</span>
          </div>
        </div>
        <div className="content_section_2">
          <span>CGST/SGST: </span>
          <span id="no-curPointer">{c_s_GST}</span>
        </div>
      </div>
      <div className="keypad_section">
        <BasicKeypad onClick={onClick} disableDot={true}/>
      </div>
    </div>
  );
};

export default Gst;
