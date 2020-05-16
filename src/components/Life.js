import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPager,
  faTags,
  faPercent,
  faCalendarMinus,
  faRuler,
  faSquare,
  faTemperatureLow,
  faTachometerAlt,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import Age from './Age';
import DateCalculate from './Date_Calculate';
import Discount from './Discount';
import Length from './Length';

class Life extends Component {
  state = {
    id: -1
  };
  change = event => {
    const id = parseInt(event.currentTarget.id);
    this.setState({
      id: id
    });
    this.props.hideNav();
  };
  reset = ()=>{
    this.setState({
      id:-1
    })
    this.props.showNav();
  }

  render() {
    return (
      <React.Fragment>
      { this.state.id === -1 ?
        <div className="Life-container">
          <div className="box" id="1" onClick={this.change}>
            <FontAwesomeIcon icon={faPager} />
            <p>Age</p>
          </div>
          <div className="box" id="2" onClick={this.change}>
            <FontAwesomeIcon icon={faTags} />
            <p>Discount</p>
          </div>
          <div className="box" id="3" onClick={this.change}>
            <FontAwesomeIcon icon={faPercent} />
            <p>Percent</p>
          </div>
          <div className="box" id="4" onClick={this.change}>
            <FontAwesomeIcon icon={faCalendarMinus} />
            <p>Date</p>
          </div>
          <div className="box" id="5" onClick={this.change}>
            <FontAwesomeIcon icon={faRuler} />
            <p>Length</p>
          </div>
          <div className="box" id="6" onClick={this.change}>
            <FontAwesomeIcon icon={faSquare} />
            <p>Area</p>
          </div>
          <div className="box" id="7" onClick={this.change}>
            <FontAwesomeIcon icon={faTemperatureLow} />
            <p>Temperature</p>
          </div>
          <div className="box" id="8" onClick={this.change}>
            <FontAwesomeIcon icon={faTachometerAlt} />
            <p>Speed</p>
          </div>
          <div className="box" id="9" onClick={this.change}>
            <FontAwesomeIcon icon={faClock} />
            <p>Time</p>
          </div>
        </div> : null }

        {this.state.id === 1 ? <Age reset={this.reset}/> : null}
        {this.state.id === 2 ? <Discount reset={this.reset}/> : null}
        {this.state.id === 4 ? <DateCalculate reset={this.reset}/>: null}
        {this.state.id === 5 ? <Length reset={this.reset}/>: null}

      </React.Fragment>
    );
  }
}
export default Life;
