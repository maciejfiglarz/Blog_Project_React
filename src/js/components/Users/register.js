import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Message } from "../../containers/message";
// import userActions from "../../actions/user_action";
import userActions from "../../store/user/action";
import PropTypes from "prop-types";
import { InputText } from "./../../containers/form";

const Register = ({ register, alert }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    register({ username, email, password, passwordConfirmation });
  };

  return (
    <form className="auth container-small" onSubmit={onSubmit}>
      <h1 className="auth-title">Załóż konto</h1>
 
      {alert.message && <Message alert={alert} field={"registerUsername"} />}
      <InputText
        onChange={(e) => setUsername(e.target.value)}
        name="username"
        value={username}
        type="text"
        className="creator-form__input"
        placeholder="Nazwa użytkownika"
      />
    {alert.message && <Message alert={alert} field={"registerEmail"} />}
      <InputText
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        value={email}
        className="creator-form__input"
        placeholder="Email"
      />
    {alert.message && <Message alert={alert} field={"registerPassword"} />}
      <InputText
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        value={password}
        type="password"
        className="creator-form__input"
        placeholder="Hasło"
      />

      <InputText
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        name="passwordConfirmation"
        value={passwordConfirmation}
        type="password"
        className="creator-form__input"
        placeholder="Powtórz hasło"
      />

      <PrimaryBtn text={"Załóż konto"} />
      <div className="auth-footer">
        Posiadasz już konto? Możesz zalogować się
        <NavLink to="/logowanie">tutaj.</NavLink>
      </div>
    </form>
  );
};

Register.propTypes = {
  alert: PropTypes.object,
  register: PropTypes.func,
};

const mapState = (state) => {
  const { alert } = state;
  return { alert };
};

const actionCreators = {
  register: userActions.register,
};

export default connect(mapState, actionCreators)(Register);
