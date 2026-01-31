import React, { useContext, useCallback } from "react";
import Context from "../store/Context";

const WithOnClickWrapper = (OrgComponent, inputName, limit, checkId) => {
  function WithOnClick(props) {
    const { globalState, globalDispatch } = useContext(Context);

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
          if (current.id === checkId) {
            const value = globalState[inputName];
            const check = parseFloat(value + key) <= limit;
            if (!check) return;
            if (value.length > 4) return;
          }
          globalDispatch({
            type: "number",
            current,
            key,
          });
        }
      },
      [globalDispatch, globalState]
    );

    return <OrgComponent onClick={onClick} {...props} />;
  }
  return WithOnClick;
};

export default WithOnClickWrapper;
