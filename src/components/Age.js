import React, { Component } from "react";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import HeaderWithBackBtn from "./Header_with_back_btn";
import DatePickerCustom from "./DatePicker_Custom";
import Error from "./Error";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class Age extends Component {
  state = {
    startDate1: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    startDate2: new Date(),
    cal_date: new Date(),
    Age_months: 0,
    Age_days: 0,
    TotalYears: 0,
    TotalMonths: 0,
    TotalWeeks: 0,
    TotalDays: 0,
    TotalHours: 0,
    TotalMinutes: 0,
    show_cal: false,
    isfirst_date: false,
    issec_date: false,
    dob_notValid: false,
    nextbirthday_days: 0,
    nextbirthday_months: 0,
    nextbirthday_day: "",
  };

  componentDidMount() {
    document.addEventListener("click", this.hideCalendar);
    this.calulate_Age();
  }
  calulate_Age = () => {
    const org_startDate = this.state.startDate1;
    const org_endDate = this.state.startDate2;
    let m_startDate = moment(org_startDate); // date of birth
    let m_endDate = moment(org_endDate); // today's date
    // bottom summary
    const bottom_summary = this.getSummary(m_startDate, m_endDate);
  
    this.setState({
      TotalYears: bottom_summary.TotalYears,
      TotalMonths: bottom_summary.TotalMonths,
      TotalWeeks: bottom_summary.TotalWeeks,
      TotalDays: bottom_summary.TotalDays,
      TotalHours: bottom_summary.TotalHours,
      TotalMinutes: bottom_summary.TotalMinutes,
    });

    // right side summary
    let m_nextbirthday;
    if (
      org_startDate.getMonth() < org_endDate.getMonth() ||
      (org_startDate.getMonth() === org_endDate.getMonth() &&
        org_startDate.getDate() < org_endDate.getDate()) ||
      (org_startDate.getMonth() === org_endDate.getMonth() &&
        org_startDate.getDate() === org_endDate.getDate())
    ) {
      m_nextbirthday = moment(
        new Date(
          org_endDate.getFullYear() + 1,
          org_startDate.getMonth(),
          org_startDate.getDate()
        )
      );
    } else {
      m_nextbirthday = moment(
        new Date(
          org_endDate.getFullYear(),
          org_startDate.getMonth(),
          org_startDate.getDate()
        )
      );
    }
    m_startDate = m_endDate;
    const rightside_summary = this.getSummary(m_startDate, m_nextbirthday);
    console.log(m_startDate.toDate(), m_nextbirthday.toDate());
    const days = this.findDay(m_startDate.toDate(), m_nextbirthday.toDate());

    const days_arr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    
    this.setState({
      nextbirthday_months:
        days === 0 && rightside_summary.TotalMonths >= 1
          ? rightside_summary.TotalMonths + 1
          : rightside_summary.TotalMonths,
      nextbirthday_days:
        days === 0 && rightside_summary.TotalMonths === 0
          ? rightside_summary.TotalDays
          : days,
      nextbirthday_day: days_arr[m_nextbirthday.toDate().getDay()],
    });

    // left side summary
    const Age_months =
      bottom_summary.TotalMonths - bottom_summary.TotalYears * 12;
    const Age_days = this.findDay(org_startDate, org_endDate);
    this.setState({
      Age_months: Age_months,
      Age_days: Age_days,
    });
  };

  getSummary = (startDate, endDate) => {
    const TotalYears = endDate.diff(startDate, "years");
    const TotalMonths = endDate.diff(startDate, "months");
    const TotalWeeks = endDate.diff(startDate, "weeks");
    const TotalDays = endDate.diff(startDate, "days");
    const TotalHours = endDate.diff(startDate, "hours");
    const TotalMinutes = endDate.diff(startDate, "minutes");
    return {
      TotalYears,
      TotalMonths,
      TotalWeeks,
      TotalDays,
      TotalHours,
      TotalMinutes,
    };
  };

  leapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  findDay = (stDate, eDate) => {
    const startDate = stDate.getDate();
    let startMonth = stDate.getMonth() + 1;
    const endDate = eDate.getDate();
    const endMonth = eDate.getMonth() + 1;
    const endYear = eDate.getFullYear();
    const months = {
      Jan: 31,
      Feb: 0,
      Mar: 31,
      Apr: 30,
      May: 31,
      Jun: 30,
      Jul: 31,
      Aug: 31,
      Sept: 30,
      Oct: 31,
      Nov: 30,
      Dec: 31,
    };

    if (this.leapYear(endYear)) {
      months["Feb"] = 29;
    } else {
      months["Feb"] = 28;
    }
    const monthKeys = Object.keys(months);

    if (startDate > endDate) {
      startMonth = endMonth - 1;
      if (startMonth === 0) {
        startMonth = 12;
      }
      const currentMonthDay = monthKeys[startMonth - 1];
      return endDate + (months[currentMonthDay] - startDate);
    } else {
      return endDate - startDate;
    }
  };
  handlechange = (date) => {
    if (this.state.isfirst_date) {
      this.setState(
        {
          startDate1: date,
        },
        this.calulate_Age
      );
    }
    if (this.state.issec_date) {
      this.setState(
        {
          startDate2: date,
        },
        this.calulate_Age
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
    if (show_name === "Date of Birth") {
      this.setState({
        isfirst_date: true,
        issec_date: false,
        cal_date: this.state.startDate1,
      });
    }
    if (show_name === `Today's Date`) {
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
        {this.state.dob_notValid ? <Error /> : null}
        <HeaderWithBackBtn reset={this.props.reset} name="Age" />
        <div className="content">
          <DatePickerCustom
            show_name="Date of Birth"
            showCalendar={(e, name) => this.showCalendar(e, name)}
            date={this.state.startDate1}
          />
          <DatePickerCustom
            show_name="Today's Date"
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
          <div className="summary">
            <div className="summary-row1">
              <div className="summary-big-box">
                <p className="age-title">Age</p>
                <p className="year">
                  {this.state.TotalYears}
                  <span>years</span>
                </p>
                <div className="next_birth_dm">
                  <p className="sbfont">{this.state.Age_months} months</p>
                  <p className="sbfont" id="border">
                    {this.state.Age_days} days
                  </p>
                </div>
              </div>
              <div className="summary-big-box">
                <p className="nextbirthday-heading">Next birthday</p>
                <div className="nextbirthday_icon">
                  <FontAwesomeIcon className="cakeicon" icon={faBirthdayCake} />
                </div>
                <p className="sbfont">{this.state.nextbirthday_day}</p>
                <div className="next_birth_dm">
                  <p className="sbfont">
                    {this.state.nextbirthday_months} months
                  </p>
                  <p className="sbfont" id="border">
                    {this.state.nextbirthday_days} days
                  </p>
                </div>
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
