import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadsUrl } from "./../../constants/types";
import commentActions from "./../../store/comment/action";

const CommentVote = ({ user }) => {
  const score = useState(0);
  const handleSubmit = () => {};

  return (
    <div className="comment-item__vote">
      <i className="comment-item__vote-icon comment-item__vote-icon--down fas fa-chevron-up"></i>
      <div className="comment-item__vote-score">{score}</div>
      <i className="comment-item__vote-icon comment-item__vote-icon--up fas fa-chevron-down"></i>
    </div>
  );
};

CommentVote.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const actionCreators = {
  fetchComments: commentActions.fetchComments,
};

export default connect(mapStateToProps, actionCreators)(CommentVote);
