import React from "react";

const Message = (props) => (
  <div className={`message message-${props.alert.type}`}>
    {props.alert.message}
  </div>
);

export { Message };
