import React, { Component } from "react";
import HeaderWithBackBtn from "./Header_with_back_btn";
import DatePickerCustom from "./DatePicker_Custom";

class DateCalculate extends Component {
  state = {
    startDate1: new Date(),
    startDate2: new Date(),
    year: 0,
    months: 0,
    days: 0
  };

  sestDate_1 = event => {
    this.setState({
      startDate1: event
    });

    this.calulate_change_Date();
  };

  setDate_2 = event => {
    this.setState({
      startDate2: event
    }); 
    this.calulate_change_Date();
  };

  calulate_change_Date = () => {
    console.log();
   
    const diffTime = Math.abs(this.state.startDate2 - this.state.startDate1);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffTime, diffDays);
    let months =
      (this.state.startDate2.getFullYear() -
        this.state.startDate1.getFullYear()) *
      12;
    months -= this.state.startDate1.getMonth();
    months += this.state.startDate2.getMonth();

    const year = Math.abs(Math.floor(months / 12));

    this.setState({
      year: year,
      months: months,
      date: diffDays
    });
  };

  render() {
    return (
      <div className="Current-box">
        <HeaderWithBackBtn reset={this.props.reset} name="Date" />
        <div className="content">
          <DatePickerCustom show_name="From" change={this.setDate_1} />
          <DatePickerCustom show_name="To" change={this.setDate_2} />
          <div className="diffrence_date">
            <div className="min_heading">
              <h1>Difference</h1>
              <div className="content-row">
                <div className="summary-box">
                  <p className="sbfont">Years</p>
                  <p>{this.state.year}</p>
                </div>
                <div className="summary-box">
                  <p className="sbfont">Months</p>
                  <p>{this.state.months}</p>
                </div>
                <div className="summary-box">
                  <p className="sbfont">Days</p>
                  <p>{this.state.days}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DateCalculate;
