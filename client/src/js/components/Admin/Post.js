import React, { useEffect, useState, useCallback } from "react";
import Post from "../Post";
import { connect } from "react-redux";
import CreatorRedirect from "./../Creator/redirect";

import InfinityList from "../InfinityList";
import { Link } from "react-router-dom";
import postActions from "../../store/post/action";
import PropTypes from "prop-types";

const AdminPost = ({posts,pagination}) => {
    // useEffect(()=>{

    // },[])
  return (
    <div className="container">
      <InfinityList posts={posts} pagination={pagination} isAdmin={true} />
    </div>
  );
};

const mapStateToProps = (state) => {
    const { user, posts } = state;
    return { user, posts };
  };
  
  const actionCreators = {
    pagination: postActions.pagination,
  };
  
  export default connect(mapStateToProps, actionCreators)(AdminPost);
  