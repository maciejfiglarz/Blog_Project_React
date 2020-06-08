import React, { useEffect, useState } from "react";

import Post from "./../Post";

import postServices from "../../services/post";


const Single = (props) => {
  let id = props.match.params.id;
  const [post, setPost] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await postServices.fetchOneById({ postId: id });
      const { post, success } = data;
      if (success) {
        setPost(post);
      }
    };
    fetchPost();
  }, []);

  return (
    <div className="container">
      {post ? <Post key={id} post={post} isSingle={true} /> : ""}
    </div>
  );
};

export default Single;
