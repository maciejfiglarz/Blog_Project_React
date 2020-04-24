import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Post from "../Post";
import axios from "axios";
import { serverUrl } from "../../constants/types";
import postActions from "../../store/post/action";

const InfiniteList = (props) => {
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(0);
  const posts = props.posts;
  // const data = posts.data;
  // const isLoading = posts.isLoading;

  console.log("propsPost", posts);

  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("load");
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage((prev) => {
          setLoadMore(true);

          return prev + 1;
        });
      }
    });
  }, []);

  const getData = (load) => {
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
      {posts && (
        <React.Fragment>
          {!posts.isLoading &&
            Object.keys(posts.data).length > 0 &&
            Object.keys(posts.data).map((key) => (
              <div>
                {/* <Link to={`/status/${posts[key]._id}`}> */}
                <Post key={posts.data[key]._id} post={posts.data[key]} />
                {/* </Link> */}
              </div>
            ))}
        </React.Fragment>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  console.log("state123", state);
  const { posts } = state;
  return { posts };
};

const actionCreators = {
  pagination: postActions.pagination,
};

export default connect(mapStateToProps, actionCreators)(InfiniteList);
