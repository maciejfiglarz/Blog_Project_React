import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import commentActions from "./../../store/comment/action";
import commentServices from "./../../services/comment";
import CommentCreator from "./creator";
import CommentItem from "./item";
import PropTypes from "prop-types";

const Comment = ({ post, fetchComments, comment }) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowMore, setIsShowMore] = useState(false);
  const postId = post._id;
  const { mainComments, responseComments } = comment;

  useEffect(() => {
    const countComments = async () => {
      const { data } = await commentServices.getTotalPages(postId);
      const { countedTotalPages } = data;
      setTotalPages(countedTotalPages);
      if (countedTotalPages > 0) setIsShowMore(true);
    };
    countComments();
    fetchComments({ page, postId });
  }, []);

  const getData = () => {
    setPage((prev) => {
      const increasedPage = prev + 1;
      fetchComments({ page: increasedPage, postId });
      if (page >= totalPages) {
        setIsShowMore(false);
      }
      return increasedPage;
    });
  };

  const onClickMore = () => {
    getData();
  };

  return (
    <div className="comment">
      <CommentCreator post={post} />
      {mainComments && (
        <div className="comment-item__list">
          {Object.keys(mainComments).map((key) => {
            const responseCommentsArray =
              mainComments[key]._id in responseComments
                ? responseComments[mainComments[key]._id]
                : [];
            console.log("resss", responseCommentsArray);
            return (
              <>
                {mainComments[key]._id}
                <CommentItem
                  post={post}
                  key={key}
                  comment={mainComments[key]}
                />
                {responseCommentsArray.map((com) => (
                  <div className="comment-item__list--response">
                    <CommentItem post={post} key={key} comment={com} />
                  </div>
                ))}
              </>
            );
          })}
        </div>
      )}
      {isShowMore && (
        <div onClick={onClickMore} className="comment-more">
          Pokaż więcej... page {page}
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  user: PropTypes.object,
  comment: PropTypes.object,
  fetchComments: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { user, comment } = state;
  return { user, comment };
};

const actionCreators = {
  fetchComments: commentActions.fetchComments,
};

export default connect(mapStateToProps, actionCreators)(Comment);
