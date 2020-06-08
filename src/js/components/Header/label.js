import React from "react";
import { Link } from "react-router-dom";
import { uploadsUrl } from "./../../constants/types";
import emptyAvatar from "./../../../images/empty_avatar.jpeg";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const HeaderLabel = ({ user, logout }) => {
  const avatarStyle = (photo) => {
    const imageUrl = photo ? `${uploadsUrl}/avatar/${photo}` : emptyAvatar;
    return {
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    };
  };
  const { isLogged, username } = user;
  return (
    <div className="header-label">
      {isLogged && (
        <div className="header-label__user">
          <div
            className="header-label__user-avatar"
            style={avatarStyle(user.avatar)}
          ></div>
          <div className="header-label__user-username">
            {username} <i className="fas fa-caret-down"></i>
          </div>
          <nav className="header-label__dropdown">
            <Link
              className="header-label__dropdown-item"
              to={`/profile/${user.id}`}
            >
              Profil
            </Link>
            <div onClick={logout} className="header-label__dropdown-item">
              {/* <i className="fas fa-sign-out-alt"></i>  */}
              Wyloguj
            </div>
          </nav>
        </div>
      )}
      {!isLogged && (
        <>
          <Link className="button-primary button-login" to="/zaloguj-sie">
            Zaloguj się
          </Link>
          <Link className="button-primary button-register" to="/zaloz-konto">
            Załóż konto
          </Link>
        </>
      )}
    </div>
  );
};

HeaderLabel.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(HeaderLabel);
