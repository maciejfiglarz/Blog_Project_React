import React from "react";
import { history } from "./../../../helper/history";
import userActions from "./../../../store/user/action";
import { connect } from "react-redux";
import logo from "./../../../../images/logo_mobile.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { uploadsUrl } from "./../../../constants/types";
import emptyAvatar from "./../../../../images/empty_avatar.jpeg";
import createAction from "./../../../../images/create_action.png";

const MenuResponsive = ({ setIsMenu, isMenu, user, logout }) => {
  const { avatar, id } = user;
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
  const avatarStyle = (photo) => {
    const imageUrl = photo ? `${uploadsUrl}/avatar/${photo}` : emptyAvatar;
    return {
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    };
  };
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
          <Link onClick={hideMenu} to={`/profile/${user.id}`}>
            <li className="header-menu__item">
              <div className="header-menu__flex">
                <div
                  className="header-menu__avatar"
                  style={avatarStyle(user.avatar)}
                ></div>
                {user.username}
              </div>
              {/* <i className="fas fa-caret-down header-menu__item-dropicon"></i> */}
            </li>
          </Link>
        )}
        <Link onClick={hideMenu} to={`/dodaj`}>
          <li className="header-menu__item">
            <i className="fas fa-plus-circle"></i> Dodaj
          </li>
        </Link>
        <Link onClick={hideMenu} to={`/`}>
          <li className="header-menu__item">
            <i className="fas fa-list-alt"></i> Główna
          </li>
        </Link>
        <Link onClick={hideMenu} to={`/poczekalnia`}>
          <li className="header-menu__item">
            <i className="far fa-list-alt"></i> Poczekalnia
          </li>
        </Link>
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

MenuResponsive.propTypes = {
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

export default connect(mapStateToProps, actionCreators)(MenuResponsive);
