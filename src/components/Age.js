import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import HeaderWithBackBtn from "./Header_with_back_btn";
import DatePickerCustom from "./DatePicker_Custom";

class Age extends Component {
  state = {
    startDate1: new Date(),
    startDate2: new Date(),
    TotalYears: 0,
    TotalMonths: 0,
    TotalWeeks: 0,
    TotalDays: 0,
    TotalHours: 0,
    TotalMinutes: 0
  };

  handleChange1 = date => {
    this.setState({
      startDate1: date
    });
    this.calulate_Age();
  };

  handleChange2 = date => {
    this.setState({
      startDate2: date
    });
    console.log(date);
    this.calulate_Age();
  };

  calulate_Age = () => {
    const diffTime = Math.abs(this.state.startDate2 - this.state.startDate1);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    const diffweeks = Math.round(diffTime / (1000 * 60 * 60 * 24 * 7));
    const diffHours = Math.round(diffTime / (1000 * 60 * 60));
    const diffMins = Math.round(diffTime / (1000 * 60));
    let months =
      (this.state.startDate2.getFullYear() -
        this.state.startDate1.getFullYear()) *
      12;
    months -= this.state.startDate1.getMonth();
    months += this.state.startDate2.getMonth();

    this.setState({
      TotalDays: diffDays - 1,
      TotalMonths: Math.abs(months),
      TotalWeeks: diffweeks - 1,
      TotalHours: diffHours,
      TotalMinutes: diffMins,
      TotalYears: Math.abs(Math.floor(months / 12))
    });
  };
  render() {
    return (
      <div className="Current-box">
        <HeaderWithBackBtn reset={this.props.reset} name="Age" />
        <div className="content">
          <DatePickerCustom
            show_name="Date of Birth"
            change={this.handleChange1}
          />
          <DatePickerCustom
            show_name="Today's Date"
            change={this.handleChange2}
          />
          <div className="summary">
            <div className="summary-row1">
              <div className="summary-big-box">
                <p className="age-title">Age</p>
                <p className="year">
                  {this.state.TotalYears}
                  <span>yrs</span>
                </p>
              </div>
              <div className="summary-big-box">
                <p className="nextbirthday-heading">Next birthday</p>
                <FontAwesomeIcon className="cakeicon" icon={faBirthdayCake} />
              </div>
            </div>
            <div className="TotalSummary">
              <p className="summary-heading">Total Summary</p>
              <div className="totalSummary-content">
                <div className="totalSummary-content-row">
                  <div className="summary-box">
                    <p className="sbfont">Years</p>
                    <p>{this.state.TotalYears}</p>
                  </div>
                  <div className="summary-box">
                    <p className="sbfont">Months</p>
                    <p>{this.state.TotalMonths}</p>
                  </div>
                  <div className="summary-box">
                    <p className="sbfont">Weeks</p>
                    <p>{this.state.TotalWeeks}</p>
                  </div>
                </div>
                <div className="totalSummary-content-row sbfont">
                  <div className="summary-box">
                    <p>Days</p>
                    <p>{this.state.TotalDays}</p>
                  </div>
                  <div className="summary-box">
                    <p>Hours</p>
                    <p>{this.state.TotalHours}</p>
                  </div>
                  <div className="summary-box">
                    <p>Minutes</p>
                    <p>{this.state.TotalMinutes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Age;
