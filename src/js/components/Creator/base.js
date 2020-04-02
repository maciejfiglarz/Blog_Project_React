import React from "react";

const CreatorBase = props => {
  return (
    <div>
      <input
        onChange={e => props.setTitle(e.target.value)}
        value={props.title}
        className="input__text-regular creator-form__input"
        name="title"
        placeholder="Tytuł"
      />
      <textarea
        onChange={e => props.setContent(e.target.value)}
        className="input__text-regular creator-form__input"
        name="value"
        placeholder="Treść postu..."
        value={props.content}
      />
    </div>
  );
};

export default CreatorBase;
