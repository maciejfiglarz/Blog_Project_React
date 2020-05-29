import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { PrimaryBtn } from "../../containers/buttons";
import { connect } from "react-redux";
import userActions from "./../../store/user/action";
import PropTypes from "prop-types";
import { Message } from "../../containers/message";
import { InputText } from "./../../containers/form";
import Switch from "./switch";

const Login = ({ alert, login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('log',email, password );
    login({ email, password });
  };

  return (
    <form className="auth container-small" onSubmit={onSubmit}>
      <Switch type="login" />
      <div className="auth__content">
        {alert.message && <Message alert={alert} field={"loginError"} />}
        <InputText
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          className="creator-form__input"
          placeholder="Email"
        />
        <InputText
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          value={password}
          className="creator-form__input"
          placeholder="Hasło"
        />

        <PrimaryBtn text="Zaloguj" />
        <div className="auth-footer">
          Nie masz konta? Możesz założyć je
          <NavLink to="/zaloz-konto">tutaj.</NavLink>
        </div>
      </div>
    </form>
  );
};

Login.propTypes = {
  alert: PropTypes.object,
  login: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { alert } = state;
  return { alert };
};

const actionCreators = {
  login: userActions.login,
};

export default connect(mapStateToProps, actionCreators)(Login);
