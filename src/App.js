import React, { Component } from "react";
import Navbar from "./components/Reusable/Navbar";
import CalculatorSection from "./components/Calculator Section/CalculatorSection";
import Life from "./components/Life Section/Life";
import Finance from "./components/Finance Section/Finance";
import "./App.css";

class App extends Component {
  state = {
    id: 0,
    show_nav: true,
    cal_active: true,
    life_active: false,
    finance_active: false,
  };
  cal = () => {
    this.setState({
      id: 0,
      cal_active: true,
      life_active: false,
      finance_active: false,
    });
  };
  life = () => {
    this.setState({
      id: 1,
      cal_active: false,
      life_active: true,
      finance_active: false,
    });
  };
  finance = () => {
    this.setState({
      id: 2,
      cal_active: false,
      life_active: false,
      finance_active: true,
    });
  };
  hideNav = () => {
    this.setState({
      show_nav: false,
    });
  };

  showNav = () => {
    this.setState({
      show_nav: true,
    });
  };

  render() {
    return (
      <div className="container-body">
        <div className="main-container">
          {this.state.show_nav ? (
            <Navbar
              cal={this.cal}
              finance={this.finance}
              life={this.life}
              cal_active={this.state.cal_active}
              finance_active={this.state.finance_active}
              life_active={this.state.life_active}
            />
          ) : null}
          {this.state.id === 0 ? <CalculatorSection /> : null}
          {this.state.id === 1 ? (
            <Life hideNav={this.hideNav} showNav={this.showNav} />
          ) : null}
          {this.state.id === 2 ? (
            <Finance hideNav={this.hideNav} showNav={this.showNav} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
