import React, { useState } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/users_action";

import { serverUrl } from "../../constants/types";

import { SecondaryBtn } from "./../../containers/buttons";

const CommentCreator = (props) => {
  const [content, setContent] = useState();

  const postId = props.post._id;

  const handleSubmit = (event) => {
    event.preventDefault();
   
    axios
      .post(`${serverUrl}/comment`, {
        post: postId,
        content: content,
      })
      .then(resp => {
   
        props.setData([...props.data, ...resp.data.comment]);
    
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  return (

    <form onSubmit={handleSubmit} className="comment-creator">
      <div className="comment-creator__avatar">
        <img src={serverUrl + "/file/avatar/empty.jpeg"} />
      </div>
      <div className="comment-creator__content-wrap">
        <textarea
          onChange={(e) => setContent(e.target.value)}
          className="input__text-regular comment-creator__content"
          onKeyDown={handleKeyDown}
          name="value"
          placeholder="Twój komentarz"
          value={content}
        />
        <div className="comment-creator__action">
          <div className="comment-creator__action-section">0 / 500</div>
          <div className="commet-creator__action-section">
            <SecondaryBtn text={"Dodaj"} type={"small"} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentCreator;
