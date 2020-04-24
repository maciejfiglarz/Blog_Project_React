import React, { useState, useRef, useEffect } from "react";
import voteService from "../../../services/vote_service";
import { connect } from "react-redux";

import { userActions } from "../../../actions/user_action";

const PostVote = (props) => {
  const post = props.post;
  const [voteNumber, setVoteNumber] = useState(post.voteNumber);
  const [defaultVoteNumber, setDefaultVoteNumber] = useState(post.voteNumber);
  const [type, setType] = useState("");

  const isLogged = props.user.isLogged;
  const votes = props.user.votes;

  const setDefaultVote = () => {
    if (isLogged) {
      let voteKey = Object.keys(votes).filter((key) => {
        return key == post._id;
      });
      if (voteKey.length > 0) {
        const type = votes[voteKey];
        setType(type);
        type == "up"
          ? setDefaultVoteNumber((prev) => prev - 1)
          : setDefaultVoteNumber((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    setDefaultVote();
  }, [props.user.votes]);

  //   const handleVote = (event) => {
  //     console.log("event", event.currentTarget);
  //     let type = event.currentTarget.dataset.type;
  //     const reverseType = type == "up" ? "down" : "up";
  //     console.log("type", type);
  //   };

  const handleVoteDown = (event) => {
    setVotedClass(event);
    updateVote("down");
    console.log("down", isVoted(event));
    setVoteNumber(defaultVoteNumber - 1);
  };

  const handleVoteUp = (event) => {
    setVotedClass(event);
    isVoted(event)
      ? updateVote("up")
      : removeVote(post._id, props.authentication.user.id);
    setVoteNumber(defaultVoteNumber + 1);
  };

  const removeVote = (postId, userId) => {};

  const isVoted = (event) => {
    const el = event.currentTarget;
    if (el.classList.contains("post-action__vote-item--voted")) {
      return true;
    }
    return false;
  };

  const updateVote = (newType) => {
    setType(newType);
    const params = {
      postId: post._id,
      userId: props.authentication.user.id,
      type: newType,
    };
    voteService.vote(params);
  };

  const setVotedClass = (event) => {
    clearVotedClass();
    event.currentTarget.classList.toggle("post-action__vote-item--voted");
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
    <section className="post-action__vote ">
      <div
        data-type="up"
        onClick={handleVoteUp}
        className={`post-action__vote-item post-action__vote-item--up ${
          type == "up" ? "post-action__vote-item--voted" : ""
        }`}
      >
        <i className="post-action__vote-icon post-action__vote-icon--up fas fa-chevron-up"></i>
      </div>
      <div className="post-action__vote-item post-action__vote-score">
        {voteNumber}
      </div>
      <div
        data-type="down"
        onClick={handleVoteDown}
        className={`post-action__vote-item post-action__vote-item--down ${
          type == "down" ? "post-action__vote-item--voted" : ""
        }`}
      >
        <i className="post-action__vote-icon post-action__vote-icon--down fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const actionCreators = {
//   removeVote: userActions.removeVote,
};

export default connect(mapStateToProps, actionCreators)(PostVote);
