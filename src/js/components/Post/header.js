import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import emptyAvatar from "./../../../images/empty_avatar.jpeg";
import { uploadsUrl } from "./../../constants/types";
import { ShowTimeAgo } from "./../../helper/datetime";

const PostHeader = ({ post }) => {
  const { user, createdAt } = post;
  const { username, _id, avatar } = user;
  const avatarStyle = (photo) => {
    const imageUrl = photo ? `${uploadsUrl}/avatar/${photo}` : emptyAvatar;
    return {
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    };
  };

  return (
    <section className="post-header">
      {user && (
        <Link className="post-header__user" to={`/profile/${_id}`}>
          <div
            className="post-header__user-avatar"
            style={avatarStyle(avatar)}
          ></div>
          <h5 className="post-header__user-username">{username}</h5>
        </Link>
      )}
      <div className="post-header__date">
        <ShowTimeAgo date={createdAt} />
      </div>
    </section>
  );
};

PostHeader.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(PostHeader);
