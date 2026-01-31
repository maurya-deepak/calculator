import React, { useState, useEffect, useContext, useCallback } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import BasicKeypad from "../Reusable/BasicKeypad";
import Dropdown from "../Reusable/DropdownWithInput";
import Context from "../store/Context";
import { CURRENCY } from "../../constants/currency";
import { KEY } from "../../constants/keyboard";
import ExchangeAPI from "../../apis/exchange";

const totalData = {};
const Currency = (props) => {
  const { globalState, globalDispatch } = useContext(Context);

  const [fetching, setFetching] = useState(false);
  const [selected, setSelected] = useState(true);
  const [selectedFirst, setSelectedFirst] = useState("NewZealand Dollars");
  const [selectedSecond, setSelectedSecond] = useState("NewZealand Dollars");
  const [selectedThird, setSelectedThird] = useState("NewZealand Dollars");

  // To reset global state to initial value
  useEffect(() => {
    globalDispatch({
      type: "setStateToInitial",
    });
    globalDispatch({
      type: "setStateTokey",
      current: document.querySelector(".current"),
      key: "1",
    });
  }, [globalDispatch]);

  // change local state when drop-down value is changed
  const selectChange = useCallback(() => {
    setSelected((prev) => !prev);
  }, [setSelected]);

  const onClick = useCallback(
    (key) => {
      if (key === KEY.RESET.Value) {
        const current = document.querySelector(".current");
        globalDispatch({
          type: KEY.RESET.Type,
          current,
        });
      } else if (key === KEY.BACKSPACK.Value) {
        const current = document.querySelector(".current");
        globalDispatch({
          type: KEY.BACKSPACK.Type,
          current,
        });
      } else if (key === KEY.DECIMAL.Value) {
        const current = document.querySelector(".current");
        globalDispatch({
          type: KEY.DECIMAL.Type,
          current,
        });
      } else {
        const current = document.querySelector(".current");
        globalDispatch({
          type: KEY.NUMBER.Type,
          current,
          key,
        });
      }
    },
    [globalDispatch]
  );

  const updateCurrencyData = useCallback((base, convertTo, value) => {
    if (totalData[base]) {
      totalData[base][convertTo] = value;
    } else {
      totalData[base] = { [convertTo]: value };
    }
  }, []);

  const checkDataAlreadyPresent = (base, convertTo) => {
    if (totalData[base] && totalData[base][convertTo]) {
      return true;
    } else return false;
  };

  const getData = useCallback(
    async (base, convertTo, fromValue, setToId) => {
      const isPresent = checkDataAlreadyPresent(base, convertTo);
      if (!isPresent && fromValue > 0) {
        setFetching(true);
        const data = await ExchangeAPI.getExchange({ base, convertTo, fromValue });
        setFetching(false);
        if (Object.keys(data).length > 0) {
          const { result } = data;
          updateCurrencyData(base, convertTo, result);
          globalDispatch({
            type: "setStateTokey",
            current: document.getElementById(setToId),
            result,
          });
        }
      } else {
        let key = 0;
        if (typeof totalData[base] !== "undefined" && typeof totalData[base][convertTo] !== "undefined") {
          key = (totalData[base][convertTo] * fromValue).toFixed(2);
        }
        globalDispatch({
          type: "setStateTokey",
          current: document.getElementById(setToId),
          key,
        });
      }
    },
    [globalDispatch, updateCurrencyData]
  );

  const decideFrom = useCallback(
    (dropDownFirstValue, dropDownSecondValue, dropDownThirdValue) => {
      const currentElement = document.querySelector(".current");
      let from;
      if (currentElement.id === "1") {
        from = parseFloat(globalState.firstInput);
        getData(dropDownFirstValue, dropDownSecondValue, from, 2);
        getData(dropDownFirstValue, dropDownThirdValue, from, 3);
      } else if (currentElement.id === "2") {
        from = parseFloat(globalState.secondInput);
        getData(dropDownSecondValue, dropDownFirstValue, from, 1);
        getData(dropDownSecondValue, dropDownThirdValue, from, 3);
      } else if (currentElement.id === "3") {
        from = parseFloat(globalState.thirdInput);
        getData(dropDownThirdValue, dropDownSecondValue, from, 2);
        getData(dropDownThirdValue, dropDownFirstValue, from, 1);
      }
    },
    [
      getData,
      globalState.firstInput,
      globalState.secondInput,
      globalState.thirdInput,
    ]
  );

  useEffect(() => {
    const dropDownFirst = document.getElementById("item1");
    const dropDownSecond = document.getElementById("item2");
    const dropDownThird = document.getElementById("item3");

    // changing dropdown labels
    setSelectedFirst(dropDownFirst.selectedOptions[0].label);
    setSelectedSecond(dropDownSecond.selectedOptions[0].label);
    setSelectedThird(dropDownThird.selectedOptions[0].label);

    // current selected value of each dropdown
    const dropDownFirstValue = dropDownFirst.value;
    const dropDownSecondValue = dropDownSecond.value;
    const dropDownThirdValue = dropDownThird.value;

    // decide "from" on the basis of "current" class selected item
    decideFrom(dropDownFirstValue, dropDownSecondValue, dropDownThirdValue);
  }, [selected, decideFrom]);

  const inputChange = (dropdown) => {
    const currentElement = document.querySelector(".current");
    globalDispatch({
      type: "setStateTokey",
      current: currentElement,
      key: "1",
    });
  };

  const classes = `contentSection content-section-currency`;
  return (
    <div className="Current-box">
      <HeaderWithBackBtn name="Currency converter" reset={props.reset} />
      <div className={classes}>
        <Dropdown
          selectChange={selectChange}
          selectId="item1"
          spanId="1"
          options={CURRENCY}
          inputValue={globalState.firstInput}
          classname="current"
          selectedName={selectedFirst}
          change={inputChange}
        />
        <Dropdown
          selectChange={selectChange}
          selectId="item2"
          spanId="2"
          options={CURRENCY}
          inputValue={globalState.secondInput}
          classname=""
          selectedName={selectedSecond}
          change={inputChange}
        />
        <Dropdown
          selectChange={selectChange}
          selectId="item3"
          spanId="3"
          options={CURRENCY}
          inputValue={globalState.thirdInput}
          classname=""
          selectedName={selectedThird}
          change={inputChange}
        />
      </div>
      <p id="fetching-data">
        Exchange rates are provided by exchangeratesapi.io
        {fetching ? <span> Updating...</span> : null}
      </p>
      <div className="keypad_section">
        <BasicKeypad onClick={onClick} />
      </div>
    </div>
  );
};

export default Currency;
