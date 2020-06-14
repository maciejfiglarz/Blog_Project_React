import React from "react";
import { Link } from "react-router-dom";
import create from "./../../../images/create_top.png";

const HeaderNavigation = () => (
  <div className="header-navigation">
    <Link to="/" className="header-navigation__item">
      Główna
    </Link>
    <Link to="/poczekalnia" className="header-navigation__item">
      Poczekalnia
    </Link>
    <Link to="/dodaj" className="header-navigation__item">
      <img src={create} />
    </Link>
  </div>
);

export default HeaderNavigation;
