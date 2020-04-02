import React from "react";
import { imagePostUrl, domainUrl } from "./../../constants/types";
import { useFetch } from "./../../hooks/useFetch";
import { Loader } from "./../../containers/loader";

const Post = props => {
  const post = props.post;
  const imageID = post.imageID;
   const { data, loading } = useFetch(`${domainUrl}photo/${imageID}`);

  const imageUrl = imagePostUrl + data.value;
  const imageStyle = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover'
  };


  let loader = "";
  if (loading) {
    loader = <Loader extraClass={"post__loader"} />;
  }

  return (
    <article className="post">
      <div className={`post__image post__image--display`} style={imageStyle}>
        {loader}
      </div>
  <h1 className={"post__description"}>
    {post.id}
    {/* {post.description} */}
  </h1>
    </article>
  );
};

export default Post;

// background: url(images/bg.jpg) no-repeat center center fixed;
