import React from "react";
import { history } from "./../../helper/history";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CreatorRedirect = ({ user }) => {
  const handleOnClick = () => {
    user.isLogged ? history.push(`/dodaj`) : history.push(`/zaloguj-sie`);
  };
  return (
    <div onClick={handleOnClick} className="creator-redirect">
      Dodaj post
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

CreatorRedirect.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(CreatorRedirect);
