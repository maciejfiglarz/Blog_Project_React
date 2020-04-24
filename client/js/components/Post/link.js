import React from "react";
import { serverUrl } from "../../constants/types";

const ContentLink = props => {
  const post = props.post;
  const photo = post.linkPhoto;
  const link = post.link;

  // const imageUrl = `${serverUrl}/file/post-temponary/${photo}`;
  const imageStyle = {
    backgroundImage: `url('${photo}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center"
  };
  return (
    <div className="post-content__link">
      <a href={link} target="_blank">
        <div className="post-content__link-photo" style={imageStyle}>
          {/* {loader} */}
        </div>
      </a>
    </div>
  );
};

export default ContentLink;
