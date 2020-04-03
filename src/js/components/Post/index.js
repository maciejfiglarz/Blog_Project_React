import React from "react";
import { imagePostUrl, domainUrl } from "./../../constants/types";
import { useFetch } from "./../../hooks/useFetch";
import { Loader } from "./../../containers/loader";

import ContentYoutube from "./youtube";
import ContentPhoto from "./photo";
import ContentLink from "./link";

import PostAction from "./action";
const Post = props => {
  const post = props.post;

  let loader = "";
  // if (loading) {
  //   loader = <Loader extraClass={"post__loader"} />;
  // }

  return (
    <article className="post">
      <section className="post-header">polityka/ krzysiek888 <img style={{'max-width':'10px'}} src="https://cdn4.iconfinder.com/data/icons/emoji-2-5/64/_scared_emoticon_emoji-512.png"/></section>
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
    </article>
  );
};

export default Post;

// background: url(images/bg.jpg) no-repeat center center fixed;
