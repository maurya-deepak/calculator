import React, { Fragment, useState } from "react";
import FinanceBox from "../Reusable/Box";
import {faCoins, faWallet, faGhost} from "@fortawesome/free-solid-svg-icons";
import GlobalStateProvider from "../store/GlobalStateProvider";
import Currency from "./Currency";
import BillSplit from './BillSplit';
import Gst from "./Gst";

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
            <FinanceBox id="2" change={change} icon={faWallet} name="Split bill" />
            <FinanceBox id="3" change={change} icon={faGhost} name="GST" />
          </div>
        ) : null}
        {state.id === 1 ? <Currency reset={reset}/> : null}
        {state.id === 2 ? <BillSplit reset={reset}/> : null}
        {state.id === 3 ? <Gst reset={reset}/> : null}
      </GlobalStateProvider>
    </Fragment>
  );
};

export default Finance;
