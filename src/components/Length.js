import React, { Component } from "react";
import HeaderWithBackBtn from "./HeaderWithBackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import BasicKeypad from "./BasicKeypad";
import ChangeSelectedInput from "./ChangeSelectedInput";
import isValidInput from "./isValidInput";

class Length extends Component {
  state = {
    from: "1",
    to: "1",
  };

  onClick = (value) => {
    if (value === "Ac") {
      this.reset();
    } else if (value === "backspace") {
        this.backspace();
      console.log("backspace.");
    } else {
      const current = document.getElementById("current");
      const name = current.name;
      const from = this.state.from;
      const to = this.state.to;

      if (name === "from" && from.length < 14) {
        let valid = isValidInput(from);
        if (value === ".") {
          const indexOfDot = from.indexOf(".");
          if (indexOfDot === -1) {
            this.setState(
              {
                from: from === "0" ? "0." : parseFloat(from) + value,
              },
              this.calculate_length
            );
          }
        } else if (valid) {
          this.setState(
            {
              from: from === "0" ? value : parseFloat(from + value).toString(),
            },
            this.calculate_length
          );
        }
      }
      if (name === "to" && to.length < 14) {
        let valid = isValidInput(to);
        if (value === ".") {
          const indexOfDot = to.indexOf(".");
          if (indexOfDot === -1) {
            this.setState(
              {
                to: to === "0" ? "0." : parseFloat(to) + value,
              },
              this.calculate_length
            );
          }
        } else if (valid) {
          this.setState(
            {
              to: to === "0" ? value : parseFloat(to + value).toString(),
            },
            this.calculate_length
          );
        }
      }
    }
  };
  calculate_length = () => {
    const item1 = document.getElementById("item1").value;
    const item2 = document.getElementById("item2").value;
    const fromValue = this.state.from;
    
    if(item1 === 'm' && item2 === 'cm'){

    }
  };
  backspace = () => {
    const current = document.getElementById("current");
    const name = current.name;
    if (name === "from" && this.state.from !== "0") {
      this.setState(
        {
          from:
            this.state.from.length === 1 ? "0" : this.state.from.slice(0, -1),
        },
        this.calculate_length
      );
    }
    if (name === "to" && this.state.to !== "0") {
      this.setState(
        {
          to: this.state.to.length === 1 ? "0" : this.state.to.slice(0, -1),
        },
        this.calculate_length
      );
    }
  };
  reset = () => {
    const current = document.getElementById("current");
    const name = current.name;
    if (name === "from") {
      this.setState({
        from: "0",
      });
    } else {
      this.setState({
        to: "0",
      });
    }
  };

  render() {
    return (
      <div className="Current-box">
        <HeaderWithBackBtn name="Length" reset={this.props.reset} />
        <div className="contentSection">
          <div className="item">
            <select id="item1">
              <option value="km">Kilometer km</option>
              <option value="m">Meter m</option>
              <option value="dm">Decimeter dm</option>
              <option value="cm">Centimeter cm</option>
              <option value="mm">Millimeter mm</option>
              <option value="mi">Mile mi</option>
              <option value="ft">Foot ft</option>
              <option value="in">Inch in</option>
            </select>
            <FontAwesomeIcon icon={faCaretDown} />
            <input
              type="text"
              id="current"
              name="from"
              readOnly
              onClick={ChangeSelectedInput}
              value={this.state.from}
            />
          </div>
          <div className="item">
            <select id="item2">
              <option value="km">Kilometer km</option>
              <option value="m">Meter m</option>
              <option value="dm">Decimeter dm</option>
              <option value="cm">Centimeter cm</option>
              <option value="mm">Millimeter mm</option>
              <option value="mi">Mile mi</option>
              <option value="ft">Foot ft</option>
              <option value="in">Inch in</option>
            </select>
            <FontAwesomeIcon icon={faCaretDown} />
            <input
              type="text"
              readOnly
              name="to"
              onClick={ChangeSelectedInput}
              value={this.state.to}
            />
          </div>
        </div>
        <div className="keypad_section">
          <BasicKeypad onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

export default Length;
