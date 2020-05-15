import React, { Component } from "react";

class DatePickerCustom extends Component {
  render() {
    const name = this.props.show_name;
    const date = this.props.date;
    const day =
      String(date.getDate()).length > 1
        ? String(date.getDate())
        : "0" + String(date.getDate());
    const month_arr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = date.getFullYear();
    return (
      <div className="date">
        <p>{name}</p>
        <div id="date_with_icon">
          <p id="date_row" onClick={(e) => this.props.showCalendar(e, name)}>
            {month_arr[date.getMonth()]} {day}, {year}
          </p>
        </div>
      </div>
    );
  }
}
export default DatePickerCustom;
