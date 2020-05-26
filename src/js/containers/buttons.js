import React from "react";
import { Redirect } from "react-router-dom";
import createPost from "./../../images/create_action.png";

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

const ActionBtn = ({ icon, text, onClick }) => {
  const icons = {
    comment: "fas fa-comment",
  };

  return (
    <button className="button-action" onClick={onClick}>
      {icon && <i className={icons[icon]}></i>}
      {text}
    </button>
  );
};

const LoginBtn = (props) => (
  <button className="button-primary button-login" onClick={props.onClick}>
    {props.text}
  </button>
);

const CreatePostBtn = (props) => (
  <div className="button-create__post-wrap">
    <button
      type="submit"
      className="button-create__post"
      onClick={props.onClick}
    >
      <img src={createPost} />
    </button>
  </div>
);

const RegisterBtn = (props) => (
  <button className="button-secondary button-register" onClick={props.onClick}>
    {props.text}
  </button>
);

export {
  PrimaryBtn,
  SecondaryBtn,
  LoginBtn,
  RegisterBtn,
  CreatePostBtn,
  ActionBtn,
};
