import React, {useContext } from "react";
import Context from "./store/Context";

const Finance = () => {
  const { globalState, actions } = useContext(Context);
  const change = ()=>{
    const current = document.querySelector('.current'); 
    actions({
      type:'reset',
      current:current
    });
  }
  return (
    <div>
      <h3 className="current" id="1">{globalState.firstInput}</h3>
      <h3 id="2">{globalState.secondInput}</h3>
      <button onClick={change}> change firstInput</button>
    </div>
  );
};
export default Finance;
