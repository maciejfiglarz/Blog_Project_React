import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
import { connect } from "react-redux";
import userActions from "./../../store/user/action";
import PropTypes from "prop-types";
import { Message } from "../../containers/message";
import { InputText } from "./../../containers/form";
import { Link } from "react-router-dom";

import submit from "./../../../images/header_submit.png";

import { uploadsUrl } from "./../../constants/types";
import emptyAvatar from "./../../../images/empty_avatar.jpeg";

const HeaderDesktopAuth = ({ alert, login, user, logout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const { isLogged, avatar, username } = user;

  const onSubmit = async (event) => {
    event.preventDefault();
    const errors = await login({ email, password, type: "header" });
    const loginError = errors["loginError"];
    console.log('loginError',loginError);
    setErrorLogin(loginError);
    setTimeout(() => {
      setErrorLogin("");
    }, 2000);
  };

  const avatarStyle = (photo) => {
    const imageUrl = photo ? `${uploadsUrl}/avatar/${photo}` : emptyAvatar;
    return {
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    };
  };

  return (
    <>
      {!isLogged && (
        <>
          <div className="header-desktop__auth">
            <form className="header-desktop__auth-form" onSubmit={onSubmit}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="header-desktop__auth-input"
                type="text"
                name="header_email"
                value={email}
                placeholder="email"
                maxLength="255"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="header-desktop__auth-input"
                type="password"
                name="header_password"
                value={password}
                placeholder="hasło"
                maxLength="255"
              />
              <button type="submit" className="header-desktop__auth-submit">
                <img src={submit} />
              </button>
            </form>
            {errorLogin && (
              <div className="header-desktop__auth-error">{errorLogin}</div>
            )}
          </div>
          <div className="header-desktop__auth-footer">
            <Link to="/zaloz-konto">
              Nie masz jeszcze konta? Zarejestruj się!
            </Link>
          </div>
        </>
      )}
      {isLogged && (
        <div className="header-desktop__auth header-desktop__auth--logged">
          <div
            className="header-desktop__auth-avatar"
            style={avatarStyle(avatar)}
          ></div>
          <div className="header-desktop__auth-username">
            {username} <i className="fas fa-caret-down"></i>
          </div>
          <nav className="header-desktop__dropdown">
            <Link
              className="header-desktop__dropdown-item"
              to={`/profile/${user.id}`}
            >
              Profil
            </Link>
            <div onClick={logout} className="header-desktop__dropdown-item">
              Wyloguj
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

HeaderDesktopAuth.propTypes = {
  alert: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { alert, user, logout } = state;
  return { alert, user };
};

const actionCreators = {
  login: userActions.login,
};

export default connect(mapStateToProps, actionCreators)(HeaderDesktopAuth);
