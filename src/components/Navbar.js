import React, { Component } from "react";

class Navbar extends Component {
    state={
        
    }
  render() {
    const active = "active";
    return (
      <div className="nav-container">
        <ul className="navbar">
          <li
            onClick={this.props.cal}
            className={this.props.cal_active ? active : ""}
          >
            Calculator
          </li>
          <li
            onClick={this.props.life}
            className={this.props.life_active ? active : ""}
          >
            Life
          </li>
          <li
            onClick={this.props.finance}
            className={this.props.finance_active ? active : ""}
          >
            Finance
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
