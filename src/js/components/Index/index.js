import React, { useEffect, useState, useCallback } from "react";
import Post from "../Post";
import { connect } from "react-redux";
import CreatorRedirect from "./../Creator/redirect";

import InfinityList from "../InfinityList";
import { Link } from "react-router-dom";
import postActions from "../../store/post/action";
import PropTypes from "prop-types";

const Index = ({ pagination, user, alert, posts }) => {
  return (
    <div className="container">
      <CreatorRedirect />
      <InfinityList posts={posts} pagination={pagination} />
    </div>
  );
};

Index.propTypes = {
  posts: PropTypes.object,
  user: PropTypes.object,
  pagination: PropTypes.func,
  alert: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { user, posts } = state;
  return { user, posts };
};

const actionCreators = {
  pagination: postActions.pagination,
};

export default connect(mapStateToProps, actionCreators)(Index);
