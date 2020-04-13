import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Post from "./../components/Post";
import axios from "axios";
import { serverUrl } from "./../constants/types";

import { postActions } from "../actions/post_action";

const InfiniteList = (props) => {
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("load");
        setPage(page + 1);
        setLoadMore(true);
      }
    });
  }, []);

  const getData = (load) => {
    if (load) {
      axios.get(`${serverUrl}/post/pagination/page-${page}`).then((res) => {
        props.setState([...props.state, ...res.data]);
      });
    }
  };

  return (
    <ul id="list">
      {props.state.map((post) => (
        // <Link to={`/status/${post._id}`}>

        <Post key={post._id} post={post} />
        // </Link>
      ))}
    </ul>
  );
};

export default InfiniteList;
