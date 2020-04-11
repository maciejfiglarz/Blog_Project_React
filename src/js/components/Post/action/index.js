import React, { useState, useRef } from "react";
import voteService from "./../../../services/vote_service";
import { connect } from "react-redux";

import { userActions } from "../../../actions/user_action";

const PostAction = (props) => {
  const post = props.post;
  const [voteNumber, setVoteNumber] = useState(post.voteNumber);
  const [type, setType] = useState("");

  const isLogged = props.authentication;

  const handleVoteDown = (event) => {
    setVotedClass(event);
    updateVote("down");
    setVoteNumber(voteNumber-1);
  };

  const handleVoteUp = (event) => {
    updateVote("up");
    setVotedClass(event);
    setVoteNumber(voteNumber+1);
  };

  const updateVote = (newType) => {
    setType(newType);

    const params = {
      postId: post._id,
      userId: props.authentication.user.id,
      type: newType,
    };

    console.log("params", params);

    voteService.vote(params);
  };

  const setVotedClass = (event) => {
    clearVotedClass();
    event.currentTarget.classList.add("post-action__vote-item--voted");
  };

  const clearVotedClass = () => {
    const items = document
      .querySelector(`#post-${post.id}`)
      .querySelectorAll(".post-action__vote-item");
    items.forEach((element) =>
      element.classList.remove("post-action__vote-item--voted")
    );
  };

  return (
    <section id={`post-${post.id}`} className="post-action">
      <div className="post-action__section">
        <div className="post-action__section-item">
          <i className="fas fa-share-square"></i> Udostępnij
        </div>
        <div className="post-action__section-item">
          <i className="fas fa-comment"></i> 23
        </div>
      </div>

      <div className="post-action__section">
        <div className="post-action__section-item">
          <div>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>

        <div className="post-action__section-item">
          <div className="post-action__vote ">
            <div
              onClick={handleVoteUp}
              className="post-action__vote-item post-action__vote-item--up"
            >
              <i className="post-action__vote-icon post-action__vote-icon--up fas fa-chevron-up"></i>
            </div>
            <div className="post-action__vote-item post-action__vote-score">
              {voteNumber}
            </div>
            <div
              onClick={handleVoteDown}
              className="post-action__vote-item post-action__vote-item--down"
            >
              <i className="post-action__vote-icon post-action__vote-icon--down fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { authentication } = state;
  return { authentication };
};

const actionCreators = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, actionCreators)(PostAction);
