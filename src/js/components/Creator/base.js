import React from "react";
import { Message } from "./../../containers/message";
const CreatorBase = (props) => {
  return (
    <React.Fragment>
      <input
        onChange={(e) => props.setTitle(e.target.value)}
        value={props.title}
        className="input__text-regular creator-form__input"
        name="title"
        placeholder="Tytuł"
      />
      <textarea
        onChange={(e) => props.setContent(e.target.value)}
        className="input__text-regular creator-form__textarea"
        name="value"
        placeholder="Treść postu..."
        value={props.content}
      />
    </React.Fragment>
  );
};

export default CreatorBase;
