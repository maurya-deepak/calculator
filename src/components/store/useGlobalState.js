import { useReducer } from "react";

const reducer = (state, action) => {
  const { type, current, key } = action;
  switch (type) {
    case "setStateToInitial":
      return { firstInput: "0", secondInput: "0", thirdInput: "0" };

    case "setStateTokey":
      if (current.id === "1") return setToKey("firstInput", key, state);
      if (current.id === "2") return setToKey("secondInput", key, state);
      if (current.id === "3") return setToKey("thirdInput", key, state);
      return { ...state };

    case "reset":
      if (current.id === "1") return { ...state, firstInput: "0" };
      if (current.id === "2") return { ...state, secondInput: "0" };
      if (current.id === "3") return { ...state, thirdInput: "0" };
      return { ...state };

    case "backspace":
      if (current.id === "1") return backspace("firstInput", state);
      if (current.id === "2") return backspace("secondInput", state);
      if (current.id === "3") return backspace("thirdInput", state);
      return { ...state };

    case "decimal":
      if (current.id === "1") return decimal("firstInput", state);
      else if (current.id === "2") return decimal("secondInput", state);
      else if (current.id === "3") return decimal("thirdInput", state);
      return { ...state };

    case "number":
      if (current.id === "1") return number("firstInput", key, state);
      else if (current.id === "2") return number("secondInput", key, state);
      else if (current.id === "3") return number("thirdInput", key, state);
      return { ...state };

    case "negativeOfNumber":
      if (current.id === "1") return negativeOfNumber("firstInput", state);
      else if (current.id === "2")
        return negativeOfNumber("secondInput", state);
      return { ...state };

    default:
      return { ...state };
  }
};

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, {
    firstInput: "0",
    secondInput: "0",
    thirdInput: "0",
  });
  return { globalState, globalDispatch };
};

const setToKey = (stateName, key, state) => {
  return { ...state, [stateName]: key };
};

const number = (stateName, key, state) => {
  let value = state[stateName];
  const len = value.indexOf(".") === -1 ? 15 : 18;
  if (value.length < len) {
    if (value === "0") {
      value = key;
    } else {
      value += key;
    }
    return { ...state, [stateName]: value };
  } else {
    return { ...state };
  }
};

const backspace = (stateName, state) => {
  const inputValue = state[stateName];
  if (inputValue !== "0") {
    let inputSize = inputValue.length;
    if (inputSize === 1 || (inputSize === 2 && inputValue[0] === "-")) {
      return { ...state, [stateName]: "0" };
    } else {
      return { ...state, [stateName]: inputValue.slice(0, -1) };
    }
  } else {
    return { ...state };
  }
};

const decimal = (stateName, state) => {
  if (state[stateName].indexOf(".") === -1) {
    return { ...state, [stateName]: state[stateName] + "." };
  } else {
    return { ...state };
  }
};

const negativeOfNumber = (stateName, state) => {
  let value = state[stateName];
  if (value[0] === "-") {
    return { ...state, [stateName]: value.slice(1) };
  } else if (value !== "0") {
    return { ...state, [stateName]: `-${value}`};
  }
  return {...state};
};

export default useGlobalState;
