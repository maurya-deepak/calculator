import React, { Component } from "react";

class Result extends Component {
  onClick = (event) => {
    const activeSpan = document.querySelector(".active-exp-span");
    activeSpan && activeSpan.classList.remove("active-exp-span");
    event.target.classList.add("active-exp-span");
  };
  render() {
    let result = this.props.result;
    let expression = this.props.expression;

    const classes = `expression active-result`;
    return (
      <div className="result-container">
        {/* <div className="prev-result">10</div> */}
        <div className="exp-with-result">
          <div className={classes}>
            {expression.map((ele, index) => {
              return (
                <span
                  key={index}
                  id={index}
                  onClick={this.props.onSpanClick}
                  className="exp-span"
                >
                  {ele}
                </span>
              );
            })}
          </div>
          <span className="result">
            {expression.join("") === "0" && result === "0" ? "" : "= " + result}
          </span>
        </div>
      </div>
    );
  }
}

export default Result;
