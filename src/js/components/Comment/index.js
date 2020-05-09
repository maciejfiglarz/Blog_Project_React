import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import commentActions from "./../../store/comment/action";
import commentServices from "./../../services/comment";
import CommentCreator from "./creator";
import CommentItem from "./item";
import PropTypes from "prop-types";

const Comment = ({ post, fetchComments, comment }) => {
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowMore, setIsShowMore] = useState(false);
  const postId = post._id;
  const { comments } = comment;

  useEffect(() => {
    const countComments = async () => {
      const { data } = await commentServices.getTotalPages(postId);
      const { countedTotalPages } = data;
      setTotalPages(countedTotalPages);
      if (countedTotalPages > 0) setIsShowMore(true);
    };
    countComments();
  }, []);

  useEffect(() => {
    console.log('loadone');
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  const getData = (load) => {
    if (load) {
      fetchComments({ page, postId });
    }
  };
  
  const onClickMore = () => {
    console.log('yyy');
    setPage((page) => {
      const increasedPage = page + 1;
      setLoadMore(true);
      console.log(page, totalPages);
      if (page >= totalPages) {
        setIsShowMore(false);
      }
      console.log("xxxxxxxx", increasedPage);
      return increasedPage;
    });
  };

  return (
    <div className="comment">
      <CommentCreator post={post} />
      {comments && (
        <div id="list">
          {Object.keys(comments).map((key) => (
            <CommentItem post={post} key={key} comment={comments[key]} />
          ))}
        </div>
      )}
      {isShowMore && (
        <div onClick={onClickMore} className="comment-more">
          Pokaż więcej...
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
