import React from "react";

const CreatorBase = props => {
  const handleKeyDown = e => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

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
        className="input__text-regular creator-form__textarea"
        onKeyDown={handleKeyDown}
        name="value"
        placeholder="Treść postu..."
        value={props.content}
      />
    </div>
  );
};

export default CreatorBase;
