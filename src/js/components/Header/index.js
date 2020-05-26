import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Menu from "./menu";
import {Link} from "react-router-dom";
import {
  RegisterBtn,
  LoginBtn,
  PrimaryBtn,
  SecondaryBtn,
} from "./../../containers/buttons";

import { history } from "../../helper/history";

import logo from "./../../../images/logo_lolipop_mobile.png";
import menuMobile from "./../../../images/menu_mobile.png";

const Header = ({ user }) => {
  const [isMenu, setIsMenu] = useState(false);

  const onClickMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <>
      <header className="header">
        <div className="header-container container-full">

         <Link to=""> <div className="header-logo">
            <img src={logo} />
          </div></Link>

          <div onClick={onClickMenu} className="header-menu__init">
           <img src={menuMobile} />
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
