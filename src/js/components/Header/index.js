import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/user_action";

import userActions from "../../actions/user_action";

import Menu from "./menu";

import {
  RegisterBtn,
  LoginBtn,
  PrimaryBtn,
  SecondaryBtn,
} from "../../containers/buttons";
import { history } from "./../../helper/history";
import LoginFrame from "./loginframe";

import logo from "./../../../images/logo.png";

const Header = (props) => {
  const [isMenu, setIsMenu] = useState(false);

  const onClickMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <React.Fragment>
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
      <Menu
        isMenu={isMenu}
        setIsMenu={setIsMenu}
        authentication={props.authentication}
      />
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  console.log("state", state);
  const { authentication } = state;
  return { authentication };
};

const actionCreators = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, actionCreators)(Header);
