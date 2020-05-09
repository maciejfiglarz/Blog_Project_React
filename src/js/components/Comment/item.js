import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import commentActions from "./../../store/comment/action";
import emptyAvatar from "./../../../images/empty-avatar.jpeg";
import { uploadsUrl } from "./../../constants/types";
import { Link } from "react-router-dom";
import { ShowTimeAgo } from "./../../helper/datetime";
import CommentVote from "./vote";
import CommentCreator from "./creator";

const CommentItem = ({ comment, userLogged, post }) => {
  const { user, content, createdAt } = comment;
  const { avatar, username, _id } = user;


  const avatarStyle = (photo) => {
    const imageUrl = photo ? `${uploadsUrl}/avatar/${photo}` : emptyAvatar;
    return {
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    };
  };

  const onClickCommentReply = () => {};

  return (
    <div className="comment-item__wrap">
      <div className="comment-item">
        <div className="comment-item__avatar" style={avatarStyle(avatar)}></div>
        <div className="comment-item__info">
          <div className="comment-item__header">
            <Link to={`/profile/${_id}`}>{username}</Link> &nbsp;
            <ShowTimeAgo date={createdAt} />
          </div>
          <div className="comment-item__content">{content}</div>
          <div className="comment-item__action">
            <CommentVote />
            <div
              onClickCommentReply={onClickCommentReply}
              className="comment-item__comment"
            >
              <i className="fas fa-comment"></i>
              Odpowiedz
            </div>
            <div className="comment-item__reply"></div>
          </div>
        </div>
      </div>
      <CommentCreator post={post} parentCommentId={comment._id} />
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object,
  post: PropTypes.object,
  comments: PropTypes.object,
  createComment: PropTypes.func,
  fetchComments: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { userLogged: user };
};

const actionCreators = {
  createComment: commentActions.createComment,
};

export default connect(mapStateToProps, actionCreators)(CommentItem);
