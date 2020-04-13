import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Post from "./../Post";
import axios from "axios";
import { serverUrl } from "./../../constants/types";
import postActions from "./../../actions/post_action";

const InfiniteList = (props) => {
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(0);
  const posts = props.posts;

  console.log("propsPost", posts);

  useEffect(() => {
    console.log("xxx", loadMore);
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("load");
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage(page + 1);
        setLoadMore(true);
      }
    });
  }, []);


  const getData = (load) => {
    console.log("load", load);
    if (load) {
      // axios.get(`${serverUrl}/post/pagination/page-${page}`).then((res) => {
      //   props.setState([...props.state, ...res.data]);
      // });`
      console.log("odpalone", page);
      props.pagination(page);
    }
  };

  return (
    <ul id="list">
      {Object.keys(posts).length > 0 &&
        Object.keys(posts).map((key) => (
          <div>
            <Link to={`/status/${posts[key]._id}`}>
              <Post key={posts[key]._id} post={posts[key]} />
              //{" "}
            </Link>
          </div>
        ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  console.log("state123", state);
  const { authentication, posts } = state;
  return { authentication, posts };
};

const actionCreators = {
  pagination: postActions.pagination,
};

export default connect(mapStateToProps, actionCreators)(InfiniteList);
