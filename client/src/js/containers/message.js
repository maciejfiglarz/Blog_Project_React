import React from "react";

const Message = ({ alert, field }) => {
  let { message,type } = alert;
  message = field ? message[field] : message;
  return (
    <div className="message-wrap">
      {message && (
        <div className={`message message-${type}`}>{message}</div>
      )}
    </div>
  );
};

export { Message };
