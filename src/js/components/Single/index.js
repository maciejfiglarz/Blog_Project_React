import React, { useEffect, useState } from "react";

import Comment from "./../Comment";
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
  console.log("post", post);
  return (
    <div className="container">
      {post ? <Post key={id} post={post} /> : ""}
      {post && <Comment post={post} />}
    </div>
  );
};

export default Single;
