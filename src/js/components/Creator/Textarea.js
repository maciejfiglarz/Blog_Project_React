import React from "react";

const Textarea = props => {
  const { onChange, value } = props;
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      className={"creator__textarea"}
    ></textarea>
  );
};

export default Textarea;
