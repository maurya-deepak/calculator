import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";


class HeaderWithBackBtn extends Component {
  render() {
    return (
      <div className="header">
        <button className="back-btn" onClick={this.props.reset}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

export default HeaderWithBackBtn;
