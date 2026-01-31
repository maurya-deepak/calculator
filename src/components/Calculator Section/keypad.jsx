import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackspace,
  faDivide,
  faTimes,
  faMinus,
  faPlus,
  faPercent,
  faCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const Keypad = (props) => {
  const isSpanActive = props.isSpanActive;
  const isOperatorActive = props.isOperatorActive;
  const OperatorClasses = isSpanActive ? `org-key disable-btn` : `org-key`;
  const backspaceClass = isOperatorActive ? `org-key disable-btn` : `org-key`;
  const allclearClass =
    isSpanActive || isOperatorActive ? "org-key disable-btn" : `org-key`;
  const checkClasses = `equal-key checkmark`;
  return (
    <div className="keypad-container">
      <div className="flex-row">
        <input
          name="Ac"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="AC"
          className={allclearClass}
          disabled={isSpanActive || isOperatorActive}
          title="All clear"
        />
        <button
          aria-label="backspace"
          id="icon"
          name="backspace"
          onClick={(e) => props.onClick(e.currentTarget.name)}
          className={backspaceClass}
          disabled={isOperatorActive}
          title="Backspace"
        >
          <FontAwesomeIcon icon={faBackspace} />
        </button>

        <button
          aria-label="mod"
          id="icon"
          name="%"
          onClick={(e) => props.onClick(e.currentTarget.name)}
          className={OperatorClasses}
          disabled={isSpanActive}
          title="Mode"
        >
          <FontAwesomeIcon icon={faPercent} />
        </button>
        <button
          aria-label="divide"
          id="icon"
          name="/"
          onClick={(e) => props.onClick(e.currentTarget.name)}
          className={OperatorClasses}
          disabled={isSpanActive}
          title="Divide"
        >
          <FontAwesomeIcon icon={faDivide} />
        </button>
      </div>

      <div className="flex-row">
        <input
          name="7"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="7"
          disabled={isOperatorActive}
        />
        <input
          name="8"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="8"
          disabled={isOperatorActive}
        />
        <input
          name="9"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="9"
          disabled={isOperatorActive}
        />
        <button
          aria-label="multiply"
          id="icon"
          name="*"
          onClick={(e) => props.onClick(e.currentTarget.name)}
          className={OperatorClasses}
          disabled={isSpanActive}
          title="Multiply"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="flex-row">
        <input
          name="4"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="4"
          disabled={isOperatorActive}
        />
        <input
          name="5"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="5"
          disabled={isOperatorActive}
        />
        <input
          name="6"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="6"
          disabled={isOperatorActive}
        />
        <button
          aria-label="minus"
          id="icon"
          name="-"
          onClick={(e) => props.onClick(e.currentTarget.name)}
          className={OperatorClasses}
          disabled={isSpanActive}
          title="Minus"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>

      <div className="flex-row">
        <input
          name="1"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="1"
          disabled={isOperatorActive}
        />
        <input
          name="2"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="2"
          disabled={isOperatorActive}
        />
        <input
          name="3"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="3"
          disabled={isOperatorActive}
        />
        <button
          aria-label="plus"
          id="icon"
          name="+"
          onClick={(e) => props.onClick(e.currentTarget.name)}
          className={OperatorClasses}
          disabled={isSpanActive}
          title="Plus"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className="flex-row">
        <input
          name="0"
          onClick={(e) => props.onClick(e.target.name)}
          type="button"
          value="0"
          disabled={isOperatorActive}
        />
        <button
          aria-label="dot"
          id="icon"
          name="."
          className="dot"
          disabled={isOperatorActive}
          title="Dot"
          onClick={(e) => props.onClick(e.currentTarget.name)}
        >
          <FontAwesomeIcon icon={faCircle} />
        </button>
        {isSpanActive || isOperatorActive ? (
          <button
            aria-label="Ok"
            type="button"
            className={checkClasses}
            onClick={props.toggleisActiveSpan}
            title="Ok"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        ) : (
          <input
            name="="
            onClick={(e) => props.onClick(e.target.name)}
            type="button"
            value="="
            className="equal-key"
            title="Equal"
          />
        )}
      </div>

    </div>
  );
};

export default memo(Keypad);
