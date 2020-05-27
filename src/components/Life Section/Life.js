import React, { useState } from "react";
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
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import LifeBox from "../Reusable/LifeBox";
import Age from "./Age";
import DateCalculate from "./DateCalculate";
import Discount from "./Discount";
import Length from "./Length";
import Area from "./Area";
import Volume from "./Volume";
import Percentage from "./Percentage";
import Temperature from "./Temperature";
import GlobalStateProvider from "../store/GlobalStateProvider";

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
            <LifeBox id="1" change={change} icon={faPager} name="Age" />
            <LifeBox id="2" change={change} icon={faTags} name="Discount" />
            <LifeBox
              id="3"
              change={change}
              icon={faPercent}
              name="Percentage"
            />
            <LifeBox
              id="4"
              change={change}
              icon={faCalendarMinus}
              name="Date"
            />
            <LifeBox id="5" change={change} icon={faRuler} name="Length" />
            <LifeBox id="6" change={change} icon={faSquare} name="Area" />
            <LifeBox id="7" change={change} icon={faCube} name="Volume" />
            <LifeBox
              id="8"
              change={change}
              icon={faTemperatureLow}
              name="Temperature"
            />
            <LifeBox
              id="9"
              change={change}
              icon={faTachometerAlt}
              name="Speed"
            />
            <LifeBox id="10" change={change} icon={faClock} name="Time" />
          </div>
        ) : null}
        {state.id === 1 ? <Age reset={reset} /> : null}
        {state.id === 2 ? <Discount reset={reset} /> : null}
        {state.id === 3 ? <Percentage reset={reset} /> : null}
        {state.id === 4 ? <DateCalculate reset={reset} /> : null}
        {state.id === 5 ? <Length reset={reset} /> : null}
        {state.id === 6 ? <Area reset={reset} /> : null}
        {state.id === 7 ? <Volume reset={reset} /> : null}
        {state.id === 8 ? <Temperature reset={reset} /> : null}
      </GlobalStateProvider>
    </React.Fragment>
  );
};
export default Life;
