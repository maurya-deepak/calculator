import React, { Component } from "react";
import Result from "./Result";
import Keypad from "./keypad";

class CalculatorSection extends Component {
  state = {
    result: "0",
    expression: ["0"],
    isEqualClicked: false,
    isSpanActive: false,
    isOperatorActive: false,
  };

  onClick = (val) => {
    const checkSigns = /(\+|-|\*|\/|%)/i;
    if (val === "=") {
      this.setState({ isEqualClicked: true });
      this.active_result();
    } else if (val === "Ac") {
      this.reset();
    } else if (val === "backspace") {
      if (this.state.isSpanActive) {
        this.handleSpanBackSpace();
      } else {
        this.backspace();
      }
    } else if (checkSigns.test(val)) {
      if (this.state.isOperatorActive || this.state.isSpanActive) {
        this.handleSpanChanges(val);
      } else {
        let textArray = [...this.state.expression];
        const last_val = textArray[textArray.length - 1];
        if (checkSigns.test(last_val)) {
          textArray.pop();
          textArray.push(val);
          this.setState({
            expression: textArray,
          });
          if (this.state.isEqualClicked) {
            this.setState({ isEqualClicked: false }, this.active_exp);
          }
        } else {
          if (this.state.isEqualClicked) {
            let newArr = [this.state.result];
            newArr.push(val);
            this.setState(
              {
                expression: newArr,
                isEqualClicked: false,
              },
              this.active_exp
            );
          } else {
            textArray.push(val);
            this.setState({
              expression: textArray,
            });
          }
        }
      }
    } else {
      if (this.state.isEqualClicked) {
        if (val === ".") {
          this.setState(
            {
              expression: ["0."],
              isEqualClicked: false,
            },
            this.calculate
          );
        } else {
          this.setState(
            {
              expression: [val],
              isEqualClicked: false,
            },
            this.calculate
          );
        }
        this.active_exp();
      } else {
        if (this.state.isOperatorActive || this.state.isSpanActive)
          this.handleSpanChanges(val);
        else this.handleDigits(val);
      }
    }
  };

  handleDigits = (val) => {
    let current;
    let textArray = [...this.state.expression];
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
        } else if (current.length < 15) {
          current += val;
        }
        textArray.pop();
        textArray.push(current);
        this.setState(
          {
            expression: textArray,
            isEqualClicked: false,
          },
          this.calculate
        );
      } else {
        const checkSigns = /(\+|-|\*|\/)/i;
        if (val === "." && checkSigns.test(current)) {
          val = "0.";
        }
        textArray.push(val);
        this.setState(
          {
            expression: textArray,
            isEqualClicked: false,
          },
          this.calculate
        );
      }
    }
  };

  handleSpanChanges = (val) => {
    const activeSpan = document.querySelector(".active-exp-span");
    let expression = [...this.state.expression];
    const checkSigns = /(\+|-|\*|\/|%)/i;
    if (checkSigns.test(val) || expression[activeSpan.id] === "0") {
      expression[activeSpan.id] = val;
      this.setState({ expression }, this.calculate);
    } else if (expression[activeSpan.id].length < 15) {
      expression[activeSpan.id] += val;
      this.setState({ expression }, this.calculate);
    }
  };

  handleSpanBackSpace = () => {
    const activeSpan = document.querySelector(".active-exp-span");
    let expression = [...this.state.expression];
    let current = expression[activeSpan.id];
    if (current.length > 1) {
      expression[activeSpan.id] = current.slice(0, -1);
      this.setState({ expression }, this.calculate);
    } else {
      expression[activeSpan.id] = "0";
      this.setState({ expression }, this.calculate);
    }
  };
  calculate = () => {
    try {
      let exp = [...this.state.expression];
      const last = exp[exp.length - 1];
      const checkSigns = /(\+|-|\*|\/|%)/i;
      if (checkSigns.test(last)) {
        exp.pop();
      }
      if (last === ".") {
        exp.pop();
        exp.push("0.");
      }
      const tocalculate = exp.join(" ");
      let result = String(eval(tocalculate));
      result =
        result.length > 15 ? parseFloat(result).toExponential(4) : result;
      this.setState({ result });
    } catch (e) {
      console.log(e);
    }
  };
  active_exp = () => {
    const expression = document.querySelector(".expression");
    const result_element = document.querySelector(".active-result");
    expression.classList.add("active-result");
    result_element.classList.remove("active-result");
  };
  active_result = () => {
    const expression = document.querySelector(".active-result");
    const result_element = document.querySelector(".result");
    expression.classList.remove("active-result");
    result_element.classList.add("active-result");
  };
  reset = () => {
    this.setState({
      result: "0",
      expression: ["0"],
    });
  };

  backspace = () => {
    const exp = [...this.state.expression];
    if (exp.length >= 1) {
      const last = exp[exp.length - 1];
      if (last.length > 1) {
        const newArr = [...exp];
        newArr.pop();
        newArr.push(last.slice(0, -1));
        this.setState(
          {
            expression: newArr,
          },
          this.calculate
        );
      } else if (exp.length === 1 && last.length === 1) {
        this.setState({
          expression: ["0"],
          result: "0",
        });
      } else {
        const newArr = [...exp];
        newArr.pop();
        this.setState(
          {
            expression: newArr,
          },
          this.calculate
        );
      }
    }
  };

  toggleisActiveSpan = () => {
    this.setState({
      isSpanActive: false,
      isOperatorActive: false,
    });
    const activeSpan = document.querySelector(".active-exp-span");
    activeSpan && activeSpan.classList.remove("active-exp-span");
  };

  onSpanClick = (event) => {
    if (this.state.isEqualClicked) {
      this.active_exp();
      this.setState({ isEqualClicked: false });
    }
    const activeSpan = document.querySelector(".active-exp-span");
    activeSpan && activeSpan.classList.remove("active-exp-span");
    event.target.classList.add("active-exp-span");

    if (isNaN(event.target.innerText)) {
      this.setState({ isOperatorActive: true, isSpanActive: false });
    } else {
      this.setState({ isSpanActive: true, isOperatorActive: false });
    }
  };
  render() {
    return (
      <div className="container">
        <Result
          result={this.state.result}
          expression={this.state.expression}
          onSpanClick={this.onSpanClick}
        />
        <Keypad
          onClick={this.onClick}
          isSpanActive={this.state.isSpanActive}
          isOperatorActive={this.state.isOperatorActive}
          toggleisActiveSpan={this.toggleisActiveSpan}
        />
      </div>
    );
  }
}

export default CalculatorSection;
