import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./../../actions/users_action";

import { userActions } from "./../../actions/users_action";

import { Button } from "../../containers/buttons";
import LoginFrame from "./loginframe";

const Header = (props) => {
    const logout = () => {
        props.logout();
        window.location.reload();
    }
  return (
    <header className="header">
      {props.authentication && props.authentication.loggedIn && (
        <div> 
            {props.authentication.user.username}
        <div onClick={logout}>Wyloguj</div>
    </div>
      )}
    </header>
  );
};
const  mapStateToProps = (state) => {
  const { authentication } = state;
  return { authentication };
}

const actionCreators = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, actionCreators)(Header);

// class Header extends React.Component {

//     handleLogout = (e) => {
//         e.preventDefault();
//         this
//             .props
//             .logout();
//     }

//     renderUserPanel(data) {

//         const {userId, userUsername, userEmail, userAvatar} = data;
//         const avatar = _.isEmpty(userAvatar)
//             ? 'empty_avatar.png'
//             : userAvatar
//         return (
//             <div className="header__panel-user">
//                 <div className="header__avatar"><img src={"./images/" + avatar}/></div>
//                 <div className="header__dropdown">
//                     <a href="#">Mój profil</a>
//                     <a href="#">Ustawienia</a>
//                     <a onClick={this.handleLogout} href="#">Wyloguj</a>
//                 </div>
//             </div>
//         )
//     }
//     render() {
//         console.log('headerprops', this.props.user.userId);
//         return (
//             <header className="header">
//                 <div className="container">
//                     <div className="header__left">
//                         <NavLink to="/">
//                             <div className="header__logo"><img src="./images/logo_small.png"/></div>
//                         </NavLink>
//                         <div className="header__menu">
//                             <NavLink to="/nowe" activeClassName="selected">Nowe</NavLink>
//                             <NavLink to="/top" activeClassName="selected">Top</NavLink>
//                             <NavLink to="/login" activeClassName="selected">Poczekalnia</NavLink>
//                         </div>
//                     </div>

//                     <div className="header__right">
//                         <div className="header__panel">
//                             {this.props.user.userId > 0
//                                 ? this.renderUserPanel(this.props.user)
//                                 : <div className="header__panel-paths">
//                                     <div className="header__icon">
//                                         <i className="fas fa-search"></i>
//                                     </div>
//                                     <div className="header__hover-access-frame">
//                                         <div className="header__icon">
//                                             <i className="fas fa-user"></i>
//                                             <LoginFrame/>
//                                         </div>
//                                     </div>

//                                 </div>}
//                             <NavLink to="/dodaj-post">
//                                 <Button label={"Dodaj"} className="btn-primary" align={""} size={"small"}/>
//                             </NavLink>

//                         </div>
//                     </div>

//                 </div>
//             </header>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {user: state.user};
// }

// export default connect(mapStateToProps, {logout})(Header);
