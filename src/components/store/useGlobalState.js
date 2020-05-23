import { useReducer } from "react";

const reducer = (state, action) => {
  const { type, current, key } = action;
  switch (type) {
    case "setStateToInitial":
      return {
        firstInput: "0",
        secondInput: "0",
      };
    case "setStateTokey":
      if (current.id === "1") {
        return { ...state, firstInput: key };
      }
      if (current.id === "2") {
        return { ...state, secondInput: key };
      }
      return {
        ...state,
      };
    case "reset":
      if (current.id === "1") {
        return { ...state, firstInput: "0" };
      }
      if (current.id === "2") {
        return { ...state, secondInput: "0" };
      }
      break;
    case "backspace":
      if (current.id === "1") {
        const firstInputValue = state.firstInput;
        if (firstInputValue !== "0") {
          if (firstInputValue.length === 1) {
            return { ...state, firstInput: "0" };
          } else {
            return {
              ...state,
              firstInput: firstInputValue.slice(0, -1),
            };
          }
        }
      }
      if (current.id === "2") {
        const secondInputValue = state.secondInput;
        if (secondInputValue !== 0) {
          if (secondInputValue.length === 1) {
            return { ...state, secondInput: "0" };
          } else {
            return {
              ...state,
              secondInput: secondInputValue.slice(0, -1),
            };
          }
        }
      }
      return {
        ...state,
      };
    case "decimal":
      if (current.id === "1" && state.firstInput.indexOf(".") === -1) {
        return {
          ...state,
          firstInput: state.firstInput + ".",
        };
      } else if (current.id === "2" && state.secondInput.indexOf(".") === -1) {
        return {
          ...state,
          secondInput: state.secondInput + ".",
        };
      }
      return {
        ...state,
      };
    case "number":
      if (current.id === "1") {
        let value = state.firstInput;
        const len = value.indexOf(".") === -1 ? 15 : 18;
        const isValid =
          value.indexOf(".") === -1 ? true : value.split(".")[1].length <= 1;
        if (value.length < len && isValid) {
          if (value === "0") {
            value = key;
          } else {
            value += key;
          }
          return {
            ...state,
            firstInput: value,
          };
        }
      } else if (current.id === "2") {
        let value = state.secondInput;
        const len = value.indexOf(".") === -1 ? 15 : 18;
        const isValid =
          value.indexOf(".") === -1 ? true : value.split(".")[1].length <= 1;
        if (value.length < len && isValid) {
          if (value === "0") {
            value = key;
          } else {
            value += key;
          }
          return {
            ...state,
            secondInput: value,
          };
        }
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, {
    firstInput: "0",
    secondInput: "0",
  });
  return { globalState, globalDispatch };
};

export default useGlobalState;
