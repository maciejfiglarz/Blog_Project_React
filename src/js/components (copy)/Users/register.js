import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
// import { register } from "./../../services/user_services.js";
// import { register } from "./../../actions/users_action";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

import  {userActions}  from './../../actions/users_action';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('ua',userActions);
    console.log(
      "xxxxx",
      userActions.register({ username, email, password, passwordConfirmation })
    );
  };

  return (
    <form className="form-default container-small" onSubmit={onSubmit}>
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
      <div className="form-default">
        Posiadasz już konto? Możesz zalogować się tutaj{" "}
        <NavLink to="/logowanie">tutaj.</NavLink>
      </div>
    </form>
  );
};

const mapState = (state) => {
    console.log('state',state);
  const { registration } = state.registration;
  return { registration };
};

const actionCreators = {
  register: userActions.register,
};

export default connect(mapState, actionCreators)(Register);


