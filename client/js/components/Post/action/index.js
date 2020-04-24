import React, { useState, useRef, useEffect } from "react";
import voteService from "../../../services/vote_service";
import { connect } from "react-redux";

import  userActions  from "../../../actions/user_action";

import PostVote from "./vote";

const PostAction = (props) => {
  const post = props.post;
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
        <PostVote post={post} />
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
