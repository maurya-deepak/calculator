import React, { useState, useCallback , memo} from "react";
import Result from "./Result";
import Keypad from "./keypad";

const CalculatorSection = () => {
  const [resultState, setResultState] = useState(["0"]);

  const calculate = useCallback(() => {
    try {
      const last = resultState[resultState.length - 1];
      if (
        last !== "+" &&
        last !== "-" &&
        last !== "*" &&
        last !== "/" &&
        last !== "%"
      ) {
        const tocalculate = resultState.join(" ");
         // eslint-disable-next-line
        setResultState([String(eval(tocalculate))]);
      }
    } catch (e) {
      console.log(e);
    }
   
  }, [setResultState, resultState]);

  const reset = useCallback(() => {
    setResultState(["0"]);
  }, [setResultState]);

  const backspace = useCallback(() => {
    if (resultState.length >= 1) {
      const last = resultState[resultState.length - 1];
      if (last.length > 1) {
        const newArr = [...resultState];
        newArr.pop();
        newArr.push(last.slice(0, -1));
        setResultState(newArr);
      } else if (resultState.length === 1 && last.length === 1) {
        setResultState(["0"]);
      } else {
        const newArr = [...resultState];
        newArr.pop();
        setResultState(newArr);
      }
    }
  }, [setResultState, resultState]);

  const onClick = useCallback(
    (val) => {
      if (val === "=") {
        if (resultState.length > 1) calculate();
      } else if (val === "Ac") {
        reset();
      } else if (val === "backspace") {
        backspace();
      } else if (
        val === "+" ||
        val === "-" ||
        val === "*" ||
        val === "/" ||
        val === "%"
      ) {
        setResultState((prevResultState) => {
          let textArray = [...prevResultState];
          const last_val = textArray[textArray.length - 1];
          if (
            last_val === "+" ||
            last_val === "-" ||
            last_val === "*" ||
            last_val === "/" ||
            last_val === "%"
          ) {
            textArray.pop();
            textArray.push(val);
            return textArray;
          } else {
            textArray.push(val);
            return textArray;
          }
        });
      } else {
        let current;
        setResultState((prevResultState) => {
          let textArray = [...prevResultState];
          if (textArray.length >= 1) {
            current = textArray[textArray.length - 1];
            const regexp = /\d|\.+/g;
            if (regexp.test(current)) {
              if (val === ".") {
                if (current === "0") {
                  current = "0.";
                } else if (current.indexOf(".") === -1) {
                  current += val;
                }
              } else if (current === "0") {
                current = val;
              } else {
                current += val;
              }
              textArray.pop();
              textArray.push(current);
              return textArray;
            } else {
              textArray.push(val);
              return textArray;
            }
          }
        });
      }
    },
    [setResultState, resultState, calculate, reset, backspace]
  );

  return (
    <div className="container">
      <Result result={resultState} />
      <Keypad onClick={onClick} />
    </div>
  );
};

export default memo(CalculatorSection);
