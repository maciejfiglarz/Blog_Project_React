import React from "react";
import { imagePostUrl, domainUrl } from "./../../constants/types";
import { useFetch } from "./../../hooks/useFetch";
import { Loader } from "./../../containers/loader";

import ContentYoutube from "./youtube";
import ContentPhoto from "./photo";
import ContentLink from "./link";

import PostHeader from "./header";
import PostAction from "./action";

import Comment from "./../Comment";

const Post = props => {
  const post = props.post;
  let loader = "";
  // if (loading) {
  //   loader = <Loader extraClass={"post__loader"} />;
  // }
console.log('post',post);
  return (
    <article className="post">
      <PostHeader />
      <section className="post-content">
        {post.type == "youtube" && <ContentYoutube post={post} />}
        {post.type == "photo" && <ContentPhoto post={post} />}
        {post.type == "link" && <ContentLink post={post} />}

        <h1 className="post__title">{post.title}</h1>
        <p className="post__description">
          {post.content}
          {/* {post._id} {post.createdAt} {post.type}
        {post.description} {post.title} {post.type} */}
        </p>
      </section>
      <PostAction post={post} />
      {post && <Comment post={post} />}
    </article>
  );
};

export default Post;

// background: url(images/bg.jpg) no-repeat center center fixed;
