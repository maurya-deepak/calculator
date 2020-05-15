import React, { Component } from "react";
import HeaderWithBackBtn from "./Header_with_back_btn";
import BasicKeypad from "./BasicKeypad";

class Discount extends Component {
  state = {
    original_price: '0',
    discount: '0',
    final_price: '0',
    save: '0',
  };
  onClick = (value) => {
    if (value === "Ac") {
      this.reset();
    } else if (value === "backspace") {
      this.backspace();
    } else {
      const current = document.getElementById("current");
      const name = current.name;
      const original_price = this.state.original_price;
      const discount = this.state.discount;

      if (name === "original_price" && original_price.length < 15) {
        let valid = original_price.split(".");
        if (valid[1] !== undefined) {
          valid = valid[1].length <= 1;
        }
        if (value === ".") {
          const indexOfDot = original_price.indexOf(".");
          if (indexOfDot === -1) {
            this.setState(
              {
                original_price:
                original_price === '0'
                    ? "0."
                    : parseFloat(original_price) + value,
              },
              this.calculateDiscount
            );
          }
        } else if (valid) {
          this.setState(
            {
              original_price:
              original_price === '0'
                  ? value
                  : parseFloat(original_price + value).toString(),
            },
            this.calculateDiscount
          );
        }
      }
      if (name === "discount") {
        const isLessOrEqual = parseFloat(discount + value) <= 100.0;
        let valid = discount.split(".");
        if (valid[1] !== undefined) {
          valid = valid[1].length <= 1;
        }
        if (value === ".") {
          const indexOfDot = discount.indexOf(".");
          if (indexOfDot === -1 && isLessOrEqual) {
            this.setState(
              {
                discount:
                discount === '0'
                    ? "0."
                    : parseFloat(discount) + value,
              },
              this.calculateDiscount
            );
          }
        } else if (isLessOrEqual && valid) {
          this.setState(
            {
              discount:
              discount === '0'
                  ? value
                  : parseFloat(discount + value).toString(),
            },
            this.calculateDiscount
          );
        }
      }
    }
  };

  reset = () => {
    const current = document.getElementById("current");
    const name = current.name;
    if (name === "original_price") {
      this.setState({
        original_price: '0',
        final_price: '0',
        save: '0'
      });
    } else {
      this.setState({
        discount: '0'
      });
    }
  };

  backspace = () => {
    const current = document.getElementById("current");
    const name = current.name;
    console.log(typeof (this.state.original_price));
    console.log(this.state.original_price);
    if (name === "original_price" && this.state.original_price !== '0') {
      this.setState(
        {
          original_price:
            this.state.original_price.length === 1
              ? '0'
              : this.state.original_price.slice(0, -1),
        },
        this.calculateDiscount
      );
    }
    if (name === "discount" && this.state.discount !== '0') {
      this.setState(
        {
          discount:
            this.state.discount.length === 1
              ? '0'
              : this.state.discount.slice(0, -1),
        },
        this.calculateDiscount
      );
    }
  };
  change = (e) => {
    const current_element = e.target;
    const current_id = document.getElementById("current");
    if (current_element !== current_id) {
      current_id.id = "";
      current_element.id = "current";
    }
  };
  calculateDiscount = () => {
    const originalPrice = parseFloat(this.state.original_price);
    const discountAmount = parseFloat(this.state.discount);
    console.log(originalPrice, discountAmount);
    const saving = +((originalPrice * discountAmount) / 100).toFixed(2);
    const finalPrice = +(originalPrice - saving).toFixed(2);
    this.setState({
      final_price: finalPrice.toString(),
      save: saving.toString()
    });
  };
  render() {
    return (
      <div className="Current-box">
        <HeaderWithBackBtn reset={this.props.reset} name="Discount" />
        <div className="content_section">
          <div className="content_section_1">
            <div className="items">
              <p>Original price</p>
              <input
                type="text"
                name="original_price"
                value={this.state.original_price}
                id="current"
                readOnly
                onClick={this.change}
                className="choose"
              />
            </div>
            <div className="items">
              <p>Discount (% off)</p>
              <input
                type="text"
                name="discount"
                value={this.state.discount}
                readOnly
                onClick={this.change}
                className="choose"
              />
            </div>
            <div className="items">
              <p>Final price</p>
              <input type="text"  className="finalPriceInput" readOnly value={this.state.final_price} />
            </div>
          </div>
          <div className="content_section_2">
            You save <input type="text" readOnly value={this.state.save} />
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
