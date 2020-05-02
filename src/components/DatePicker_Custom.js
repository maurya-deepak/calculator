import React, { Component } from "react";
import DatePicker from "react-datepicker";

class DatePickerCustom extends Component {
  state = {
    st_date: new Date()
  };

  handlechange = date => {
    this.setState({
      st_date: date
    });
  };

  render() {
    return (
      <div className="date">
        <p>{this.props.show_name}</p>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={this.state.st_date}
          onSelect={this.handlechange}
          onChange={this.props.change}
          className="calender"
        />
      </div>
    );
  }
}
export default DatePickerCustom;
