import React, { Component } from "react";
import HeaderWithBackBtn from './Header_with_back_btn';

class Discount extends Component {
  render() {
    return (
      <div className="Current-box">
        <HeaderWithBackBtn reset={this.props.reset} name="Discount" />
        <div className="content_section">
            <div className="items">
                <p>Original price</p>
                <input type="text" readOnly value="100"/>
            </div>
            <div className="items">
                <p>Discount (% off)</p>
                <input type="text" readOnly value="100"/>
            </div>
            <div className="items">
                <p>Final price</p>
                <input type="text" readOnly value="100"/>
            </div>
        </div>
      </div>
    );
  }
}
export default Discount;
