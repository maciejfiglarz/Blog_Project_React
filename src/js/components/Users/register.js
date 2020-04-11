import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Message } from "./../../containers/message";
import { userActions } from "./../../actions/user_action";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    props.register({ username, email, password, passwordConfirmation });
  };
  const { alert } = props;
  return (
    <form className="auth container-small" onSubmit={onSubmit}>
      <h1 className="auth-title">Załóż konto</h1>
      {alert.message && <Message alert={alert} />}
      <input
        onChange={(e) => setUsername(e.target.value)}
        className="input__text-regular"
        name="username"
        placeholder="Nazwa użytkownika"
        value={username}
      />

      <input
        onChange={(e) => setEmail(e.target.value)}
        className="input__text-regular"
        name="email"
        placeholder="Email"
        value={email}
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        className="input__text-regular"
        name="password"
        placeholder="Hasło"
        value={password}
      />

      <input
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        className="input__text-regular"
        name="password-confirm"
        placeholder="Powtórz hasło"
        value={passwordConfirmation}
      />

      <PrimaryBtn text={"Załóż konto"} />
      <div className="auth-footer">
        Posiadasz już konto? Możesz zalogować się
        <NavLink to="/logowanie">tutaj.</NavLink>
      </div>
    </form>
  );
};

const mapState = (state) => {
  console.log("state", state);
  const { registration, alert } = state;
  return { registration, alert };
};

const actionCreators = {
  register: userActions.register,
};

export default connect(mapState, actionCreators)(Register);
