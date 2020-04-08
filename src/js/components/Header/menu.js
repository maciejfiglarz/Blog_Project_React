import React from "react";
import { history } from "./../../helper/history";

const Menu = (props) => {
  const onClickLogin = () => {
    hideMenu();
    history.push("zaloguj-sie");
  };
  const onClickRegister = () => {
    hideMenu();
    history.push("zaloz-konto");
  };
  const hideMenu= ()=>{
      props.setIsMenu(false);
  }
  return (
    <nav
      className={`header-menu ${props.isMenu ? "header-menu--visible" : ""}`}
    >
      <ul className="header-menu__list">
        <li onClick={onClickLogin} className="header-menu__item">
          <i className="fas fa-sign-in-alt"></i> Zaloguj się
        </li>
        <li onClick={onClickRegister} className="header-menu__item">
          <i className="fas fa-user-plus"></i> Załóż konto
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
