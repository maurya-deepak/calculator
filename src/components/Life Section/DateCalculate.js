import React, { Component , lazy} from "react";
import HeaderWithBackBtn from "../Reusable/HeaderWithBackBtn";
import DatePickerCustom from "../Reusable/DatePickerCustom";
import {findDay}  from '../Reusable/FindDay';
import moment from 'moment';
const Calendar = lazy(() => import('react-calendar'));

class DateCalculate extends Component {
  state = {
    startDate1: new Date(),
    startDate2: new Date(),
    show_cal: false,
    isfirst_date: false,
    issec_date: false,
    cal_date: new Date(),
    year: 0,
    months: 0,
    days: 0,
  };

  componentDidMount() {
    document.addEventListener("click", this.hideCalendar);
    this.calulateDifference();
  }
  calulateDifference = ()=>{
    const from_date = this.state.startDate1;
    const to_date = this.state.startDate2;

    const from = moment(this.state.startDate1);
    const to = moment(this.state.startDate2);
    const TotalYears = Math.abs(to.diff(from, "years"));
    const TotalMonths = Math.abs(to.diff(from, "months"));
    const months = TotalMonths - (TotalYears * 12);
    
    const utcDate1 = new Date(Date.UTC(from_date.getFullYear(), from_date.getMonth(), from_date.getDate()));
    const utcDate2 = new Date(Date.UTC(to_date.getFullYear(), to_date.getMonth(), to_date.getDate()));
    let days;
    if(utcDate1 >= utcDate2){
      days = findDay(utcDate2, utcDate1);
    }else{
      days = findDay(utcDate1, utcDate2);
    }
    
    this.setState({
      year: TotalYears,
      months: months,
      days : days
    });
    
  }
  handlechange = (date) => {
    if (this.state.isfirst_date) {
      this.setState(
        {
          startDate1: date,
        },
        this.calulateDifference
      );
    }
    if (this.state.issec_date) {
      this.setState(
        {
          startDate2: date,
        },
        this.calulateDifference
      );
    }
    this.setState({
      show_cal: false,
    });
  };

  showCalendar = (e, show_name) => {
    if (
      e.target.parentElement.id === "date_with_icon" &&
      this.state.show_cal === false
    ) {
      this.setState({
        show_cal: true,
      });
    }
    if (show_name === "From") {
      this.setState({
        isfirst_date: true,
        issec_date: false,
        cal_date: this.state.startDate1,
      });
    }
    if (show_name === "To") {
      this.setState({
        issec_date: true,
        isfirst_date: false,
        cal_date: this.state.startDate2,
      });
    }
  };

  hideCalendar = (e) => {
    let current = e.target;
    if (this.state.show_cal && current !== null && current.id !== "date_row") {
      while (current !== null && !current.classList.contains("calendar")) {
        if (
          current.className === "main-container" ||
          current.nodeName === "HTML"
        ) {
          break;
        }
        current = current.parentElement;
      }
      if (
        current !== null &&
        (current.className === "main-container" || current.nodeName === "HTML")
      ) {
        this.setState({
          show_cal: false,
        });
      }
    }
  };

  render() {
    return (
      <div className="Current-box">
        <HeaderWithBackBtn reset={this.props.reset} name="Date" />
        <div className="content">
          <DatePickerCustom
            show_name="From"
            showCalendar={(e, name) => this.showCalendar(e, name)}
            date={this.state.startDate1}
          />
          <DatePickerCustom
            show_name="To"
            showCalendar={(e, name) => this.showCalendar(e, name)}
            date={this.state.startDate2}
          />
          {this.state.show_cal ? (
            <Calendar
              value={this.state.cal_date}
              onChange={this.handlechange}
              className="calendar"
            />
          ) : null}
          <div className="diffrence_date">
            <p id="subHeading">Difference</p>
            <div className="totalSummary-content-row">
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
    );
  }
}

export default DateCalculate;
