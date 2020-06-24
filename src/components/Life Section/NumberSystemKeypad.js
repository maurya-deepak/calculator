import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

const NumberSystemKeypad = (props) => {
  const classes = `keypad-container`;
  const disableHexbtn = props.disableHexbtn;
  const disable_89_btn = props.disable_89_btn;
  const disable_all_E01 = props.disable_all_E01;
  return (
    <div className={classes}>
      <div className="flex-row">
        <input
          name="Ac"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="AC"
          className="org-key"
        />
        <button
          name="backspace"
          id="icon"
          onClick={(e) => props.onClick(e.currentTarget.name)}
          className="org-key"
        >
          <FontAwesomeIcon icon={faBackspace} />
        </button>
        <input
          name="F"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="F"
          disabled={disableHexbtn}
        />
        <input
          name="E"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="E"
          disabled={disableHexbtn}
        />
      </div>
      <div className="flex-row">
        <input
          name="7"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="7"
          disabled={disable_all_E01}
        />
        <input
          name="8"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="8"
          disabled={disable_89_btn}
        />
        <input
          name="9"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="9"
          disabled={disable_89_btn}
        />
        <input
          name="D"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="D"
          disabled={disableHexbtn}
        />
      </div>
      <div className="flex-row">
        <input
          name="4"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="4"
          disabled={disable_all_E01}
        />
        <input
          name="5"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="5"
          disabled={disable_all_E01}
        />
        <input
          name="6"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="6"
          disabled={disable_all_E01}
        />
        <input
          name="C"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="C"
          disabled={disableHexbtn}
        />
      </div>
      <div className="flex-row">
        <input
          name="1"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="1"
        />
        <input
          name="2"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="2"
          disabled={disable_all_E01}
        />
        <input
          name="3"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="3"
          disabled={disable_all_E01}
        />
        <input
          name="B"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="B"
          disabled={disableHexbtn}
        />
      </div>
      <div className="flex-row">
        <input
          name="0"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="0"
        />
        <input
          name="A"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="A"
          disabled={disableHexbtn}
        />
      </div>
    </div>
  );
};

export default NumberSystemKeypad;
