import React, { useState, useEffect, useContext, useCallback } from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import BasicKeypad from "../Reusable/BasicKeypad";
import Dropdown from "../Reusable/DropdownWithInput";
import Context from "../store/Context";
import axios from "axios";

const totalData = {};
const optionsObj = [
  {
    name: "NewZealand Dollars NZD",
    value: "NZD",
    fullname: "NewZealand Dollars",
  },
  {
    name: "Australian Dollars AUD",
    value: "AUD",
    fullname: "Australian Dollars",
  },
  { name: "Euro EUR", value: "EUR", fullname: "Euro" },
  {
    name: "Hong Kong Doller HKD",
    value: "HKD",
    fullname: "Hong Kong Doller",
  },
  {
    name: "Canadian Dollar CAD",
    value: "CAD",
    fullname: "Canadian Dollar",
  },
  { name: "Japanese Yen JPY", value: "JPY", fullname: "Japanese Yen" },
  { name: "Indian Rupee INR", value: "INR", fullname: "Indian Rupee" },
  {
    name: "Norwegian Krone NOK",
    value: "NOK",
    fullname: "Norwegian Krone",
  },
  { name: "Brazil BRL", value: "BRL", fullname: "Brazil" },
  {
    name: "Bulgarian Lev BGN",
    value: "BGN",
    fullname: "Bulgarian Lev",
  },
  { name: "China Yuan CNY", value: "CNY", fullname: "China Yuan" },
  {
    name: "Croatian Dinar HRK",
    value: "HRK",
    fullname: "Croatian Dinar",
  },
  { name: "Czech Koruna CZK", value: "CZK", fullname: "Czech Koruna" },
  { name: "Danish Krone DKK", value: "DKK", fullname: "Danish Krone" },
  {
    name: "Indonesian Rupiah IDR",
    value: "IDR",
    fullname: "Indonesian Rupiah",
  },
  {
    name: "Hungarian Forint HUF",
    value: "HUF",
    fullname: "Hungarian Forint",
  },
  {
    name: "Icelandic Krona ISK",
    value: "ISK",
    fullname: "Icelandic Krona",
  },
  {
    name: "Israel New Shekel ILS",
    value: "ILS",
    fullname: "Israel New Shekel",
  },
  { name: "Swiss Franc CHF", value: "CHF", fullname: "Swiss Franc" },
  {
    name: "Malaysian Ringgit MYR",
    value: "MYR",
    fullname: "Malaysian Ringgit",
  },
  { name: "Poland Zloty PLN", value: "PLN", fullname: "Poland Zloty" },
  {
    name: "Russian Ruble RUB",
    value: "RUB",
    fullname: "Russian Ruble",
  },
  {
    name: "South Africa Rand ZAR",
    value: "ZAR",
    fullname: "South Africa Rand",
  },
  {
    name: "Swedish Krona SEK",
    value: "SEK",
    fullname: "Swedish Krona",
  },
  { name: "Thai Baht THB", value: "THB", fullname: "Thai Baht" },
  { name: "Turkish Lira TRY", value: "TRY", fullname: "Turkish Lira" },
  {
    name: "British Pound GBP",
    value: "GBP",
    fullname: "British Pound",
  },
  { name: "US Dollar USD", value: "USD", fullname: "US Dollar" },
];
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
  },[setSelected]);

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
    (base, convertTo, fromValue, setToId) => {
      const isPresent = checkDataAlreadyPresent(base, convertTo);
      if (!isPresent) {
        setFetching(true);
        const config = {
          headers: {
            'apikey' : 'NSlTyGPA06FzVWrhFHSIJ12Vv8Pgcg5g'
          },
        };
        var link = `https://api.apilayer.com/exchangerates_data/convert?to=${convertTo}&from=${base}&amount=${fromValue}`
        const url =
          `https://api.exchangeratesapi.io/latest?base=` +
          base +
          `&symbols=` +
          convertTo;
        axios
          .get(link, config)
          .then(({ data }) => {
            setFetching(false);
            const {result} = data;
            updateCurrencyData(base, convertTo, result);
            globalDispatch({
              type: "setStateTokey",
              current: document.getElementById(setToId),
              result,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const key = (totalData[base][convertTo] * fromValue).toFixed(2);
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
          options={optionsObj}
          inputValue={globalState.firstInput}
          classname="current"
          selectedName={selectedFirst}
          change={inputChange}
        />
        <Dropdown
          selectChange={selectChange}
          selectId="item2"
          spanId="2"
          options={optionsObj}
          inputValue={globalState.secondInput}
          classname=""
          selectedName={selectedSecond}
          change={inputChange}
        />
        <Dropdown
          selectChange={selectChange}
          selectId="item3"
          spanId="3"
          options={optionsObj}
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
