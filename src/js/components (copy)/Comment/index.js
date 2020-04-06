import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./../../actions/users_action";

import { serverUrl } from "./../../constants/types";

import CommentCreator from "./creator";
import CommentItem from "./item";

const Comment = (props) => {
  const [data, setData] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const postId =  props.post._id;


  

  useEffect(() => {
    console.log('useEffect');
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  const getData = (load) => {
    
    if (load) {
      axios
        .get(`${serverUrl}/comment/pagination/page-${page}/post-${postId}`)
        .then((res) => {
          setData([...data, ...res.data]);
        });
    }
  };

  return (
    <div className="comment">
       <CommentCreator post={props.post} data={data} setData={setData} setLoadMore={setLoadMore} />
      {data && (
        <div id="list">
          {data.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
