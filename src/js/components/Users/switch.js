import React from "react";
import { Link } from "react-router-dom";

const Switch = ({ type }) => {
  console.log("type", type);
  return (
    <div className="auth__switch">
      <Link
        to="zaloguj-sie"
        className={`auth__switch-item ${
          type == "login" ? "auth__switch-item--active" : ""
        }`}
      >
        Zaloguj się
      </Link>
      <Link
        to="zaloz-konto"
        className={`auth__switch-item ${
          type == "register" ? "auth__switch-item--active" : ""
        }`}
      >
        Załóż konto
      </Link>
    </div>
  );
};

export default Switch;
