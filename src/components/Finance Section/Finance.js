import React, { Fragment, useState } from "react";
import FinanceBox from "../Reusable/Box";
import {faCoins} from "@fortawesome/free-solid-svg-icons";

import GlobalStateProvider from "../store/GlobalStateProvider";
import Currency from "./Currency";

const Finance = (props) => {
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
    <Fragment>
      <GlobalStateProvider>
        {state.id === -1 ? (
          <div className="Container">
            <FinanceBox id="1" change={change} icon={faCoins} name="Currency" />
          </div>
        ) : null}
        {state.id === 1 ? <Currency reset={reset}/> : null}
      </GlobalStateProvider>
    </Fragment>
  );
};

export default Finance;
