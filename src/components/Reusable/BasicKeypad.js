import React, { memo, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faCircle } from "@fortawesome/free-solid-svg-icons";

class Keypad extends Component {
  render() {
    const classes = this.props.class
      ? `keypad-container basic-keypad-container temperature-keypad-btn`
      : `keypad-container basic-keypad-container`;
    return (
      <div className={classes}>
        <input
          name="7"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="7"
        />
        <input
          name="8"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="8"
        />
        <input
          name="9"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="9"
        />
        <input
          name="Ac"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="AC"
          className="org-key"
          id="allClear"
        />
        <input
          name="4"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="4"
        />
        <input
          name="5"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="5"
        />
        <input
          name="6"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="6"
        />
        <input
          name="1"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="1"
        />
        <input
          name="2"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="2"
        />
        <input
          name="3"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="3"
        />
        <input
          name="0"
          onClick={(e) => this.props.onClick(e.target.name)}
          type="button"
          value="0"
        />
        <button
          name="."
          className="basic-dot"
          onClick={(e) => this.props.onClick(e.currentTarget.name)}
        >
          <FontAwesomeIcon icon={faCircle} />
        </button>
        {this.props.isTemperature ? (
          <input
            name="-"
            id="tempPlusMinusbtn"
            onClick={(e) => this.props.onClick(e.target.name)}
            type="button"
            value="+/-"
          />
        ) : null}
        <button
          name="backspace"
          onClick={(e) => this.props.onClick(e.currentTarget.name)}
          className="org-key"
          id="backspace"
        >
          <FontAwesomeIcon icon={faBackspace} />
        </button>
      </div>
    );
  }
}

export default memo(Keypad);
