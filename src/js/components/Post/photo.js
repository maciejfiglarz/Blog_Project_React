import React from "react";
import { serverUrl } from "../../constants/types";

const ContentPhoto = props => {
  const post = props.post;
  const photo = post.photo;

  const imageUrl = `${serverUrl}/file/post-temponary/${photo}`;

  const imageStyle = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center"
  };

  return (
    <div className="post-content__photo">
        {/* <div className={`post__image post__image--display`} style={imageStyle}> */}
        {/* {loader} */}
       {/* </div> */}
       <img src={imageUrl}/>
    </div>
  );
};

export default ContentPhoto;

