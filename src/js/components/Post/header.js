import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const PostHeader = (props) => {
  const { post } = props;
  const { user } = post;
  const { username, _id } = user;

  console.log("user", user);
  return (
    <section className="post-header">
      {user && (
        <>
          <Link to={`/profile/${_id}`}>
            {username}
            <img
              style={{ maxWidth: "10px" }}
              src="https://cdn4.iconfinder.com/data/icons/emoji-2-5/64/_scared_emoticon_emoji-512.png"
            />
          </Link>
        </>
      )}
    </section>
  );
};

PostHeader.propTypes = {
  post: PropTypes.object,
};

export default PostHeader;
