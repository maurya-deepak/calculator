import { useState, useEffect } from "react";

const useGlobalState = () => {
  const [state, setState] = useState({
    firstInput: "0",
    secondInput: "0",
  });

  const actions = (action) => {
    const { type, current, key } = action;
    switch (type) {
      case "setStateToInitial":
        console.log("setting to initial state");
        setState({ ...state, firstInput: "0", secondInput: "0" });
        break;
      case "setStateTokey":
        if (current.id === "1") {
          setState({ ...state, firstInput: key });
        }
        if (current.id === "2") {
          setState({ ...state, secondInput: key });
        }
        break;
      case "reset":
        if (current.id === "1") {
          setState({ ...state, firstInput: "0" });
        }
        if (current.id === "2") {
          setState({ ...state, secondInput: "0" });
        }
        break;
      case "backspace":
        if (current.id === "1") {
          const firstInputValue = state.firstInput;
          if (firstInputValue !== "0") {
            if (firstInputValue.length === 1) {
              setState({ ...state, firstInput: "0" });
            } else {
              setState({
                ...state,
                firstInput: firstInputValue.slice(0, -1),
              });
            }
          }
        }
        if (current.id === "2") {
          const secondInputValue = state.secondInput;
          if (secondInputValue !== 0) {
            if (secondInputValue.length === 1) {
              setState({ ...state, secondInput: "0" });
            } else {
              setState({
                ...state,
                secondInput: secondInputValue.slice(0, -1),
              });
            }
          }
        }
        break;
      case "decimal":
        if (current.id === "1" && state.firstInput.indexOf(".") === -1) {
          setState({
            ...state,
            firstInput: state.firstInput + ".",
          });
        } else if (
          current.id === "2" &&
          state.secondInput.indexOf(".") === -1
        ) {
          setState({
            ...state,
            secondInput: state.secondInput + ".",
          });
        }
        break;
      case "number":
        if (current.id === "1") {
          let value = state.firstInput;
          const len = value.indexOf(".") === -1 ? 15 : 18;
          if (value.length < len) {
            if (value === "0") {
              value = key;
            } else {
              value += key;
            }
            setState({
              ...state,
              firstInput: value,
            });
          }
        } else if (current.id === "2") {
          let value = state.secondInput;
          const len = value.indexOf(".") === -1 ? 15 : 18;
          if (value.length < len) {
            if (value === "0") {
              value = key;
            } else {
              value += key;
            }
            setState({
              ...state,
              secondInput: value,
            });
          }
        }
        break;
      default:
        break;
    }
  };
  return { state, actions };
};

export default useGlobalState;
