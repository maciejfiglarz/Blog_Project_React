import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Menu from "./menu";

import {
  RegisterBtn,
  LoginBtn,
  PrimaryBtn,
  SecondaryBtn,
} from "./../../containers/buttons";

import { history } from "../../helper/history";

import logo from "./../../../images/logo.png";

const Header = ({ user }) => {
  const [isMenu, setIsMenu] = useState(false);

  const onClickMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <>
      <header className="header">
        <div className="header-container container-full">
          <div className="header-logo">
            <img src={logo} />
          </div>

          <div onClick={onClickMenu} className="header-menu__init">
            <i className="fas fa-bars"></i>
          </div>

          {/* <div className="header-label">
          {props.authentication.loggedIn && (
            <div>
              {props.authentication.user.username}
             
            </div>
          )}
          {!props.authentication.loggedIn && (
            <div>
              <LoginBtn onClick={onClickLogin} text={"Zaloguj się"} />
              <RegisterBtn onClick={onClickLogin} text={"Załóż konto"}/>
            </div>
          )}
        </div> */}
        </div>
      </header>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu}/>
    </>
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


export default connect(mapStateToProps)(Header);
