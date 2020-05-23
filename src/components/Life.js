import React, { useState } from "react";
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
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Age from "./Age";
import DateCalculate from "./Date_Calculate";
import Discount from "./Discount";
import Length from "./Length";
import GlobalStateProvider from "./store/GlobalStateProvider";

const Life = (props) => {
  const [state, setState] = useState({
    id: -1,
  });

  const change = (event) => {
    const id = parseInt(event.currentTarget.id);
    setState({
      id: id,
    });
    props.hideNav();
  };

  const reset = () => {
    setState({
      id: -1,
    });
    props.showNav();
  };
  return (
    <React.Fragment>
      <GlobalStateProvider>
        {state.id === -1 ? (
          <div className="Life-container">
            <div className="box" id="1" onClick={change}>
              <FontAwesomeIcon icon={faPager} />
              <p>Age</p>
            </div>
            <div className="box" id="2" onClick={change}>
              <FontAwesomeIcon icon={faTags} />
              <p>Discount</p>
            </div>
            <div className="box" id="3" onClick={change}>
              <FontAwesomeIcon icon={faPercent} />
              <p>Percent</p>
            </div>
            <div className="box" id="4" onClick={change}>
              <FontAwesomeIcon icon={faCalendarMinus} />
              <p>Date</p>
            </div>
            <div className="box" id="5" onClick={change}>
              <FontAwesomeIcon icon={faRuler} />
              <p>Length</p>
            </div>
            <div className="box" id="6" onClick={change}>
              <FontAwesomeIcon icon={faSquare} />
              <p>Area</p>
            </div>
            <div className="box" id="7" onClick={change}>
              <FontAwesomeIcon icon={faTemperatureLow} />
              <p>Temperature</p>
            </div>
            <div className="box" id="8" onClick={change}>
              <FontAwesomeIcon icon={faTachometerAlt} />
              <p>Speed</p>
            </div>
            <div className="box" id="9" onClick={change}>
              <FontAwesomeIcon icon={faClock} />
              <p>Time</p>
            </div>
          </div>
        ) : null}

        {state.id === 1 ? <Age reset={reset} /> : null}
        {state.id === 2 ? <Discount reset={reset} /> : null}
        {state.id === 4 ? <DateCalculate reset={reset} /> : null}
        {state.id === 5 ? <Length reset={reset} /> : null}
      </GlobalStateProvider>
    </React.Fragment>
  );
};
export default Life;
