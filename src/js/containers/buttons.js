import React from "react";
import { Redirect } from "react-router-dom";

const PrimaryBtn = (props) => (
  <button
    className={"button-primary " + (props.extraClass ? props.extraClass : "")}
    type="submit"
  >
    {props.text}
  </button>
);

const SecondaryBtn = (props) => {
  return (
    <button
      className={
        "button-secondary " +
        (props.extraClass ? props.extraClass : "") +
        (props.type == "small" ? " button-secondary--small" : "")
      }
      type="submit"
    >
      {props.text}
    </button>
  );
};

const LoginBtn = (props) => (
  <button className="button-primary button-login" onClick={props.onClick}>
    {props.text}
  </button>
);

const RegisterBtn = (props) => (
  <button className="button-secondary button-register" onClick={props.onClick}>
    {props.text}
  </button>
);

export { PrimaryBtn, SecondaryBtn, LoginBtn, RegisterBtn };
