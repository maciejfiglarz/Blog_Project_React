import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Post from "./../components/Post";
import axios from "axios";
import { serverUrl } from "./../constants/types";

const InfiniteList = (props) => {
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight >
        list.clientHeight + list.offsetTop
      ) {
        console.log("load");
        setPage(page + 1);
        setLoadMore(true);
      }
    });
  }, []);

  const getData = (load) => {
    if (load) {
      console.log("load", page);
      console.log(`${serverUrl}/post/pagination/page-${page}`);
      axios.get(`${serverUrl}/post/pagination/page-${page}`).then((res) => {
        props.setState([...props.state, ...res.data]);
      });
    }
  };

  return (
    <ul id="list">
      {props.state.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </ul>
  );
};

export default InfiniteList;
