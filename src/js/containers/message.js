import React from "react";

const Message = (props) => {
  let alert = props.alert;
  let message = alert.message;
  let field = props.field;
  message = field ? message[field] : message;
  return (
    <div className="message-wrap">
      {message && (
        <div className={`message message-${alert.type}`}>{message}</div>
      )}
    </div>
  );
};

export { Message };
