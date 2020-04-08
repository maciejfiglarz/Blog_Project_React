import React from "react";
import { imagePostUrl, domainUrl } from "./../../constants/types";

const ContentYoutube = props => {
  const post = props.post;

  return (
    <div className="post-content__youtube">
      <iframe
        width="100%"
        height="215"
        src={"https://www.youtube.com/embed/" + post.youtube}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ContentYoutube;

// background: url(images/bg.jpg) no-repeat center center fixed;
