import React from "react";

const Navbar = (props) => {
  const active = "active";
  return (
    <div className="nav-container">
      <ul className="navbar">
        <li onClick={props.cal} className={props.cal_active ? active : ""}>
          Calculator
        </li>
        <li onClick={props.life} className={props.life_active ? active : ""}>
          Life
        </li>
        <li
          onClick={props.finance}
          className={props.finance_active ? active : ""}
        >
          Finance
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
