import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import useGlobalState from './components/store/useGlobalState';
import Context from './components/store/Context';


const Wrapper = () => {
  const store = useGlobalState();
  return (
    <Context.Provider value={store}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
  document.getElementById("root")
);
