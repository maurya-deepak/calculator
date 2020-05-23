import React from "react";
import useGlobalState from "./useGlobalState";
import Context from "./Context";

const GlobalStateProvider = ({ children }) => {
  return (
    <Context.Provider value={useGlobalState()}>{children}</Context.Provider>
  );
};

export default GlobalStateProvider;
