import React, { useEffect } from "react";

import ContentYoutube from "./youtube";
import ContentGraphic from "./graphic";
import ContentLink from "./link";

import PostHeader from "./header";
import PostAction from "./action";

import FacebookComment from "./../../hooks/useFacebookComment";
import { Link } from "react-router-dom";

import {
  prepareNodeList,
  prepareEmbed,
  prepareImage,
  isYoutube,
} from "./../../services/embed";

const Post = ({ post, isSingle }) => {
  const { type, title, _id } = post;
  let { content } = post;
  const preparedContent = prepareNodeList(content);
  console.log("preparedContent", preparedContent);
  useEffect(() => {
    window.FB.XFBML.parse();
  }, []);

  const displayNode = (node) => {
    if (node.nodeName == "FIGURE" && node.classList.contains("media")) {
      const preparedEmbed = prepareEmbed(node);

      console.log("el", preparedEmbed, isYoutube(node));
      return !isYoutube(node) ? (
        preparedEmbed
      ) : (
        <div dangerouslySetInnerHTML={{ __html: preparedEmbed.outerHTML }} />
      );
    }
    if (node.nodeName == "FIGURE" && node.classList.contains("image")) {
      const preparedImage = prepareImage(node);
      console.log("preparedImage", preparedImage);
      return   <div dangerouslySetInnerHTML={{ __html: preparedImage }} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: node.outerHTML }} />;
  };

  return (
    <article className="post">
      <PostHeader post={post} />
      <section className="post-content">
        {type == "youtube" && <ContentYoutube post={post} />}
        {type == "graphic" && (
          <Link to={`/post/${_id}`}>
            <ContentGraphic post={post} />
          </Link>
        )}
        {type == "link" && <ContentLink post={post} />}
        {type != "graphic" && (
          <Link to={`/post/${_id}`}>
            <h1 className="post__title">{title}</h1>
          </Link>
        )}
        {preparedContent &&
          [...preparedContent].map((item, i) => (
            <div key={`el-${i}`}>{displayNode(item)}</div>
          ))}
      </section>
      <PostAction post={post} isSingle={isSingle} />
      {isSingle && <FacebookComment postId={_id} />}
    </article>
  );
};

export default Post;
