import React from "react";
import PropTypes from "prop-types";

const PostHeader = (props) => {
  const { post } = props;
  const { user } = post;
  const { username } = user;

  return (
    <section className="post-header">
      {username}
      <img
        style={{ maxWidth: "10px" }}
        src="https://cdn4.iconfinder.com/data/icons/emoji-2-5/64/_scared_emoticon_emoji-512.png"
      />
    </section>
  );
};

PostHeader.propTypes = {
  post: PropTypes.object,
};

export default PostHeader;
