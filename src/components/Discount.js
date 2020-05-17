import React, { Component } from "react";
import HeaderWithBackBtn from "./HeaderWithBackBtn";
import BasicKeypad from "./BasicKeypad";
import ChangeSelectedInput from "./ChangeSelectedInput";
import isValidInput from "./isValidInput";
import Reset from "./Reset";
import Backspace from "./Backspace";

class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      original_price: "0",
      discount: "0",
      final_price: "0",
      save: "0",
    };
    this.onClick = this.onClick.bind(this);
    this.calculateDiscount = this.calculateDiscount.bind(this);
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
      const original_price = this.state.original_price;
      const discount = this.state.discount;

      if (name === "original_price") {
        let valid = isValidInput(original_price);
        const indexOfDot = original_price.indexOf(".");

        let currentLength = parseInt(original_price).toString().length;
        let allowedlength = indexOfDot === -1 ? 15 : 17;

        if (value === ".") {
          if (indexOfDot === -1) {
            this.setState(
              {
                original_price:
                  original_price === "0" ? "0." : original_price + value,
              },
              this.calculateDiscount
            );
          }
        } else if (valid && currentLength < allowedlength) {
          this.setState(
            {
              original_price:
                original_price === "0" ? value : original_price + value,
            },
            this.calculateDiscount
          );
        }
      }
      if (name === "discount") {
        const isLessOrEqual = parseFloat(discount + value) <= 100.0;
        let valid = isValidInput(discount);
        if (value === ".") {
          const indexOfDot = discount.indexOf(".");
          if (indexOfDot === -1 && isLessOrEqual) {
            this.setState(
              {
                discount: discount === "0" ? "0." : discount + value,
              },
              this.calculateDiscount
            );
          }
        } else if (isLessOrEqual && valid) {
          this.setState(
            {
              discount: discount === "0" ? value : discount + value,
            },
            this.calculateDiscount
          );
        }
      }
    }
  };

  reset = () => {
    const name = document.getElementById("current").attributes.name.value;
    if (name === "original_price") {
      const obj = [
        { name: "original_price" },
        { name: "final_price" },
        { name: "save" },
      ];
      this.Reset(obj);
    } else {
      const obj = [{ name: "discount" }];
      this.Reset(obj);
    }
  };

  backspace = () => {
    const name = document.getElementById("current").attributes.name.value;
    if (name === "original_price" && this.state.original_price !== "0") {
      let obj = { name: "original_price" };
      this.Backspace(obj, this.calculateDiscount);
    }
    if (name === "discount" && this.state.discount !== "0") {
      let obj = { name: "discount" };
      this.Backspace(obj, this.calculateDiscount);
    }
  };

  calculateDiscount = () => {
    const originalPrice = parseFloat(this.state.original_price);
    const discountAmount = parseFloat(this.state.discount);
    const saving = ((originalPrice * discountAmount) / 100).toFixed(2);
    const finalPrice = (originalPrice - saving).toFixed(2);
    this.setState({
      final_price: finalPrice.toString(),
      save: saving.toString(),
    });
  };

  render() {
    return (
      <div className="Current-box">
        <HeaderWithBackBtn reset={this.props.reset} name="Discount" />
        <div className="content_section">
          <div className="content_section_1">
            <div className="items">
              <span>Original price</span>
              <span
                name="original_price"
                id="current"
                onClick={ChangeSelectedInput}
                className="choose"
              >
                {this.state.original_price}
              </span>
            </div>
            <div className="items">
              <span>Discount (% off)</span>
              <span
                type="text"
                name="discount"
                onClick={ChangeSelectedInput}
                className="choose"
              >
                {this.state.discount}
              </span>
            </div>
            <div className="items">
              <span>Final price</span>
              <span>{this.state.final_price}</span>
            </div>
          </div>
          <div className="content_section_2">
            <span>You save </span>
            <span>{this.state.save}</span>
          </div>
        </div>
        <div className="keypad_section">
          <BasicKeypad onClick={this.onClick} />
        </div>
      </div>
    );
  }
}
export default Discount;
