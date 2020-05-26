import React, { useState, useRef, useEffect } from "react";
import voteService from "../../../services/vote_service";
import { connect } from "react-redux";
import { ActionBtn } from "./../../../containers/buttons";
import userActions from "./../../../store/user/action";
import shareFB from "./../../../../images/fb_share.png";

import PostVote from "./vote";
import PostShare from "./share";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FacebookProvider, CommentsCount } from "react-facebook";
const PostAction = ({ post, isSingle }) => {
  const { _id, title } = post;

  return (
    <section id={`post-${_id}`} className="post-action">
      <div className="post-action__section">
        <div className="post-action__section-item">
          <PostShare postId={_id} title={title} isSingle={isSingle} />

          {/* <div onClick={onClickShareFb}> Wrzuć na <i class="fab fa-facebook-square "></i></div> */}
          {/* <ShareLink link="http://example.com/">
            {(link) => (
              <a href={link}>
                <img className="post-action__share-fb" src={shareFB} />
              </a>
            )}
          </ShareLink> */}
        </div>
        {/* <div className="post-action__section-item">
          <i className="fas fa-comment"></i> 23
        </div> */}
      </div>
      {!isSingle && (
        <div className="post-action__section-item">
          <Link className="post-action__comment" to={`/post/${_id}`}>
            {/* <ActionBtn text="" icon="comment" /> */}
            <i className="fas fa-comment"></i>
            <FacebookProvider appId="123456789">
              <CommentsCount href="https://www.facebook.com/zuck/posts/10102577175875681" />
            </FacebookProvider>
          </Link>
        </div>
      )}
      {/* <div className="post-action__section">
        <div className="post-action__section-item">
          <div>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
        <PostVote post={post} />
      </div> */}
    </section>
  );
};

PostAction.propTypes = {
  post: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(PostAction);
