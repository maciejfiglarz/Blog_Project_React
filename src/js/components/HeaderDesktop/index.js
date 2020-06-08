import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import logo from "./../../../images/logo_desktop.png";

import HeaderNavigation from "./navigation";
import HeaderAuth from "./auth";

const HeaderDesktop = ({ user, logout }) => {
  return (
    <header className="header-desktop">
      <div className="header-desktop__container container container--full">
        <div className="header-desktop__logo">
          <Link to="/">
          <img src={logo} />
          </Link>
        </div>
        <div className="header-desktop__content">
          <div className="header-desktop__top">
            <div className="header-desktop__share">
              <div
                class="fb-like"
                data-href="https://www.facebook.com/szlauf"
                data-width=""
                data-layout="button_count"
                data-action="like"
                data-size="small"
                data-share="false"
              ></div>
            </div>
            <div>
          <HeaderAuth />
            </div>
          </div>
          <div className="header-desktop__bottom">
            <HeaderNavigation />
          </div>
        </div>
      </div>
    </header>
  );
};

HeaderDesktop.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
  isMenu: PropTypes.bool,
  setIsMenu: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(HeaderDesktop);
