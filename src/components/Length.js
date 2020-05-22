import React, { Component } from "react";
import HeaderWithBackBtn from "./HeaderWithBackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import BasicKeypad from "./BasicKeypad";
import ChangeSelectedInput from "./ChangeSelectedInput";
import isValidInput from "./isValidInput";
import Reset from "./Reset";
import Backspace from "./Backspace";
import { Conversion } from "./Conversion";

class Length extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "0",
      to: "0",
    };
    this.onClick = this.onClick.bind(this);
    this.calculate_length = this.calculate_length.bind(this);
    this.backspace = this.backspace.bind(this);
    this.reset = this.reset.bind(this);
    this.Reset = Reset.bind(this);
    this.Backspace = Backspace.bind(this);
  }
  onClick = (value) => {
    if (value === "Ac") {
      this.reset();
    } else if (value === "backspace") {
      this.backspace();
    } else {
      const name = document.getElementById("current").attributes.name.value;

      const from = this.state.from;
      const to = this.state.to;

      if (name === "from" && from.length < 15) {
        let valid = isValidInput(from);
        if (value === ".") {
          const indexOfDot = from.indexOf(".");
          if (indexOfDot === -1) {
            this.setState(
              {
                from: from === "0" ? "0." : from + value,
              },
              this.calculate_length
            );
          }
        } else if (valid) {
          this.setState(
            {
              from: from === "0" ? value : from + value,
            },
            this.calculate_length
          );
        }
      }
      if (name === "to" && to.length < 15) {
        let valid = isValidInput(to);
        if (value === ".") {
          const indexOfDot = to.indexOf(".");
          if (indexOfDot === -1) {
            this.setState(
              {
                to: to === "0" ? "0." : to + value,
              },
              this.calculate_length
            );
          }
        } else if (valid) {
          this.setState(
            {
              to: to === "0" ? value : to + value,
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
    const name = document.getElementById("current").attributes.name.value;
    const fromValue = parseFloat(this.state.from);
    const toValue = parseFloat(this.state.to);
    if (name === "from") {
      let convertedValue = fromValue * Conversion[item1][item2];
      convertedValue =
        convertedValue.toString().length > 15
          ? convertedValue.toPrecision(9).toString()
          : convertedValue.toString();

      this.setState({
        to: convertedValue,
      });
    }
    if (name === "to") {
      let convertedValue = toValue / Conversion[item1][item2];
      convertedValue =
        convertedValue.toString().length > 15
          ? convertedValue.toPrecision(9).toString()
          : convertedValue.toString();
      this.setState({
        from: convertedValue,
      });
    }
  };
  backspace = () => {
    const name = document.getElementById("current").attributes.name.value;
    if (name === "from" && this.state.from !== "0") {
      let obj = { name: "from" };
      this.Backspace(obj, this.calculate_length);
    }
    if (name === "to" && this.state.to !== "0") {
      let obj = { name: "to" };
      this.Backspace(obj, this.calculate_length);
    }
  };
  reset = () => {
    const obj = [{ name: "from" }, { name: "to" }];
    this.Reset(obj);
  };

  render() {
    console.log("length re-render");
    return (
      <div className="Current-box">
        <HeaderWithBackBtn name="Length" reset={this.props.reset} />
        <div className="contentSection">
          <div className="items">
            <div>
              <select id="item1" onChange={this.calculate_length}>
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
            </div>
            <span
              id="current"
              name="from"
              className="choose"
              onClick={ChangeSelectedInput}
            >
              {this.state.from}
            </span>
          </div>
          <div className="items">
            <div>
              <select id="item2" onChange={this.calculate_length}>
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
            </div>
            <span name="to" className="choose" onClick={ChangeSelectedInput}>
              {this.state.to}
            </span>
          </div>
        </div>
        <div className="keypad_section">
          <BasicKeypad onClick={this.onClick}/>
        </div>
      </div>
    );
  }
}

export default Length;
