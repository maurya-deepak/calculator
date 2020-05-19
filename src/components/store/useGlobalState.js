import { useState, useCallback } from "react";

const useGlobalState = () => {
  const [globalState, setState] = useState({
    firstInput: "0",
    secondInput: "0",
  });

  const actions = useCallback((action) => {
    const { type, current, key } = action;
    switch (type) {
      case "setStateToInitial":
        // console.log("setting to initial state");
        return setState({ ...globalState, firstInput: "0", secondInput: "0" });
      case "setStateTokey":
        // console.log("case setState:")
        if (current.id === "1") {
          // console.log("setting state 1")
          return setState({ ...globalState, firstInput: key });
        }
        if (current.id === "2") {
          // console.log("setting state 2")
          return setState({ ...globalState, secondInput: key });
        }
        break;
      case "reset":
        if (current.id === "1") {
          return setState({ ...globalState, firstInput: "0" });
        }
        if (current.id === "2") {
          return setState({ ...globalState, secondInput: "0" });
        }
        break;
      case "backspace":
        if (current.id === "1") {
          const firstInputValue = globalState.firstInput;
          if (firstInputValue !== "0") {
            if (firstInputValue.length === 1) {
              return setState({ ...globalState, firstInput: "0" });
            } else {
              return setState({
                ...globalState,
                firstInput: firstInputValue.slice(0, -1),
              });
            }
          }
        }
        if (current.id === "2") {
          const secondInputValue = globalState.secondInput;
          if (secondInputValue !== 0) {
            if (secondInputValue.length === 1) {
              return setState({ ...globalState, secondInput: "0" });
            } else {
              return setState({
                ...globalState,
                secondInput: secondInputValue.slice(0, -1),
              });
            }
          }
        }
        break;
      case "decimal":
        if (current.id === "1" && globalState.firstInput.indexOf(".") === -1) {
          return setState({
            ...globalState,
            firstInput: globalState.firstInput + ".",
          });
        } else if (
          current.id === "2" &&
          globalState.secondInput.indexOf(".") === -1
        ) {
          return setState({
            ...globalState,
            secondInput: globalState.secondInput + ".",
          });
        }
        break;
      case "number":
        if (current.id === "1") {
          let value = globalState.firstInput;
          const len = value.indexOf(".") === -1 ? 15 : 18;
          if (value.length < len) {
            if (value === "0") {
              value = key;
            } else {
              value += key;
            }
            return setState({
              ...globalState,
              firstInput: value,
            });
          }
        } else if (current.id === "2") {
          let value = globalState.secondInput;
          const len = value.indexOf(".") === -1 ? 15 : 18;
          if (value.length < len) {
            if (value === "0") {
              value = key;
            } else {
              value += key;
            }
            return setState({
              ...globalState,
              secondInput: value,
            });
          }
        }
        break;
      default:
        return globalState;
    }
  },[globalState]);
  return { globalState, actions };
};

export default useGlobalState;
