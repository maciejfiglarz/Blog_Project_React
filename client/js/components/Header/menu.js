import React from "react";
import { history } from "../../helper/history";
import userActions from "../../actions/user_action";
import { connect } from "react-redux";
import logo from "./../../../images/logo.png";

const Menu = (props) => {
  const onClickLogin = () => {
    hideMenu();
    history.push("zaloguj-sie");
  };
  const onClickRegister = () => {
    hideMenu();
    history.push("zaloz-konto");
  };
  const hideMenu = () => {
    props.setIsMenu(false);
  };
  const logout = () => {
    props.logout();
    window.location.reload();
  };

  const isLogged = props.user.isLogged;
  console.log('props.user',props.user);
  return (
    <nav
      className={`header-menu ${props.isMenu ? "header-menu--visible" : ""}`}
    >
      <div onClick={hideMenu} className="header-menu__close">
        <i className="fas fa-times"></i>
      </div>

      <div className="header-menu__logo">
        <img src={logo} />
      </div>

      <ul className="header-menu__list">
        {isLogged && (
          <React.Fragment>
            <li onClick={logout} className="header-menu__item">
              <i className="fas fa-sign-out-alt "></i> {props.user.username}
              <i className="fas fa-caret-down header-menu__item-dropicon"></i>
            </li>
          </React.Fragment>
        )}
        {!isLogged && (
          <React.Fragment>
            <li onClick={onClickLogin} className="header-menu__item">
              <i className="fas fa-sign-in-alt"></i> Zaloguj się
            </li>
            <li onClick={onClickRegister} className="header-menu__item">
              <i className="fas fa-user-plus"></i> Załóż konto
            </li>
          </React.Fragment>
        )}
        {isLogged && (
          <React.Fragment>
            <li onClick={logout} className="header-menu__item">
              <i className="fas fa-sign-out-alt"></i> Wyloguj
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return {user};
};

const actionCreators = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, actionCreators)(Menu);
