import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Post from "../Post";
import postActions from "../../store/post/action";

const InfiniteList = ({ posts, pagination }) => {
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(0);
  // const data = posts.data;
  // const isLoading = posts.isLoading;

  console.log("propsPost", posts, pagination);

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
      pagination(page);
    }
  };

  return (
    <ul id="list">
      {posts && (
        <>
          {!posts.isLoading &&
            Object.keys(posts.data).length > 0 &&
            Object.keys(posts.data).map((key) => (
              <div>
                <Post
                  key={posts.data[key]._id}
                  post={posts.data[key]}
                  isSingle={false}
                />
              </div>
            ))}
        </>
      )}
    </ul>
  );
};

export default InfiniteList;
