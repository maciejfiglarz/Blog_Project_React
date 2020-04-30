import React from "react";
import { history } from "../../helper/history";
import  userActions  from "./../../store/user/action";
import { connect } from "react-redux";
import logo from "./../../../images/logo.png";
import PropTypes from "prop-types";

const Menu = ({ setIsMenu, isMenu, user, logout }) => {
  const onClickLogin = () => {
    hideMenu();
    history.push("/zaloguj-sie");
  };
  const onClickRegister = () => {
    hideMenu();
    history.push("/zaloz-konto");
  };
  const hideMenu = () => {
    setIsMenu(false);
  };
  const onClicklogout = () => {
    setIsMenu(false);
    logout();
    window.location.reload();
  };

  const isLogged = user.isLogged;

  return (
    <nav className={`header-menu ${isMenu ? "header-menu--visible" : ""}`}>
      <div onClick={hideMenu} className="header-menu__close">
        <i className="fas fa-times"></i>
      </div>

      <div className="header-menu__logo">
        <img src={logo} />
      </div>

      <ul className="header-menu__list">
        {isLogged && (
          <>
            <li onClick={onClicklogout} className="header-menu__item">
              <i className="fas fa-sign-out-alt "></i> {user.username}
              <i className="fas fa-caret-down header-menu__item-dropicon"></i>
            </li>
          </>
        )}
        {!isLogged && (
          <>
            <li onClick={onClickLogin} className="header-menu__item">
              <i className="fas fa-sign-in-alt"></i> Zaloguj się
            </li>
            <li onClick={onClickRegister} className="header-menu__item">
              <i className="fas fa-user-plus"></i> Załóż konto
            </li>
          </>
        )}
        {isLogged && (
          <>
            <li onClick={logout} className="header-menu__item">
              <i className="fas fa-sign-out-alt"></i> Wyloguj
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

Menu.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
  isMenu: PropTypes.bool,
  setIsMenu: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const actionCreators = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, actionCreators)(Menu);
