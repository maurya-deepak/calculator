import React, { Component } from "react";

class Calender extends Component {
  state = {
    date_arr: [],
    year_arr: [],
    month_arr: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mey",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };
  componentDidMount() {
    const new_arr = [];
    const new_date_arr = [];
    for (let i = 1900; i <= 2020; i++) {
      new_arr.push(i);
    }
    this.setState({
      year_arr: new_arr,
    });

    for (let i = 1; i <= 31; i++) {
      new_date_arr.push(i);
    }
    this.setState({
      date_arr: new_date_arr,
    });
  }
  render() {
    const date_ = this.state.date_arr;
    const date_arr = date_.map((date) => {
      return <li key={date}>{date}</li>;
    });
    const year_ = this.state.year_arr;
    const year_arr = year_.map((year) => {
      return <li key={year}>{year}</li>;
    });
    const month_ = this.state.month_arr;
    const month_arr = month_.map((month) => {
      return <li key={month}>{month}</li>;
    });

    return (
      <div className="custom_calender">
        <p>Calender</p>
        <div className="cal_top_li_gre"></div>
        <div className="selector"></div>
        <div className="container-dmy">
          <div className="test_cal">
            <div className="cal_date">
              <ul>{date_arr}</ul>
            </div>
          </div>
          <div className="test_cal">
            <div className="cal_month">
              <ul>{month_arr}</ul>
            </div>
          </div>
          <div className="test_cal">
            <div className="cal_year">
              <ul>{year_arr}</ul>
            </div>
          </div>
        </div>
        <div className="cal_bottom_li_gre"></div>
        <div className="cal_bottom_btn">
          <input type="button" value="Cancel" />
          <input type="button" value="OK" />
        </div>
      </div>
    );
  }
}

export default Calender;
