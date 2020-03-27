import React, { Component } from "react";

class Result extends Component {
  render() {
    
    let result  = this.props.result;
    
    return (
      <div className="result-container">
        <div className="result">{result}</div>
      </div>
    );
  }
}

export default Result;
