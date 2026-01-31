import React, { useState, useContext, useEffect, useCallback } from "react";
import { convert } from "../../utils/conversion";
import Context from "../store/Context";

const UpdatedStructure = (OriginalComponent, measureType) => {
  function UpdatesStructure(props) {
    const { globalState, globalDispatch } = useContext(Context);

    const [state, setState] = useState({
      selected: false,
      selectedFirst: "",
      selectedSecond: "",
    });

    useEffect(() => {
      const item1 = document.getElementById("item1");
      const item2 = document.getElementById("item2");
      setState({
        selectedFirst: item1.selectedOptions[0].label,
        selectedSecond: item2.selectedOptions[0].label,
      });
    }, []);

    const selectChange = useCallback(() => {
      setState({
        selected: !state.selected,
      });
    },[setState, state.selected]);

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
        } else if (key === "-") {
          const current = document.querySelector(".current");
          globalDispatch({
            type: "negativeOfNumber",
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

    useEffect(() => {
      const item1 = document.getElementById("item1");
      const item2 = document.getElementById("item2");
      const item1Value = item1.value;
      const item2Value = item2.value;
      const currentElement = document.querySelector(".current");
      const fromValue = globalState.firstInput;
      const toValue = globalState.secondInput;

      setState({
        selectedFirst: item1.selectedOptions[0].label,
        selectedSecond: item2.selectedOptions[0].label,
      });

      if (currentElement.id === "1") {
        let convertedValue = convert(fromValue, measureType)
          .from(item1Value)
          .to(item2Value);

        convertedValue =
          convertedValue.toString().length > 15
            ? convertedValue.toPrecision(9).toString()
            : convertedValue.toString();
        const key = convertedValue;
        const current = document.getElementById("2");

        globalDispatch({
          type: "setStateTokey",
          current,
          key,
        });
      }
      if (currentElement.id === "2") {
        let convertedValue = convert(toValue, measureType)
          .from(item2Value)
          .to(item1Value);

        convertedValue =
          convertedValue.toString().length > 15
            ? convertedValue.toPrecision(9).toString()
            : convertedValue.toString();

        const key = convertedValue;
        const current = document.getElementById("1");

        globalDispatch({
          type: "setStateTokey",
          current,
          key,
        });
      }
    }, [
      globalState.firstInput,
      globalState.secondInput,
      globalDispatch,
      state.selected,
    ]);
    return (
      <OriginalComponent
        btnClicked={onClick}
        selectChange={selectChange}
        selectedFirst={state.selectedFirst}
        selectedSecond={state.selectedSecond}
        {...props}
      />
    );
  }
  return UpdatesStructure;
};

export default UpdatedStructure;
