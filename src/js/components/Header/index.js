import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import {
  RegisterBtn,
  LoginBtn,
  PrimaryBtn,
  SecondaryBtn,
} from "./../../containers/buttons";


import logo from "./../../../images/logo_mobile.png";
import menuMobile from "./../../../images/menu_mobile.png";
import MenuResponsive from "./menu/responsive";

import HeaderLabel from "./label";

const Header = ({ user, logout }) => {
  const [isMenu, setIsMenu] = useState(false);
  const { isLogged, username } = user;
  const onClickMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <>
      <header className="header">
        <div className="header-container container--full">
          <Link to="/">
            <div className="header-logo">
              <img src={logo} />
            </div>
          </Link>
          <HeaderLabel />
          <div onClick={onClickMenu} className="header-menu__init">
            <img src={menuMobile} />
          </div>
        </div>
      </header>
      <MenuResponsive isMenu={isMenu} setIsMenu={setIsMenu} />
    </>
    
  );
};

Header.propTypes = {
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
