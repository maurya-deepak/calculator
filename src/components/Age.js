import React, { Component } from "react";
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
    const startDate = this.state.startDate1;
    const endDate = this.state.startDate2;
    const summary = this.getSummary(startDate, endDate);
    let next_birthday_date;
    let nextBirthdayDetails;
    console.log(endDate.getMonth() < startDate.getMonth());
    if (endDate.getMonth() > startDate.getMonth()) {
      next_birthday_date = new Date(
        endDate.getFullYear() + 1,
        startDate.getMonth(),
        startDate.getDate()
      );
      console.log("birthday ho ke gya......");
      console.log(next_birthday_date);
      nextBirthdayDetails = this.getSummary(endDate, next_birthday_date);
    } else if (endDate.getMonth() < startDate.getMonth()) {
      next_birthday_date = new Date(
        endDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      console.log("Birthday aane wala hai");
      console.log(next_birthday_date);
      nextBirthdayDetails = this.getSummary(endDate, next_birthday_date);
    } else {
      if (endDate.getDate() > startDate.getDate()) {
        next_birthday_date = new Date(
          endDate.getFullYear() + 1,
          startDate.getMonth(),
          startDate.getDate()
        );
        nextBirthdayDetails = this.getSummary(endDate, next_birthday_date);
      } else {
        next_birthday_date = new Date(
          endDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        );
        nextBirthdayDetails = this.getSummary(endDate, next_birthday_date);
      }
    }
    console.log(nextBirthdayDetails);
    if (summary) {
      let nextBirthdayDays;
      let nextBirthdayMonths;
      if (nextBirthdayDetails) {
        const avgNumberOfDaysInMonth = 30.436875;
        const temp = nextBirthdayDetails.diffDays / 30.436875;
        nextBirthdayMonths = Math.floor(temp);
        nextBirthdayDays = Math.round((temp - nextBirthdayMonths) * 30.436875);
      }
      const days_arr = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      // get age in months and days
      this.calulate_age_in_monthsDays(
        this.state.startDate1,
        this.state.startDate2,
        summary.months,
        summary.totalYears
      );

      this.setState({
        TotalDays: summary.diffDays,
        TotalMonths: summary.months,
        TotalWeeks: summary.diffweeks,
        TotalHours: summary.diffHours,
        TotalMinutes: summary.diffMins,
        TotalYears: summary.totalYears,
        nextbirthday_months: nextBirthdayMonths ? nextBirthdayMonths : 0,
        nextbirthday_days: nextBirthdayDays ? nextBirthdayDays : 0,
        nextbirthday_day: days_arr[next_birthday_date.getDay()],
      });
    } else {
      this.setState({
        dob_notValid: true,
      });
      setTimeout(() => {
        this.setState({
          dob_notValid: false,
        });
      }, 1000);
    }
  };

  getSummary = (st_date, en_date) => {
    let utc1 = Date.UTC(
      st_date.getFullYear(),
      st_date.getMonth(),
      st_date.getDate()
    );
    let utc2 = Date.UTC(
      en_date.getFullYear(),
      en_date.getMonth(),
      en_date.getDate()
    );
    const one_hour = 1000 * 60 * 60;
    let diffTime = utc2 - utc1;

    if (diffTime >= 0) {
      const diffDays = Math.round(diffTime / (one_hour * 24));
      const diffweeks = Math.floor(diffTime / (one_hour * 24 * 7));
      const diffHours = diffTime / one_hour;
      const diffMins = Math.round(diffTime / (1000 * 60));
      let months = (en_date.getFullYear() - st_date.getFullYear()) * 12;
      months -= st_date.getMonth();
      months += en_date.getMonth();
      months = st_date.getDate() > en_date.getDate() ? months - 1: months;
      const totalYears = Math.floor(months / 12);
      return { diffDays, diffweeks, diffHours, diffMins, months, totalYears };
    }
    return null;
  };
  calulate_age_in_monthsDays = (s_Date, e_Date, totalmonths, totalyears) => {
    const age_days = this.findDay(s_Date, e_Date);
    const age_months = totalmonths - totalyears * 12;
    console.log(age_months);
    this.setState({
      Age_days: age_days,
      Age_months: age_months,
    });
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
