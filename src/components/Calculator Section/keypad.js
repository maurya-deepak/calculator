import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackspace,
  faDivide,
  faTimes,
  faMinus,
  faPlus,
  faPercent,
  faCircle
} from "@fortawesome/free-solid-svg-icons";

class Keypad extends Component {
  render() {
    return (
      <div className="keypad-container">
        <input
          name="Ac"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="AC"
          className="org-key"
        />
        <button
          id="icon"
          name="backspace"
          onClick={e => this.props.onClick(e.currentTarget.name)}
          className="org-key"
        >
          <FontAwesomeIcon icon={faBackspace} />
        </button>

        <button
          id="icon"
          name="%"
          onClick={e => this.props.onClick(e.currentTarget.name)}
          className="org-key"
        >
          <FontAwesomeIcon icon={faPercent} />
        </button>
        <button
          id="icon"
          name="/"
          onClick={e => this.props.onClick(e.currentTarget.name)}
          className="org-key"
        >
          <FontAwesomeIcon icon={faDivide} />
        </button>

        <input
          name="7"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="7"
        />
        <input
          name="8"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="8"
        />
        <input
          name="9"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="9"
        />
        <button
          id="icon"
          name="*"
          onClick={e => this.props.onClick(e.currentTarget.name)}
          className="org-key"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <input
          name="4"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="4"
        />
        <input
          name="5"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="5"
        />
        <input
          name="6"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="6"
        />
        <button
          id="icon"
          name="-"
          onClick={e => this.props.onClick(e.currentTarget.name)}
          className="org-key"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>

        <input
          name="1"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="1"
        />
        <input
          name="2"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="2"
        />
        <input
          name="3"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="3"
        />
        <button
          id="icon"
          name="+"
          onClick={e => this.props.onClick(e.currentTarget.name)}
          className="org-key"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <input
          name="#"
          id="notusedbtn"
          type="button"
          value=""
        />
        <input
          name="0"
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="0"
        />
        <button
          id="icon"
          name="."
          className="dot"
          onClick={e => this.props.onClick(e.currentTarget.name)}
        >
          <FontAwesomeIcon icon={faCircle} />
        </button>
        <input
          name="="
          onClick={e => this.props.onClick(e.target.name)}
          type="button"
          value="="
          className="equal-key"
        />
      </div>
    );
  }
}

export default Keypad;
