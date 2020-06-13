import React, { Component } from "react";

class Result extends Component {
  componentDidMount(){
    const resultContainer = document.querySelector(".result-container");
    if(resultContainer){
    	resultContainer.scrollTop = resultContainer.scrollHeight;
		}
  }
  scroll = ()=>{
    const div = document.querySelector(".result-container");
     if(div){
   	 	div.scrollTop = div.scrollHeight;
   }
  }
  render() {
    let result = this.props.result;
    let expression = this.props.expression;
    let prevExpressions = JSON.parse(localStorage.getItem('history'));
    this.scroll();
    const classes = `expression active-result`;
    return (
	
      <div className="result-container">
        <div className="prev-result">
          {prevExpressions && prevExpressions.map((obj, index) => {
            return (
              <div key={index}>
                <p>{obj.exp}</p>
                <p>= {obj.value}</p>
              </div>
            );
          })}
        </div>
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
