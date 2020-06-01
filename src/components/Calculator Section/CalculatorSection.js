import React, { Component } from "react";
import Result from "./Result";
import Keypad from "./keypad";

class CalculatorSection extends Component {
  state = {
    result: ["0"],
  };

  onClick = (val) => {
    if (val === "=") {
      if (this.state.result.length > 1) this.calculate();
    } else if (val === "Ac") {
      this.reset();
    } else if (val === "backspace") {
      this.backspace();
    } else if (
      val === "+" ||
      val === "-" ||
      val === "*" ||
      val === "/" ||
      val === "%"
    ) {
      let textArray = [...this.state.result];
      const last_val = textArray[textArray.length - 1];
      if (
        last_val === "+" ||
        last_val === "-" ||
        last_val === "*" ||
        last_val === "/" ||
        last_val === "%"
      ) {
        textArray.pop();
        textArray.push(val);
        this.setState({
          result: textArray,
        });
      } else {
        textArray.push(val);
        this.setState({
          result: textArray,
        });
      }
    } else {
      let current;
      let textArray = [...this.state.result];
      if (textArray.length >= 1) {
        current = textArray[textArray.length - 1];
        const regexp = /\d|\.+/g;
        if (regexp.test(current)) {
          if (val === ".") {
            if (current === "0") {
              current = "0.";
            } else if (current.indexOf(".") === -1) {
              current += val;
            }
          } else if (current === "0") {
            current = val;
          } else {
            current += val;
          }
          textArray.pop();
          textArray.push(current);
          this.setState({
            result: textArray,
          });
        } else {
          textArray.push(val);
          this.setState({
            result: textArray,
          });
        }
      }
    }
  };
  calculate = () => {
    try {
      const last = this.state.result[this.state.result.length - 1];
      if (
        last !== "+" &&
        last !== "-" &&
        last !== "*" &&
        last !== "/" &&
        last !== "%"
      ) {
        const tocalculate = this.state.result.join(" ");
        this.setState({
          result: [String(eval(tocalculate))],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  reset = () => {
    this.setState({
      result: ["0"],
    });
  };

  backspace = () => {
    if (this.state.result.length >= 1) {
      const last = this.state.result[this.state.result.length - 1];
      if (last.length > 1) {
        const newArr = [...this.state.result];
        newArr.pop();
        newArr.push(last.slice(0, -1));
        this.setState({
          result: newArr,
        });
      } else if (this.state.result.length === 1 && last.length === 1) {
        this.setState({
          result: ["0"],
        });
      } else {
        const newArr = [...this.state.result];
        newArr.pop();
        this.setState({
          result: newArr,
        });
      }
    }
  };
  render() {
    return (
      <div className="container">
        <Result result={this.state.result} />
        <Keypad onClick={this.onClick} />
      </div>
    );
  }
}

export default CalculatorSection;
