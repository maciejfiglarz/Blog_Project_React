import React, { useState } from "react";
import axios from "axios";

const CommentItem = (props) => {
  const comment = props.comment;
  return <div className="comment-item">{comment.content}</div>;
};

export default CommentItem;
