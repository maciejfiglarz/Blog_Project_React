import React from "react";
import { Redirect } from "react-router-dom";

const PrimaryBtn = props => (
  <button
    className={
      "button-primary " + (props.extraClass ? props.extraClass : "")
    }
    type="submit"
    // handleSubmit={props.handleSubmit}
  >
    {props.text}
  </button>
);

export { PrimaryBtn };
