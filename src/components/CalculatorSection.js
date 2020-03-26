import React, { Component } from "react";
import Result from "./Result";
import Keypad from "./keypad";

class CalculatorSection extends Component {
  state = {
    result: "0",
    arr:[]
  };

  onClick = val => {
    if (val === "=") {
      if (this.state.result.length > 1) this.calculate();
    } else if (val === "Ac") {
      this.reset();
    } else if (val === "backspace") {
      this.backspace();
    } else {
      const last_val = this.state.result.charAt(this.state.result.length - 1);
      if (
        ( last_val === "+" ||
          last_val === "-" ||
          last_val === "*" ||
          last_val === "/" ||
          last_val === "%") &&
        (val === "+" ||
          val === "-" ||
          val === "*" ||
          val === "/" ||
          val === "%")
      ) {
        this.setState({
          result: this.state.result.slice(0, -1) + val+" "
        });
      } else{
        if (val === ".") {
          const k = this.state.result.split(/[+ - * /]/);
          const last_value = k[k.length - 1];
          if (last_value.indexOf(".") === -1) {
            this.setState({
              result: this.state.result + val
            });
          }
        }
        if (val !== ".") {
          this.setState({
            result: this.state.result + val 
          });
        }
      }
    }
  };
  calculate = () => {
    try {
      console.log(this.state.result);
      const first_lt = this.state.result[0];
      const op = this.state.result[1];
      if (first_lt === "0" && (op === "%" || op === "*" || op === "/")) {
        this.setState({
          result: "0"
        });
      } else {
        if (first_lt === "0") {
          
          this.setState({
            result: eval(this.state.result.slice(1)) + ""
          });
        } else {
          this.setState({
            result: eval(this.state.result) + ""
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  reset = () => {
    this.setState({
      result: "0"
    });
  };

  backspace = () => {
    if (
      this.state.result !== "0" &&
      this.state.result !== "" &&
      this.state.result.length > 1
    ) {
      this.setState({
        result: this.state.result.slice(0, -1)
      });
    } else {
      this.setState({
        result: "0"
      });
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
